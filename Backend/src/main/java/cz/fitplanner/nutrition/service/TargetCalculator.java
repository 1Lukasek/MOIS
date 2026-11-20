package cz.fitplanner.nutrition.service;

import cz.fitplanner.nutrition.dto.NutritionTargets;
import cz.fitplanner.profile.entity.Gender;
import cz.fitplanner.profile.entity.Goal;

/**
 * BMR (Mifflin-St Jeor) x activity factor x goal adjustment.
 * Activity factor = 1.2 + 0.05 per workout per week (assumes sedentary days outside training).
 * Protein by body weight, fat 25 % of kcal, carbs = the rest.
 */
final class TargetCalculator {

    private static final double FAT_SHARE = 0.25;

    private TargetCalculator() {
    }

    static NutritionTargets calculate(Gender gender, int age, int heightCm, double weightKg,
                                      Goal goal, int workoutsPerWeek) {
        double bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (gender == Gender.MALE ? 5 : -161);
        double tdee = bmr * (1.2 + 0.05 * Math.min(workoutsPerWeek, 7));
        double goalFactor = switch (goal) {
            case MUSCLE_GAIN -> 1.10;
            case WEIGHT_LOSS -> 0.80;
            case MAINTENANCE, FITNESS -> 1.0;
        };
        int safeMinimum = gender == Gender.MALE ? 1500 : 1200;
        int kcal = Math.max(safeMinimum, (int) (Math.round(tdee * goalFactor / 10.0) * 10));

        double proteinPerKg = switch (goal) {
            case MUSCLE_GAIN -> 2.0;
            case WEIGHT_LOSS -> 2.2;
            case MAINTENANCE, FITNESS -> 1.6;
        };
        int protein = (int) Math.round(weightKg * proteinPerKg);
        int fat = (int) Math.round(kcal * FAT_SHARE / 9);
        int carbs = Math.max(0, (int) Math.round((kcal - protein * 4 - fat * 9) / 4.0));
        return new NutritionTargets(kcal, protein, carbs, fat);
    }
}
