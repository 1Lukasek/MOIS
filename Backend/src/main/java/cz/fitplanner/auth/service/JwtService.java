package cz.fitplanner.auth.service;

import cz.fitplanner.auth.dto.AuthDtos.TokenResponse;
import java.time.Duration;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

/** Issues signed JWTs. Subject = user id. Validation is done by Spring Security's JwtDecoder. */
@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final Duration expiration;

    public JwtService(JwtEncoder encoder, @Value("${app.jwt.expiration}") Duration expiration) {
        this.encoder = encoder;
        this.expiration = expiration;
    }

    public TokenResponse issue(long userId) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(expiration);
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("fitplanner")
                .subject(String.valueOf(userId))
                .issuedAt(now)
                .expiresAt(expiresAt)
                .build();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        String token = encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
        return new TokenResponse(token, expiresAt);
    }
}
