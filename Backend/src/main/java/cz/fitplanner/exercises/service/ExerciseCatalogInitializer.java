package cz.fitplanner.exercises.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/** On startup: fill the exercise catalog from Wger if empty. Failure must not stop the app. */
@Component
@RequiredArgsConstructor
@Slf4j
public class ExerciseCatalogInitializer implements ApplicationRunner {

    private final ExerciseSyncService syncService;

    @Override
    public void run(ApplicationArguments args) {
        try {
            syncService.syncIfEmpty();
        } catch (RuntimeException ex) {
            log.error("Wger sync failed, catalog stays empty until next startup", ex);
        }
    }
}
