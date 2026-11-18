package cz.fitplanner.exercises.service;

import cz.fitplanner.exercises.entity.Equipment;
import cz.fitplanner.exercises.entity.Exercise;
import cz.fitplanner.exercises.entity.Muscle;
import cz.fitplanner.exercises.repository.EquipmentRepository;
import cz.fitplanner.exercises.repository.ExerciseCategoryRepository;
import cz.fitplanner.exercises.repository.ExerciseRepository;
import cz.fitplanner.exercises.repository.MuscleRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

/** Prints the stored Wger catalog to the console after startup sync. */
@Component
@Order(2)
@RequiredArgsConstructor
public class ExerciseCatalogPrinter implements ApplicationRunner {

    private static final int DESCRIPTION_MAX = 80;

    private final ExerciseRepository exerciseRepository;
    private final MuscleRepository muscleRepository;
    private final EquipmentRepository equipmentRepository;
    private final ExerciseCategoryRepository categoryRepository;
    private final TransactionTemplate tx;

    @Override
    public void run(ApplicationArguments args) {
        String out = tx.execute(status -> render());
        System.out.println(out);
    }

    private String render() {
        StringBuilder sb = new StringBuilder("\n===== Wger catalog =====\n");
        sb.append("Categories: ").append(categoryRepository.count()).append('\n');
        sb.append("Muscles:    ").append(muscleRepository.count()).append('\n');
        sb.append("Equipment:  ").append(equipmentRepository.count()).append('\n');
        sb.append("Exercises:  ").append(exerciseRepository.count()).append("\n\n");

        List<Exercise> exercises = exerciseRepository.findAll().stream()
                .sorted(Comparator.comparing(Exercise::getName, String.CASE_INSENSITIVE_ORDER))
                .toList();
        for (Exercise e : exercises) {
            sb.append(String.format("#%d %s [%s]%n", e.getId(), e.getName(),
                    e.getCategory() == null ? "-" : e.getCategory().getName()));
            sb.append("   muscles:   ").append(muscleNames(e.getMuscles())).append('\n');
            sb.append("   secondary: ").append(muscleNames(e.getMusclesSecondary())).append('\n');
            sb.append("   equipment: ").append(e.getEquipment().stream()
                    .map(Equipment::getName).sorted().collect(Collectors.joining(", "))).append('\n');
            sb.append("   ").append(snippet(e.getDescription())).append('\n');
        }
        sb.append("===== end =====");
        return sb.toString();
    }

    private static String muscleNames(Set<Muscle> muscles) {
        return muscles.stream()
                .map(m -> m.getNameEn() != null && !m.getNameEn().isBlank() ? m.getNameEn() : m.getName())
                .sorted()
                .collect(Collectors.joining(", "));
    }

    private static String snippet(String html) {
        if (html == null) {
            return "";
        }
        String text = html.replaceAll("<[^>]*>", " ").replaceAll("\\s+", " ").trim();
        return text.length() > DESCRIPTION_MAX ? text.substring(0, DESCRIPTION_MAX) + "..." : text;
    }
}
