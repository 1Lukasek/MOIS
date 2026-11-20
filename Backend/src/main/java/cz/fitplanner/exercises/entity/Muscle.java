package cz.fitplanner.exercises.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "muscle")
@Getter
@Setter
@NoArgsConstructor
public class Muscle {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String nameEn;

    private boolean front;
}
