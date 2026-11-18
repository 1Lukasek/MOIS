package cz.fitplanner.profile.entity;

import cz.fitplanner.exercises.entity.Equipment;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/** Fitness data of a user. Id = account id (users.id), no entity link to the auth module. */
@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
public class UserProfile {

    @Id
    private Long userId;

    // personal
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private Gender gender;

    private Integer heightCm;

    @Column(precision = 5, scale = 1)
    private BigDecimal weightKg;

    // goals
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private Goal goal;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private ExperienceLevel level;

    private Integer workoutsPerWeek;

    @Column(precision = 5, scale = 1)
    private BigDecimal targetWeightKg;

    private Integer workoutMinutes;

    /** Wger equipment the user has (exercises module). */
    @ManyToMany
    @JoinTable(name = "profile_equipment",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    private Set<Equipment> equipment = new HashSet<>();

    // diet
    /** Czech text as sent by the frontend, e.g. "Bez omezení". Not interpreted yet. */
    private String dietType;

    private Integer mealsPerDay;

    /** Czech allergen names from the foods catalog, lower-case, e.g. "mléko". */
    @ElementCollection
    @CollectionTable(name = "profile_allergy", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "allergen")
    private Set<String> allergies = new HashSet<>();

    /** Free text, lower-case. */
    @ElementCollection
    @CollectionTable(name = "profile_avoided_food", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "food")
    private Set<String> avoidedFoods = new HashSet<>();

    /** Czech text as sent by the frontend, e.g. "Kuřecí maso". Not interpreted yet. */
    @ElementCollection
    @CollectionTable(name = "profile_preferred_protein", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "protein")
    private Set<String> preferredProteins = new HashSet<>();

    public UserProfile(Long userId) {
        this.userId = userId;
    }
}
