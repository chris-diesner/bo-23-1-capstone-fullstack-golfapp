package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.GolfCourse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GolfCourseRepo extends MongoRepository<GolfCourse, String> {
    Optional<GolfCourse> findGolfCourseByCourseID(String courseID);
}
