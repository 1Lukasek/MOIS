package cz.fitplanner.exercises.repository;

import cz.fitplanner.exercises.entity.ExerciseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseCategoryRepository extends JpaRepository<ExerciseCategory, Integer> {
}
