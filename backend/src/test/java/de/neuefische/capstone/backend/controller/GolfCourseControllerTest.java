package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfCourse;
import de.neuefische.capstone.backend.service.GolfCourseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GolfCourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GolfCourseService golfCourseService;

    @Test
    void testGetGolfCourseByCourseID_shouldReturn200OK_shouldReturnTestCourse() throws Exception {
        GolfCourse mockGolfCourse = new GolfCourse();
        mockGolfCourse.setCourseID("123");
        mockGolfCourse.setCourseName("Test Course");
        when(golfCourseService.getGolfCourseByCourseID("123")).thenReturn(mockGolfCourse);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/golfapp/course/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.courseID").value("123"))
                .andExpect(jsonPath("$.courseName").value("Test Course"));
    }

}