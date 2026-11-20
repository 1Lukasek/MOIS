package cz.fitplanner.foods.service;

import cz.fitplanner.common.ApiException;
import cz.fitplanner.common.PageResponse;
import cz.fitplanner.foods.dto.FoodDto;
import cz.fitplanner.foods.entity.Food;
import cz.fitplanner.foods.repository.FoodRepository;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.text.Collator;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FoodService {

    private static final int MAX_PAGE_SIZE = 100;
    private static final Locale CS = Locale.forLanguageTag("cs");
    private static final Collator CZ_COLLATOR = Collator.getInstance(CS);

    private final FoodRepository foods;

    /**
     * Search by name or brand. Case and diacritics are ignored (database collation).
     * Most scanned first. Foods with any of the excluded allergens are left out.
     */
    @Transactional(readOnly = true)
    public PageResponse<FoodDto> search(String q, Collection<String> excludeAllergens, int page, int size) {
        Set<String> excluded = knownAllergens(excludeAllergens);

        Specification<Food> spec = Specification.unrestricted();
        if (q != null && !q.isBlank()) {
            spec = spec.and(nameOrBrandContains(q.trim()));
        }
        if (!excluded.isEmpty()) {
            spec = spec.and(withoutAllergens(excluded));
        }

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                Sort.by(Sort.Order.desc("scans"), Sort.Order.asc("name")));
        return PageResponse.of(foods.findAll(spec, pageable).map(FoodService::toDto));
    }

    @Transactional(readOnly = true)
    public FoodDto get(String code) {
        return foods.findById(code)
                .map(FoodService::toDto)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Potravina nenalezena."));
    }

    /** All Czech allergen names a food can have. */
    public List<String> allergens() {
        return AllergenNames.names().stream().sorted(CZ_COLLATOR).toList();
    }

    private static Specification<Food> nameOrBrandContains(String q) {
        String pattern = "%" + q.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%";
        return (root, query, cb) -> cb.or(
                cb.like(root.get("name"), pattern, '\\'),
                cb.like(root.get("brand"), pattern, '\\'));
    }

    private static Specification<Food> withoutAllergens(Set<String> excluded) {
        return (root, query, cb) -> {
            Subquery<String> withExcluded = query.subquery(String.class);
            Root<Food> other = withExcluded.from(Food.class);
            withExcluded.select(other.get("code")).where(other.join("allergens").in(excluded));
            return cb.not(root.get("code").in(withExcluded));
        };
    }

    private static Set<String> knownAllergens(Collection<String> values) {
        if (values == null) {
            return Set.of();
        }
        Set<String> result = values.stream()
                .map(v -> v.trim().toLowerCase(CS))
                .filter(v -> !v.isEmpty())
                .collect(Collectors.toCollection(TreeSet::new));
        Set<String> unknown = new TreeSet<>(result);
        unknown.removeAll(AllergenNames.names());
        if (!unknown.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Neznámý alergen: " + String.join(", ", unknown) + ".");
        }
        return result;
    }

    private static FoodDto toDto(Food f) {
        return new FoodDto(f.getCode(), f.getName(), f.getBrand(), f.getQuantity(),
                f.getKcal(), f.getProtein(), f.getCarbs(), f.getFat(),
                f.getSaturatedFat(), f.getSugars(), f.getFiber(), f.getSalt(),
                f.getAllergens().stream().sorted(CZ_COLLATOR).toList());
    }
}
