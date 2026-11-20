package cz.fitplanner.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank(message = "Zadejte jméno.")
            @Size(max = 100, message = "Jméno může mít nejvýše 100 znaků.")
            String firstName,
            @NotBlank(message = "Zadejte příjmení.")
            @Size(max = 100, message = "Příjmení může mít nejvýše 100 znaků.")
            String lastName,
            @NotBlank(message = "Zadejte e-mail.")
            @Email(message = "Zadejte platný e-mail.")
            @Size(max = 254, message = "E-mail může mít nejvýše 254 znaků.")
            String email,
            @NotBlank(message = "Zadejte heslo.")
            @Size(min = 8, max = 64, message = "Heslo musí mít 8 až 64 znaků.")
            String password) {
    }

    public record LoginRequest(
            @NotBlank(message = "Zadejte e-mail.") String email,
            @NotBlank(message = "Zadejte heslo.") String password) {
    }

    public record TokenResponse(String token, Instant expiresAt) {
    }

    /** Account data shared with other modules. */
    public record Account(long id, String email, String firstName, String lastName) {
    }
}
