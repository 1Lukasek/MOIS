package cz.fitplanner.exercises.service;

import cz.fitplanner.exercises.entity.Equipment;
import cz.fitplanner.exercises.entity.ExerciseCategory;
import cz.fitplanner.exercises.entity.Muscle;
import java.util.Map;

/**
 * Czech names of Wger categories, equipment and muscles, by Wger id.
 * Wger returns them in English (muscles in Latin), even with Accept-Language: cs.
 * Names follow how Czech fitness apps and shops call things (Cora Health, Fitwill,
 * Dr. Max, Kaufland), not literal translation: groups in plural (Prsní svaly), gym terms
 * (Hamstringy, Kvadriceps, SZ tyč). Unknown ids (new Wger data) fall back to the Wger name.
 */
final class CzechNames {

    private static final Map<Integer, String> CATEGORIES = Map.ofEntries(
            Map.entry(8, "Paže"),
            Map.entry(9, "Nohy"),
            Map.entry(10, "Břicho"),
            Map.entry(11, "Hrudník"),
            Map.entry(12, "Záda"),
            Map.entry(13, "Ramena"),
            Map.entry(14, "Lýtka"),
            Map.entry(15, "Kardio"));

    private static final Map<Integer, String> EQUIPMENT = Map.ofEntries(
            Map.entry(1, "Velká činka"),
            Map.entry(2, "SZ tyč"),
            Map.entry(3, "Jednoručky"),
            Map.entry(4, "Podložka"),
            Map.entry(5, "Fitball"),
            Map.entry(6, "Hrazda"),
            Map.entry(7, "Vlastní váha"),
            Map.entry(8, "Lavice"),
            Map.entry(9, "Šikmá lavice"),
            Map.entry(10, "Kettlebell"),
            Map.entry(11, "Odporová guma"),
            Map.entry(12, "Kladky"));

    private static final Map<Integer, String> MUSCLES = Map.ofEntries(
            Map.entry(1, "Biceps"),
            Map.entry(2, "Přední deltový sval"),
            Map.entry(3, "Přední pilovitý sval"),
            Map.entry(4, "Prsní svaly"),
            Map.entry(5, "Triceps"),
            Map.entry(6, "Břišní svaly"),
            Map.entry(7, "Lýtka"),
            Map.entry(8, "Hýžďové svaly"),
            Map.entry(9, "Trapézové svaly"),
            Map.entry(10, "Kvadriceps"),
            Map.entry(11, "Hamstringy"),
            Map.entry(12, "Široký sval zádový"),
            Map.entry(13, "Sval pažní"),
            Map.entry(14, "Šikmé břišní svaly"),
            Map.entry(15, "Kambalový sval"));

    private CzechNames() {
    }

    static String category(ExerciseCategory c) {
        return CATEGORIES.getOrDefault(c.getId(), c.getName());
    }

    static String equipment(Equipment e) {
        return EQUIPMENT.getOrDefault(e.getId(), e.getName());
    }

    static String muscle(Muscle m) {
        String fallback = m.getNameEn() != null && !m.getNameEn().isBlank() ? m.getNameEn() : m.getName();
        return MUSCLES.getOrDefault(m.getId(), fallback);
    }
}
