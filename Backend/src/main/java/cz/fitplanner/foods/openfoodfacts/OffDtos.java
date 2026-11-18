package cz.fitplanner.foods.openfoodfacts;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/** Open Food Facts search response shapes (only fields we use). */
public final class OffDtos {

    private OffDtos() {
    }

    public record SearchResponse(List<ProductDto> hits, int page,
                                 @JsonProperty("page_count") int pageCount) {
    }

    public record ProductDto(String code,
                             @JsonProperty("product_name") String name,
                             List<String> brands,
                             String quantity,
                             @JsonProperty("allergens_tags") List<String> allergens,
                             @JsonProperty("unique_scans_n") Integer scans,
                             NutrimentsDto nutriments) {
    }

    public record NutrimentsDto(@JsonProperty("energy-kcal_100g") Double kcal,
                                @JsonProperty("proteins_100g") Double protein,
                                @JsonProperty("carbohydrates_100g") Double carbs,
                                @JsonProperty("fat_100g") Double fat,
                                @JsonProperty("saturated-fat_100g") Double saturatedFat,
                                @JsonProperty("sugars_100g") Double sugars,
                                @JsonProperty("fiber_100g") Double fiber,
                                @JsonProperty("salt_100g") Double salt) {
    }
}
