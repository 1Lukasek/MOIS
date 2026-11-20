package cz.fitplanner.foods.controller;

import cz.fitplanner.common.PageResponse;
import cz.fitplanner.foods.dto.FoodDto;
import cz.fitplanner.foods.service.FoodService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public PageResponse<FoodDto> search(@RequestParam(required = false) String q,
                                        @RequestParam(required = false) List<String> excludeAllergens,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "20") int size) {
        return foodService.search(q, excludeAllergens, page, size);
    }

    @GetMapping("/allergens")
    public List<String> allergens() {
        return foodService.allergens();
    }

    @GetMapping("/{code}")
    public FoodDto get(@PathVariable String code) {
        return foodService.get(code);
    }
}
