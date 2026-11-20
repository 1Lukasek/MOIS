package cz.fitplanner.exercises.service;

import cz.fitplanner.common.ApiException;
import cz.fitplanner.common.PageResponse;
import cz.fitplanner.exercises.dto.ExerciseDtos.ExerciseDetail;
import cz.fitplanner.exercises.dto.ExerciseDtos.ExerciseSummary;
import cz.fitplanner.exercises.dto.ExerciseDtos.Filters;
import cz.fitplanner.exercises.dto.ExerciseDtos.Named;
import cz.fitplanner.exercises.entity.Equipment;
import cz.fitplanner.exercises.entity.Exercise;
import cz.fitplanner.exercises.entity.ExerciseCategory;
import cz.fitplanner.exercises.entity.Muscle;
import cz.fitplanner.exercises.repository.EquipmentRepository;
import cz.fitplanner.exercises.repository.ExerciseCategoryRepository;
import cz.fitplanner.exercises.repository.ExerciseRepository;
import cz.fitplanner.exercises.repository.MuscleRepository;
import java.text.Collator;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
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
public class ExerciseService {

    private static final int MAX_PAGE_SIZE = 100;
    private static final Collator CZ_COLLATOR = Collator.getInstance(Locale.forLanguageTag("cs"));
    private static final Comparator<Named> BY_NAME = Comparator.comparing(Named::name, CZ_COLLATOR);

    private final ExerciseRepository exerciseRepository;
    private final MuscleRepository muscleRepository;
    private final EquipmentRepository equipmentRepository;
    private final ExerciseCategoryRepository categoryRepository;

    /**
     * Name contains q (case and diacritics ignored by the database collation).
     * muscleId matches the primary muscles. Sorted by name.
     */
    @Transactional(readOnly = true)
    public PageResponse<ExerciseSummary> search(String q, Integer categoryId, Integer muscleId,
                                                Integer equipmentId, int page, int size) {
        Specification<Exercise> spec = Specification.unrestricted();
        if (q != null && !q.isBlank()) {
            spec = spec.and(nameContains(q.trim()));
        }
        if (categoryId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId));
        }
        if (muscleId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("muscles").get("id"), muscleId));
        }
        if (equipmentId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("equipment").get("id"), equipmentId));
        }

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                Sort.by("name"));
        return PageResponse.of(exerciseRepository.findAll(spec, pageable).map(ExerciseService::toSummary));
    }

    @Transactional(readOnly = true)
    public ExerciseDetail get(int id) {
        Exercise e = exerciseRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Cvik nenalezen."));
        return new ExerciseDetail(e.getId(), e.getName(), HtmlText.toPlain(e.getDescription()),
                category(e.getCategory()), muscles(e.getMuscles()), muscles(e.getMusclesSecondary()),
                equipment(e.getEquipment()));
    }

    @Transactional(readOnly = true)
    public Filters filters() {
        return new Filters(
                categoryRepository.findAll().stream()
                        .map(c -> new Named(c.getId(), CzechNames.category(c))).sorted(BY_NAME).toList(),
                muscleRepository.findAll().stream()
                        .map(m -> new Named(m.getId(), CzechNames.muscle(m))).sorted(BY_NAME).toList(),
                equipmentRepository.findAll().stream()
                        .map(e -> new Named(e.getId(), CzechNames.equipment(e))).sorted(BY_NAME).toList());
    }

    private static Specification<Exercise> nameContains(String q) {
        String pattern = "%" + q.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%";
        return (root, query, cb) -> cb.like(root.get("name"), pattern, '\\');
    }

    private static ExerciseSummary toSummary(Exercise e) {
        return new ExerciseSummary(e.getId(), e.getName(), category(e.getCategory()),
                muscles(e.getMuscles()), muscles(e.getMusclesSecondary()), equipment(e.getEquipment()));
    }

    private static Named category(ExerciseCategory c) {
        return c == null ? null : new Named(c.getId(), CzechNames.category(c));
    }

    private static List<Named> muscles(Collection<Muscle> muscles) {
        return muscles.stream().map(m -> new Named(m.getId(), CzechNames.muscle(m))).sorted(BY_NAME).toList();
    }

    private static List<Named> equipment(Collection<Equipment> equipment) {
        return equipment.stream().map(e -> new Named(e.getId(), CzechNames.equipment(e))).sorted(BY_NAME).toList();
    }
}
