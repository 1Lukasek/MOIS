package cz.fitplanner.common;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

/** Error with a Czech, user-visible message and the HTTP status to return. */
@Getter
public class ApiException extends RuntimeException {

    private final HttpStatusCode status;

    public ApiException(HttpStatusCode status, String message) {
        super(message);
        this.status = status;
    }
}
