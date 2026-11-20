package cz.fitplanner.exercises.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_category")
@Getter
@Setter
@NoArgsConstructor
public class ExerciseCategory {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;
}
