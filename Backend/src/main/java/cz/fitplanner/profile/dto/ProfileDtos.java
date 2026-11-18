package cz.fitplanner.profile.dto;

import cz.fitplanner.profile.entity.ExperienceLevel;
import cz.fitplanner.profile.entity.Gender;
import cz.fitplanner.profile.entity.Goal;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

/**
 * Profile sections. Each record is both the PUT body and the matching part of GET /api/profile.
 * Validation applies to input only.
 */
public final class ProfileDtos {

    private ProfileDtos() {
    }

    public record Personal(
            @NotBlank(message = "Zadejte jméno.")
            @Size(max = 100, message = "Jméno může mít nejvýše 100 znaků.")
            String firstName,
            @NotBlank(message = "Zadejte příjmení.")
            @Size(max = 100, message = "Příjmení může mít nejvýše 100 znaků.")
            String lastName,
            @NotBlank(message = "Zadejte e-mail.")
            @Email(message = "Zadejte platný e-mail.")
            @Size(max = 254, message = "E-mail může mít nejvýše 254 znaků.")
            String email,
            @NotNull(message = "Zadejte datum narození.")
            @Past(message = "Datum narození musí být v minulosti.")
            LocalDate birthDate,
            @NotNull(message = "Vyberte pohlaví.")
            Gender gender,
            @NotNull(message = "Zadejte výšku.")
            @Min(value = 100, message = "Výška musí být 100 až 250 cm.")
            @Max(value = 250, message = "Výška musí být 100 až 250 cm.")
            Integer heightCm,
            @NotNull(message = "Zadejte hmotnost.")
            @DecimalMin(value = "30.0", message = "Hmotnost musí být 30 až 300 kg.")
            @DecimalMax(value = "300.0", message = "Hmotnost musí být 30 až 300 kg.")
            @Digits(integer = 3, fraction = 1, message = "Hmotnost zadejte na jedno desetinné místo.")
            BigDecimal weightKg) {
    }

    /** equipmentIds = ids of Wger equipment (exercises module). */
    public record Goals(
            @NotNull(message = "Vyberte hlavní cíl.")
            Goal goal,
            @NotNull(message = "Vyberte tréninkovou úroveň.")
            ExperienceLevel level,
            @NotNull(message = "Zadejte počet tréninků týdně.")
            @Min(value = 1, message = "Počet tréninků týdně musí být 1 až 7.")
            @Max(value = 7, message = "Počet tréninků týdně musí být 1 až 7.")
            Integer workoutsPerWeek,
            @DecimalMin(value = "30.0", message = "Cílová hmotnost musí být 30 až 300 kg.")
            @DecimalMax(value = "300.0", message = "Cílová hmotnost musí být 30 až 300 kg.")
            @Digits(integer = 3, fraction = 1, message = "Cílovou hmotnost zadejte na jedno desetinné místo.")
            BigDecimal targetWeightKg,
            @NotNull(message = "Zadejte délku tréninku.")
            @Min(value = 15, message = "Délka tréninku musí být 15 až 240 minut.")
            @Max(value = 240, message = "Délka tréninku musí být 15 až 240 minut.")
            Integer workoutMinutes,
            @NotEmpty(message = "Vyberte alespoň jedno vybavení.")
            Set<@NotNull(message = "Neplatné vybavení.") Integer> equipmentIds) {
    }

    /**
     * dietType and preferredProteins are Czech text stored as sent.
     * allergies must be Czech allergen names from the foods catalog.
     */
    public record Diet(
            @NotBlank(message = "Vyberte typ stravování.")
            @Size(max = 60, message = "Typ stravování může mít nejvýše 60 znaků.")
            String dietType,
            @NotNull(message = "Zadejte počet jídel denně.")
            @Min(value = 1, message = "Počet jídel denně musí být 1 až 8.")
            @Max(value = 8, message = "Počet jídel denně musí být 1 až 8.")
            Integer mealsPerDay,
            @Size(max = 30, message = "Alergií může být nejvýše 30.")
            List<@NotBlank(message = "Alergie nesmí být prázdná.")
                 @Size(max = 60, message = "Alergie může mít nejvýše 60 znaků.") String> allergies,
            @Size(max = 30, message = "Potravin k vyhnutí může být nejvýše 30.")
            List<@NotBlank(message = "Potravina nesmí být prázdná.")
                 @Size(max = 60, message = "Potravina může mít nejvýše 60 znaků.") String> avoidedFoods,
            @Size(max = 20, message = "Zdrojů bílkovin může být nejvýše 20.")
            List<@NotBlank(message = "Zdroj bílkovin nesmí být prázdný.")
                 @Size(max = 60, message = "Zdroj bílkovin může mít nejvýše 60 znaků.") String> preferredProteins) {
    }

    public record ProfileResponse(Personal personal, Goals goals, Diet diet) {
    }
}
