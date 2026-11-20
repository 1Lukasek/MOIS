package cz.fitplanner.exercises.controller;

import cz.fitplanner.common.PageResponse;
import cz.fitplanner.exercises.dto.ExerciseDtos.ExerciseDetail;
import cz.fitplanner.exercises.dto.ExerciseDtos.ExerciseSummary;
import cz.fitplanner.exercises.dto.ExerciseDtos.Filters;
import cz.fitplanner.exercises.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    public PageResponse<ExerciseSummary> search(@RequestParam(required = false) String q,
                                                @RequestParam(required = false) Integer categoryId,
                                                @RequestParam(required = false) Integer muscleId,
                                                @RequestParam(required = false) Integer equipmentId,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "20") int size) {
        return exerciseService.search(q, categoryId, muscleId, equipmentId, page, size);
    }

    @GetMapping("/filters")
    public Filters filters() {
        return exerciseService.filters();
    }

    @GetMapping("/{id}")
    public ExerciseDetail get(@PathVariable int id) {
        return exerciseService.get(id);
    }
}
