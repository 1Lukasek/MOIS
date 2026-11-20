package cz.fitplanner.exercises.dto;

import java.util.List;

/** API shapes of the exercises module. All names are Czech. */
public final class ExerciseDtos {

    private ExerciseDtos() {
    }

    /** Category, muscle or equipment with its Czech name. */
    public record Named(int id, String name) {
    }

    public record ExerciseSummary(int id, String name, Named category, List<Named> muscles,
                                  List<Named> musclesSecondary, List<Named> equipment) {
    }

    /** description is plain text, one paragraph or list item per line. Null if the exercise has none. */
    public record ExerciseDetail(int id, String name, String description, Named category,
                                 List<Named> muscles, List<Named> musclesSecondary, List<Named> equipment) {
    }

    public record Filters(List<Named> categories, List<Named> muscles, List<Named> equipment) {
    }
}
