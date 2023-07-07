package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.CourseCoordinates;
import de.neuefische.capstone.backend.repo.CoordinatesRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CoordinatesServiceTest {
    private CoordinatesService coordinatesService;
    private CoordinatesRepo coordinatesRepo;

    @BeforeEach
    public void setup() {
        coordinatesRepo = mock(CoordinatesRepo.class);
        coordinatesService = new CoordinatesService(coordinatesRepo);
    }

    @Test
    void getCoordinatesByCourseID_shouldReturnTestCoordinates() {
        String courseID = "123";
        CourseCoordinates expectedCoordinates = new CourseCoordinates();
        expectedCoordinates.setCourseID(courseID);
        when(coordinatesRepo.findCourseCoordinatesByCourseID(courseID)).thenReturn(Optional.of(expectedCoordinates));
        CourseCoordinates actualCoordinates = coordinatesService.getCoordinatesByCourseID(courseID);
        assertEquals(expectedCoordinates, actualCoordinates);
    }

    @Test
    void getCoordinatesByCourseID_ReturnNotFound() {
        when(coordinatesRepo.findCourseCoordinatesByCourseID("123")).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () ->
                coordinatesService.getCoordinatesByCourseID("123"));

        String expectedMessage = "Coordinates not found";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }
}