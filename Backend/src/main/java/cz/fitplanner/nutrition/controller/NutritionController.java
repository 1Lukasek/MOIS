package cz.fitplanner.nutrition.controller;

import cz.fitplanner.auth.security.CurrentUser;
import cz.fitplanner.nutrition.dto.NutritionTargets;
import cz.fitplanner.nutrition.service.NutritionTargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionTargetService targetService;

    @GetMapping("/targets")
    public NutritionTargets targets(Authentication auth) {
        return targetService.forUser(CurrentUser.id(auth));
    }
}
