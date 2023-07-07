package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.CourseCoordinates;
import de.neuefische.capstone.backend.service.CoordinatesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class CoordinatesController {
    private final CoordinatesService coordinatesService;

    @GetMapping("/coordinates/{courseID}")
    public CourseCoordinates getCoordinatesByCourseID(@PathVariable String courseID) {
        return coordinatesService.getCoordinatesByCourseID(courseID);
    }
}
