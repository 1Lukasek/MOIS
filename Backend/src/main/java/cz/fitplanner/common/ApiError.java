package cz.fitplanner.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Map;

/** Error response body. Message is Czech. Fields only set for validation errors. */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiError(String message, Map<String, String> fields) {
}
