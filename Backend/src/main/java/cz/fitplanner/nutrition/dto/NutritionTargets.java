package cz.fitplanner.nutrition.dto;

/** Daily calorie and macro targets. */
public record NutritionTargets(int kcal, int proteinG, int carbsG, int fatG) {
}
