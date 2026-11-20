package cz.fitplanner.exercises.repository;

import cz.fitplanner.exercises.entity.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer>, JpaSpecificationExecutor<Exercise> {

    /** Category is always shown, so it is loaded in the same query. */
    @Override
    @EntityGraph(attributePaths = "category")
    Page<Exercise> findAll(Specification<Exercise> spec, Pageable pageable);
}
