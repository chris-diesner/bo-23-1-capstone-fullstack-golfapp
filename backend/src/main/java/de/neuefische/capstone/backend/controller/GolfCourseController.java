package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfCourse;
import de.neuefische.capstone.backend.service.GolfCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class GolfCourseController {

    private final GolfCourseService golfCourseService;

    @GetMapping("/course/{courseID}")
    public GolfCourse getGolfCourseByCourseID(@PathVariable String courseID) {
        return golfCourseService.getGolfCourseByCourseID(courseID);
    }
}
