package cz.fitplanner.exercises.repository;

import cz.fitplanner.exercises.entity.Muscle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MuscleRepository extends JpaRepository<Muscle, Integer> {
}
