package cz.fitplanner.exercises.wger;

import cz.fitplanner.exercises.wger.WgerDtos.ExerciseDto;
import cz.fitplanner.exercises.wger.WgerDtos.MuscleDto;
import cz.fitplanner.exercises.wger.WgerDtos.NamedDto;
import cz.fitplanner.exercises.wger.WgerDtos.Page;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class WgerClient {

    private static final int PAGE_SIZE = 100;

    private final RestClient rest;
    private final String baseUrl;
    private final int language;

    public WgerClient(@Value("${wger.base-url}") String baseUrl,
                      @Value("${wger.language}") int language) {
        this.rest = RestClient.create();
        this.baseUrl = baseUrl;
        this.language = language;
    }

    public List<MuscleDto> fetchMuscles() {
        return fetchAll(baseUrl + "/muscle/?limit=" + PAGE_SIZE,
                new ParameterizedTypeReference<Page<MuscleDto>>() {
                });
    }

    public List<NamedDto> fetchEquipment() {
        return fetchAll(baseUrl + "/equipment/?limit=" + PAGE_SIZE,
                new ParameterizedTypeReference<Page<NamedDto>>() {
                });
    }

    public List<NamedDto> fetchCategories() {
        return fetchAll(baseUrl + "/exercisecategory/?limit=" + PAGE_SIZE,
                new ParameterizedTypeReference<Page<NamedDto>>() {
                });
    }

    /** Only exercises that have a translation in the configured language. */
    public List<ExerciseDto> fetchExercises() {
        return fetchAll(baseUrl + "/exerciseinfo/?language=" + language + "&limit=" + PAGE_SIZE,
                new ParameterizedTypeReference<Page<ExerciseDto>>() {
                });
    }

    public int language() {
        return language;
    }

    private <T> List<T> fetchAll(String firstUrl, ParameterizedTypeReference<Page<T>> type) {
        List<T> all = new ArrayList<>();
        String url = firstUrl;
        while (url != null) {
            Page<T> page = rest.get().uri(URI.create(url)).retrieve().body(type);
            if (page == null) {
                break;
            }
            all.addAll(page.results());
            url = page.next();
        }
        return all;
    }
}
