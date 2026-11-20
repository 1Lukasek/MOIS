package cz.fitplanner.auth.security;

import org.springframework.security.core.Authentication;

/** Logged-in user id from the JWT subject. */
public final class CurrentUser {

    private CurrentUser() {
    }

    public static long id(Authentication authentication) {
        return Long.parseLong(authentication.getName());
    }
}
