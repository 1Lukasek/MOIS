package cz.fitplanner.foods.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

/** Local copy of an Open Food Facts product. Id = barcode. Nutrition values per 100 g. */
@Entity
@Table(name = "food")
@Getter
@Setter
@NoArgsConstructor
public class Food {

    @Id
    private String code;

    @Column(nullable = false)
    private String name;

    private String brand;

    private String quantity;

    @Column(nullable = false)
    private double kcal;

    @Column(nullable = false)
    private double protein;

    @Column(nullable = false)
    private double carbs;

    @Column(nullable = false)
    private double fat;

    private Double saturatedFat;

    private Double sugars;

    private Double fiber;

    private Double salt;

    /** Open Food Facts scan count, popularity rank. */
    private int scans;

    /** Czech allergen names, e.g. "mléko", "lepek". */
    @ElementCollection
    @BatchSize(size = 100)
    @CollectionTable(name = "food_allergen", joinColumns = @JoinColumn(name = "food_code"))
    @Column(name = "allergen")
    private Set<String> allergens = new HashSet<>();
}
