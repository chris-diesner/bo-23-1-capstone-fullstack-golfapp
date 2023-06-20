package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfCourse;
import de.neuefische.capstone.backend.service.GolfCourseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GolfCourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GolfCourseService golfCourseService;

    @Test
    @DirtiesContext
    void testGetGolfCourseByCourseID_shouldReturn200OK_shouldReturnTestCourse() throws Exception {
        GolfCourse mockGolfCourse = new GolfCourse();
        mockGolfCourse.setCourseID("123");
        mockGolfCourse.setCourseName("Test Course");
        when(golfCourseService.getGolfCourseByCourseID("123")).thenReturn(mockGolfCourse);

        mockMvc.perform(get("/api/golfapp/course/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.courseID").value("123"))
                .andExpect(jsonPath("$.courseName").value("Test Course"));
    }

    @Test
    @WithMockUser
    void testGetGolfCourseByCourseID_thenReturn422() throws Exception {
        String falseId = "falseId";
        when(golfCourseService.getGolfCourseByCourseID(falseId)).thenThrow(new IllegalArgumentException());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/golfapp/course/" + falseId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnprocessableEntity());
    }

}