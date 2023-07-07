package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.CourseCoordinates;
import de.neuefische.capstone.backend.service.CoordinatesService;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CoordinatesControllerTest {

    @MockBean
    private CoordinatesService coordinatesService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    void getCoordinatesByCourseID_shouldReturnCoordinatesAnd200OK() throws Exception {
        CourseCoordinates mockCoordinates = new CourseCoordinates();
        mockCoordinates.setCourseID("141520658891108829_1_2");

        when(coordinatesService.getCoordinatesByCourseID("141520658891108829_1_2")).thenReturn(mockCoordinates);

        mockMvc.perform(get("/api/golfapp/coordinates/141520658891108829_1_2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.courseID").value("141520658891108829_1_2"));

    }

    @Test
    @DirtiesContext
    void getCoordinatesByCourseID_shouldReturn422IfFalseID() throws Exception {
        String falseID = "falseID";
        when(coordinatesService.getCoordinatesByCourseID(falseID)).thenThrow(new IllegalArgumentException());
        mockMvc.perform(get("/api/golfapp/coordinates/" + falseID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnprocessableEntity());
    }
}
