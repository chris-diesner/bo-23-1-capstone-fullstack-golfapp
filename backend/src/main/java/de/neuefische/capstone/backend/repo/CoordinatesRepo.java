package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.CourseCoordinates;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CoordinatesRepo extends MongoRepository<CourseCoordinates, String> {
    public Optional<CourseCoordinates> findCourseCoordinatesByCourseID(String courseID);
}
