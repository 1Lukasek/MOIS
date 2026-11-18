package cz.fitplanner.foods.service;

import java.util.Map;
import java.util.Optional;

/** Open Food Facts allergen ids (14 EU allergens) to Czech display names. */
final class AllergenNames {

    private static final Map<String, String> CS = Map.ofEntries(
            Map.entry("gluten", "lepek"),
            Map.entry("crustaceans", "korýši"),
            Map.entry("eggs", "vejce"),
            Map.entry("fish", "ryby"),
            Map.entry("peanuts", "arašídy"),
            Map.entry("soybeans", "sója"),
            Map.entry("milk", "mléko"),
            Map.entry("nuts", "skořápkové plody"),
            Map.entry("celery", "celer"),
            Map.entry("mustard", "hořčice"),
            Map.entry("sesame-seeds", "sezam"),
            Map.entry("sulphur-dioxide-and-sulphites", "oxid siřičitý a siřičitany"),
            Map.entry("lupin", "vlčí bob"),
            Map.entry("molluscs", "měkkýši"));

    private AllergenNames() {
    }

    /** Czech name for a tag like "en:milk"; empty for non-English or unknown tags. */
    static Optional<String> toCzech(String tag) {
        if (tag == null || !tag.startsWith("en:")) {
            return Optional.empty();
        }
        return Optional.ofNullable(CS.get(tag.substring(3)));
    }
}
