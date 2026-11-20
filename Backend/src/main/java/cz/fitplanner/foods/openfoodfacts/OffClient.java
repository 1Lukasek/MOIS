package cz.fitplanner.foods.openfoodfacts;

import cz.fitplanner.foods.openfoodfacts.OffDtos.ProductDto;
import cz.fitplanner.foods.openfoodfacts.OffDtos.SearchResponse;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class OffClient {

    private static final int PAGE_SIZE = 100;
    private static final int MAX_PAGES = 50;
    private static final String FIELDS =
            "code,product_name,brands,quantity,allergens_tags,unique_scans_n,nutriments";

    private final RestClient rest;
    private final String baseUrl;

    public OffClient(@Value("${openfoodfacts.base-url}") String baseUrl) {
        this.rest = RestClient.builder().defaultHeader("User-Agent", "FitPlanner/0.1").build();
        this.baseUrl = baseUrl;
    }

    /**
     * Most scanned Czech products (country Czech Republic, Czech language), best first.
     * Pages are fetched until {@code limit} products pass {@code accept} or results run out.
     */
    public List<ProductDto> fetchMostScannedCzech(int limit, Predicate<ProductDto> accept) {
        List<ProductDto> result = new ArrayList<>();
        for (int page = 1; page <= MAX_PAGES && result.size() < limit; page++) {
            URI uri = UriComponentsBuilder.fromUriString(baseUrl + "/search")
                    .queryParam("q", "countries_tags:\"en:czech-republic\" AND lang:cs")
                    .queryParam("sort_by", "-unique_scans_n")
                    .queryParam("fields", FIELDS)
                    .queryParam("page_size", PAGE_SIZE)
                    .queryParam("page", page)
                    .build().encode().toUri();
            SearchResponse response = rest.get().uri(uri).retrieve().body(SearchResponse.class);
            if (response == null || response.hits() == null || response.hits().isEmpty()) {
                break;
            }
            for (ProductDto p : response.hits()) {
                if (accept.test(p) && result.size() < limit) {
                    result.add(p);
                }
            }
            if (page >= response.pageCount()) {
                break;
            }
        }
        return result;
    }
}
