package cz.fitplanner.common;

import java.util.List;
import org.springframework.data.domain.Page;

/** Paged list response. page is 0-based. */
public record PageResponse<T>(List<T> items, int page, int size, long total) {

    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(), page.getTotalElements());
    }
}
