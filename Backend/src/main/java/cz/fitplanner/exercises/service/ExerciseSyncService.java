package cz.fitplanner.exercises.service;

import cz.fitplanner.exercises.entity.Equipment;
import cz.fitplanner.exercises.entity.Exercise;
import cz.fitplanner.exercises.entity.ExerciseCategory;
import cz.fitplanner.exercises.entity.Muscle;
import cz.fitplanner.exercises.repository.EquipmentRepository;
import cz.fitplanner.exercises.repository.ExerciseCategoryRepository;
import cz.fitplanner.exercises.repository.ExerciseRepository;
import cz.fitplanner.exercises.repository.MuscleRepository;
import cz.fitplanner.exercises.wger.WgerClient;
import cz.fitplanner.exercises.wger.WgerDtos.ExerciseDto;
import cz.fitplanner.exercises.wger.WgerDtos.MuscleDto;
import cz.fitplanner.exercises.wger.WgerDtos.NamedDto;
import cz.fitplanner.exercises.wger.WgerDtos.TranslationDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExerciseSyncService {

    private final WgerClient wger;
    private final ExerciseRepository exerciseRepository;
    private final MuscleRepository muscleRepository;
    private final EquipmentRepository equipmentRepository;
    private final ExerciseCategoryRepository categoryRepository;
    private final TransactionTemplate tx;

    /** Downloads the Wger catalog only if no exercises are stored locally. */
    public void syncIfEmpty() {
        if (exerciseRepository.count() > 0) {
            log.info("Exercise catalog present, skipping Wger sync");
            return;
        }
        sync();
    }

    /** Fetches everything first (no DB connection held), then stores in one transaction. */
    public void sync() {
        log.info("Wger sync started");
        List<MuscleDto> muscles = wger.fetchMuscles();
        List<NamedDto> equipment = wger.fetchEquipment();
        List<NamedDto> categories = wger.fetchCategories();
        List<ExerciseDto> exercises = wger.fetchExercises();

        tx.executeWithoutResult(status -> store(muscles, equipment, categories, exercises));
        log.info("Wger sync done: {} exercises, {} muscles, {} equipment, {} categories",
                exercises.size(), muscles.size(), equipment.size(), categories.size());
    }

    private void store(List<MuscleDto> muscleDtos, List<NamedDto> equipmentDtos,
                       List<NamedDto> categoryDtos, List<ExerciseDto> exerciseDtos) {
        Map<Integer, Muscle> muscles = index(muscleRepository.saveAll(
                muscleDtos.stream().map(ExerciseSyncService::toMuscle).toList()), Muscle::getId);
        Map<Integer, Equipment> equipment = index(equipmentRepository.saveAll(
                equipmentDtos.stream().map(ExerciseSyncService::toEquipment).toList()), Equipment::getId);
        Map<Integer, ExerciseCategory> categories = index(categoryRepository.saveAll(
                categoryDtos.stream().map(ExerciseSyncService::toCategory).toList()), ExerciseCategory::getId);

        List<Exercise> exercises = new ArrayList<>();
        for (ExerciseDto dto : exerciseDtos) {
            TranslationDto t = dto.translations().stream()
                    .filter(tr -> tr.language() == wger.language())
                    .findFirst().orElse(null);
            if (t == null || t.name() == null || t.name().isBlank()) {
                continue;
            }
            Exercise e = new Exercise();
            e.setId(dto.id());
            e.setName(t.name());
            e.setDescription(t.description());
            e.setCategory(dto.category() == null ? null : require(categories, dto.category().id(), "category"));
            dto.muscles().forEach(m -> e.getMuscles().add(require(muscles, m.id(), "muscle")));
            dto.musclesSecondary().forEach(m -> e.getMusclesSecondary().add(require(muscles, m.id(), "muscle")));
            dto.equipment().forEach(q -> e.getEquipment().add(require(equipment, q.id(), "equipment")));
            exercises.add(e);
        }
        exerciseRepository.saveAll(exercises);
    }

    private static <T> T require(Map<Integer, T> map, int id, String kind) {
        T value = map.get(id);
        if (value == null) {
            throw new IllegalStateException("Wger exercise references unknown " + kind + " id " + id);
        }
        return value;
    }

    private static <T> Map<Integer, T> index(List<T> items, Function<T, Integer> id) {
        return items.stream().collect(Collectors.toMap(id, Function.identity()));
    }

    private static Muscle toMuscle(MuscleDto d) {
        Muscle m = new Muscle();
        m.setId(d.id());
        m.setName(d.name());
        m.setNameEn(d.nameEn());
        m.setFront(d.front());
        return m;
    }

    private static Equipment toEquipment(NamedDto d) {
        Equipment e = new Equipment();
        e.setId(d.id());
        e.setName(d.name());
        return e;
    }

    private static ExerciseCategory toCategory(NamedDto d) {
        ExerciseCategory c = new ExerciseCategory();
        c.setId(d.id());
        c.setName(d.name());
        return c;
    }
}
