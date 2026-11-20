package cz.fitplanner.foods.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** On startup: fill the food catalog from Open Food Facts if empty. Failure must not stop the app. */
@Component
@Order(3)
@RequiredArgsConstructor
@Slf4j
public class FoodCatalogInitializer implements ApplicationRunner {

    private final FoodSyncService syncService;

    @Override
    public void run(ApplicationArguments args) {
        try {
            syncService.syncIfEmpty();
        } catch (RuntimeException ex) {
            log.error("Open Food Facts sync failed, catalog stays empty until next startup", ex);
        }
    }
}
