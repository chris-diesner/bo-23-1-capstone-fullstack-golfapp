package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfCourse;
import de.neuefische.capstone.backend.repo.GolfCourseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GolfCourseService {

    private final GolfCourseRepo golfCourseRepo;

    public GolfCourse getGolfCourseByCourseID(String courseID) {
        return golfCourseRepo.findGolfCourseByCourseID(courseID).orElseThrow();
    }
}
