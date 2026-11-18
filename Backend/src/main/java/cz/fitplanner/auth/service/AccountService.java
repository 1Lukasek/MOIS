package cz.fitplanner.auth.service;

import cz.fitplanner.auth.dto.AuthDtos.Account;
import cz.fitplanner.auth.entity.User;
import cz.fitplanner.auth.repository.UserRepository;
import cz.fitplanner.common.ApiException;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Account access for other modules (profile). Entities never leave this module. */
@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository users;

    @Transactional(readOnly = true)
    public Account get(long userId) {
        return toAccount(find(userId));
    }

    @Transactional
    public Account updateIdentity(long userId, String firstName, String lastName, String email) {
        User user = find(userId);
        String normalized = normalizeEmail(email);
        users.findByEmail(normalized)
                .filter(other -> !other.getId().equals(userId))
                .ifPresent(other -> {
                    throw new ApiException(HttpStatus.CONFLICT, "Účet s tímto e-mailem už existuje.");
                });
        user.setEmail(normalized);
        user.setFirstName(firstName.trim());
        user.setLastName(lastName.trim());
        return toAccount(user);
    }

    static String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private User find(long userId) {
        return users.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Přihlaste se znovu."));
    }

    private static Account toAccount(User u) {
        return new Account(u.getId(), u.getEmail(), u.getFirstName(), u.getLastName());
    }
}
