package cz.fitplanner.auth.service;

import cz.fitplanner.auth.dto.AuthDtos.LoginRequest;
import cz.fitplanner.auth.dto.AuthDtos.RegisterRequest;
import cz.fitplanner.auth.dto.AuthDtos.TokenResponse;
import cz.fitplanner.auth.entity.User;
import cz.fitplanner.auth.repository.UserRepository;
import cz.fitplanner.common.ApiException;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final int BCRYPT_MAX_BYTES = 72;

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public TokenResponse register(RegisterRequest request) {
        if (tooLong(request.password())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Heslo je příliš dlouhé.");
        }
        String email = AccountService.normalizeEmail(request.email());
        if (users.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "Účet s tímto e-mailem už existuje.");
        }
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        users.save(user);
        return jwtService.issue(user.getId());
    }

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest request) {
        User user = users.findByEmail(AccountService.normalizeEmail(request.email()))
                .filter(u -> !tooLong(request.password())
                        && passwordEncoder.matches(request.password(), u.getPasswordHash()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Neplatný e-mail nebo heslo."));
        return jwtService.issue(user.getId());
    }

    /** BCrypt only handles 72 bytes. */
    private static boolean tooLong(String password) {
        return password.getBytes(StandardCharsets.UTF_8).length > BCRYPT_MAX_BYTES;
    }
}
