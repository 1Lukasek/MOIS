package cz.fitplanner.exercises.wger;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/** Wger API response shapes (only fields we use). */
public final class WgerDtos {

    private WgerDtos() {
    }

    public record Page<T>(String next, List<T> results) {
    }

    public record NamedDto(int id, String name) {
    }

    public record MuscleDto(int id, String name, @JsonProperty("name_en") String nameEn,
                            @JsonProperty("is_front") boolean front) {
    }

    public record TranslationDto(String name, String description, int language) {
    }

    public record ExerciseDto(int id, NamedDto category, List<MuscleDto> muscles,
                              @JsonProperty("muscles_secondary") List<MuscleDto> musclesSecondary,
                              List<NamedDto> equipment, List<TranslationDto> translations) {
    }
}
