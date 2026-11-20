package cz.fitplanner.foods.dto;

import java.util.List;

/** Food as returned by the API. Nutrition values per 100 g. Allergens are Czech names. */
public record FoodDto(
        String code,
        String name,
        String brand,
        String quantity,
        double kcal,
        double proteinG,
        double carbsG,
        double fatG,
        Double saturatedFatG,
        Double sugarsG,
        Double fiberG,
        Double saltG,
        List<String> allergens) {
}
