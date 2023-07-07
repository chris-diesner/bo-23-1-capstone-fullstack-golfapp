package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.CourseCoordinates;
import de.neuefische.capstone.backend.repo.CoordinatesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CoordinatesService {
    private final CoordinatesRepo coordinatesRepo;

    public CourseCoordinates getCoordinatesByCourseID(String courseID) {
        Optional<CourseCoordinates> optionalCourseCoordinates = coordinatesRepo.findCourseCoordinatesByCourseID(courseID);
        return optionalCourseCoordinates
                .orElseThrow(() -> new RuntimeException("Coordinates not found"));
    }

}
