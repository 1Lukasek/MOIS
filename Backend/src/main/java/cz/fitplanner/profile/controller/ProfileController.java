package cz.fitplanner.profile.controller;

import cz.fitplanner.auth.security.CurrentUser;
import cz.fitplanner.profile.dto.ProfileDtos.Diet;
import cz.fitplanner.profile.dto.ProfileDtos.Goals;
import cz.fitplanner.profile.dto.ProfileDtos.Personal;
import cz.fitplanner.profile.dto.ProfileDtos.ProfileResponse;
import cz.fitplanner.profile.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ProfileResponse get(Authentication auth) {
        return profileService.get(CurrentUser.id(auth));
    }

    @PutMapping("/personal")
    public ProfileResponse updatePersonal(Authentication auth, @Valid @RequestBody Personal body) {
        return profileService.updatePersonal(CurrentUser.id(auth), body);
    }

    @PutMapping("/goals")
    public ProfileResponse updateGoals(Authentication auth, @Valid @RequestBody Goals body) {
        return profileService.updateGoals(CurrentUser.id(auth), body);
    }

    @PutMapping("/diet")
    public ProfileResponse updateDiet(Authentication auth, @Valid @RequestBody Diet body) {
        return profileService.updateDiet(CurrentUser.id(auth), body);
    }
}
