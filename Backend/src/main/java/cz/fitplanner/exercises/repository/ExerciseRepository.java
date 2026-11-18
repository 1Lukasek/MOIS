package cz.fitplanner.exercises.repository;

import cz.fitplanner.exercises.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}
