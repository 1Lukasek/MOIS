package cz.fitplanner.exercises.repository;

import cz.fitplanner.exercises.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {
}
