package cz.fitplanner.nutrition.service;

import cz.fitplanner.common.ApiException;
import cz.fitplanner.nutrition.dto.NutritionTargets;
import cz.fitplanner.profile.dto.ProfileDtos.Goals;
import cz.fitplanner.profile.dto.ProfileDtos.Personal;
import cz.fitplanner.profile.dto.ProfileDtos.ProfileResponse;
import cz.fitplanner.profile.service.ProfileService;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NutritionTargetService {

    private final ProfileService profileService;

    public NutritionTargets forUser(long userId) {
        ProfileResponse profile = profileService.get(userId);
        Personal p = profile.personal();
        Goals g = profile.goals();

        List<String> missing = new ArrayList<>();
        if (p.gender() == null) {
            missing.add("pohlaví");
        }
        if (p.birthDate() == null) {
            missing.add("datum narození");
        }
        if (p.heightCm() == null) {
            missing.add("výšku");
        }
        if (p.weightKg() == null) {
            missing.add("hmotnost");
        }
        if (g.goal() == null) {
            missing.add("hlavní cíl");
        }
        if (g.workoutsPerWeek() == null) {
            missing.add("počet tréninků týdně");
        }
        if (!missing.isEmpty()) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_CONTENT,
                    "Pro výpočet denního cíle doplňte: " + String.join(", ", missing) + ".");
        }

        int age = Period.between(p.birthDate(), LocalDate.now()).getYears();
        return TargetCalculator.calculate(p.gender(), age, p.heightCm(), p.weightKg().doubleValue(),
                g.goal(), g.workoutsPerWeek());
    }
}
