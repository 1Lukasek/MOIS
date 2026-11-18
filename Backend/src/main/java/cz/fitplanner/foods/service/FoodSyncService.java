package cz.fitplanner.foods.service;

import cz.fitplanner.foods.entity.Food;
import cz.fitplanner.foods.openfoodfacts.OffClient;
import cz.fitplanner.foods.openfoodfacts.OffDtos.NutrimentsDto;
import cz.fitplanner.foods.openfoodfacts.OffDtos.ProductDto;
import cz.fitplanner.foods.repository.FoodRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

@Service
@Slf4j
public class FoodSyncService {

    private final OffClient off;
    private final FoodRepository foodRepository;
    private final TransactionTemplate tx;
    private final int maxItems;

    public FoodSyncService(OffClient off, FoodRepository foodRepository, TransactionTemplate tx,
                           @Value("${openfoodfacts.max-items}") int maxItems) {
        this.off = off;
        this.foodRepository = foodRepository;
        this.tx = tx;
        this.maxItems = maxItems;
    }

    /** Downloads the catalog only if no foods are stored locally. */
    public void syncIfEmpty() {
        if (foodRepository.count() > 0) {
            log.info("Food catalog present, skipping Open Food Facts sync");
            return;
        }
        sync();
    }

    /** Fetches first (no DB connection held), then stores in one transaction. */
    public void sync() {
        log.info("Open Food Facts sync started (max {} items)", maxItems);
        Set<String> seen = new HashSet<>();
        List<ProductDto> products = off.fetchMostScannedCzech(maxItems,
                p -> isUsable(p) && seen.add(p.code()));
        List<Food> foods = products.stream().map(FoodSyncService::toFood).toList();

        tx.executeWithoutResult(status -> foodRepository.saveAll(foods));
        log.info("Open Food Facts sync done: {} foods", foods.size());
    }

    /** Needs a barcode, a name and the four core nutrition values. */
    private static boolean isUsable(ProductDto p) {
        NutrimentsDto n = p.nutriments();
        return p.code() != null && !p.code().isBlank()
                && p.name() != null && !p.name().isBlank()
                && n != null && n.kcal() != null && n.protein() != null
                && n.carbs() != null && n.fat() != null;
    }

    private static Food toFood(ProductDto p) {
        NutrimentsDto n = p.nutriments();
        Food f = new Food();
        f.setCode(p.code());
        f.setName(p.name().trim());
        f.setBrand(p.brands() == null || p.brands().isEmpty() ? null : String.join(", ", p.brands()));
        f.setQuantity(p.quantity());
        f.setKcal(n.kcal());
        f.setProtein(n.protein());
        f.setCarbs(n.carbs());
        f.setFat(n.fat());
        f.setSaturatedFat(n.saturatedFat());
        f.setSugars(n.sugars());
        f.setFiber(n.fiber());
        f.setSalt(n.salt());
        f.setScans(p.scans() == null ? 0 : p.scans());
        if (p.allergens() != null) {
            p.allergens().stream()
                    .map(AllergenNames::toCzech)
                    .flatMap(Optional::stream)
                    .forEach(f.getAllergens()::add);
        }
        return f;
    }
}
