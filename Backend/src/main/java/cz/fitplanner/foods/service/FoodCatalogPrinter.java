package cz.fitplanner.foods.service;

import cz.fitplanner.foods.entity.Food;
import cz.fitplanner.foods.repository.FoodRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

/** Prints a summary of the stored food catalog and a few random items after startup sync. */
@Component
@Order(4)
@RequiredArgsConstructor
public class FoodCatalogPrinter implements ApplicationRunner {

    private static final int SAMPLE_SIZE = 5;

    private final FoodRepository foodRepository;
    private final TransactionTemplate tx;

    @Override
    public void run(ApplicationArguments args) {
        // Print a few examples
        //String out = tx.execute(status -> render());
        //System.out.println(out);
    }

    private String render() {
        List<Food> foods = new ArrayList<>(foodRepository.findAll());
        long withAllergens = foods.stream().filter(f -> !f.getAllergens().isEmpty()).count();

        StringBuilder sb = new StringBuilder("\n===== Katalog potravin =====\n");
        sb.append("Počet potravin:    ").append(foods.size()).append('\n');
        sb.append("S alergeny:        ").append(withAllergens).append("\n\n");

        Collections.shuffle(foods);
        sb.append("Náhodné ukázky:\n");
        for (Food f : foods.stream().limit(SAMPLE_SIZE).toList()) {
            sb.append(String.format("#%s %s%s%n", f.getCode(), f.getName(),
                    f.getBrand() == null ? "" : " (" + f.getBrand() + ")"));
            sb.append(String.format("   na 100 g: %.0f kcal, bílkoviny %.1f g, sacharidy %.1f g, tuky %.1f g%n",
                    f.getKcal(), f.getProtein(), f.getCarbs(), f.getFat()));
            sb.append("   alergeny: ").append(f.getAllergens().isEmpty()
                    ? "-" : f.getAllergens().stream().sorted().collect(Collectors.joining(", "))).append('\n');
        }
        sb.append("===== konec =====");
        return sb.toString();
    }
}
