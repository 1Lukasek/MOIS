package cz.fitplanner.profile.service;

import cz.fitplanner.auth.dto.AuthDtos.Account;
import cz.fitplanner.auth.service.AccountService;
import cz.fitplanner.common.ApiException;
import cz.fitplanner.exercises.entity.Equipment;
import cz.fitplanner.exercises.repository.EquipmentRepository;
import cz.fitplanner.foods.service.AllergenNames;
import cz.fitplanner.profile.dto.ProfileDtos.Diet;
import cz.fitplanner.profile.dto.ProfileDtos.Goals;
import cz.fitplanner.profile.dto.ProfileDtos.Personal;
import cz.fitplanner.profile.dto.ProfileDtos.ProfileResponse;
import cz.fitplanner.profile.entity.UserProfile;
import cz.fitplanner.profile.repository.UserProfileRepository;
import java.text.Collator;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private static final Locale CS = Locale.forLanguageTag("cs");

    private final UserProfileRepository profiles;
    private final EquipmentRepository equipmentRepository;
    private final AccountService accounts;

    /** Creates an empty profile on first access. */
    @Transactional
    public ProfileResponse get(long userId) {
        Account account = accounts.get(userId);
        return toResponse(account, profile(userId));
    }

    @Transactional
    public ProfileResponse updatePersonal(long userId, Personal in) {
        Account account = accounts.updateIdentity(userId, in.firstName(), in.lastName(), in.email());
        UserProfile p = profile(userId);
        p.setBirthDate(in.birthDate());
        p.setGender(in.gender());
        p.setHeightCm(in.heightCm());
        p.setWeightKg(in.weightKg());
        return toResponse(account, p);
    }

    @Transactional
    public ProfileResponse updateGoals(long userId, Goals in) {
        Account account = accounts.get(userId);
        List<Equipment> equipment = equipmentRepository.findAllById(in.equipmentIds());
        if (equipment.size() != in.equipmentIds().size()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Vybrané vybavení neexistuje.");
        }
        UserProfile p = profile(userId);
        p.setGoal(in.goal());
        p.setLevel(in.level());
        p.setWorkoutsPerWeek(in.workoutsPerWeek());
        p.setTargetWeightKg(in.targetWeightKg());
        p.setWorkoutMinutes(in.workoutMinutes());
        p.getEquipment().clear();
        p.getEquipment().addAll(equipment);
        return toResponse(account, p);
    }

    @Transactional
    public ProfileResponse updateDiet(long userId, Diet in) {
        Account account = accounts.get(userId);
        Set<String> allergies = clean(in.allergies(), true);
        Set<String> unknown = new TreeSet<>(allergies);
        unknown.removeAll(AllergenNames.names());
        if (!unknown.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Neznámý alergen: " + String.join(", ", unknown) + ".");
        }
        UserProfile p = profile(userId);
        p.setDietType(in.dietType().trim());
        p.setMealsPerDay(in.mealsPerDay());
        p.getAllergies().clear();
        p.getAllergies().addAll(allergies);
        p.getAvoidedFoods().clear();
        p.getAvoidedFoods().addAll(clean(in.avoidedFoods(), true));
        p.getPreferredProteins().clear();
        p.getPreferredProteins().addAll(clean(in.preferredProteins(), false));
        return toResponse(account, p);
    }

    private UserProfile profile(long userId) {
        return profiles.findById(userId).orElseGet(() -> profiles.save(new UserProfile(userId)));
    }

    /** Trims, drops blanks and duplicates, optionally lower-cases (Czech rules). */
    private static Set<String> clean(Collection<String> values, boolean lowerCase) {
        if (values == null) {
            return new HashSet<>();
        }
        return values.stream()
                .map(v -> lowerCase ? v.trim().toLowerCase(CS) : v.trim())
                .filter(v -> !v.isEmpty())
                .collect(Collectors.toCollection(HashSet::new));
    }

    private static List<String> sorted(Set<String> values) {
        return values.stream().sorted(Collator.getInstance(CS)).toList();
    }

    private static ProfileResponse toResponse(Account a, UserProfile p) {
        return new ProfileResponse(
                new Personal(a.firstName(), a.lastName(), a.email(), p.getBirthDate(), p.getGender(),
                        p.getHeightCm(), p.getWeightKg()),
                new Goals(p.getGoal(), p.getLevel(), p.getWorkoutsPerWeek(), p.getTargetWeightKg(),
                        p.getWorkoutMinutes(),
                        p.getEquipment().stream().map(Equipment::getId)
                                .collect(Collectors.toCollection(TreeSet::new))),
                new Diet(p.getDietType(), p.getMealsPerDay(), sorted(p.getAllergies()),
                        sorted(p.getAvoidedFoods()), sorted(p.getPreferredProteins())));
    }
}
