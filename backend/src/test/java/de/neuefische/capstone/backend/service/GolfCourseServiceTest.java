package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfCourse;
import de.neuefische.capstone.backend.repo.GolfCourseRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GolfCourseServiceTest {

    private GolfCourseService golfCourseService;
    private GolfCourseRepo golfCourseRepo;

    @BeforeEach
    public void setup() {
        golfCourseRepo = mock(GolfCourseRepo.class);
        golfCourseService = new GolfCourseService(golfCourseRepo);
    }

    @Test
    void getGolfCourseByCourseID_ReturnCourse() {
        String courseID = "123";
        GolfCourse expectedCourse = new GolfCourse();
        expectedCourse.setCourseID(courseID);
        when(golfCourseRepo.findGolfCourseByCourseID(courseID)).thenReturn(Optional.of(expectedCourse));
        GolfCourse actualCourse = golfCourseService.getGolfCourseByCourseID(courseID);
        assertEquals(expectedCourse, actualCourse);
    }

    @Test
    void testGetGolfCourseByCourseID_ReturnCourseNotFound() {
        when(golfCourseRepo.findGolfCourseByCourseID("123")).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                golfCourseService.getGolfCourseByCourseID("123"));

        String expectedMessage = "Course not found";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }
}