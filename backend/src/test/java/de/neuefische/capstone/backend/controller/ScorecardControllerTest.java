package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.service.DateService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class ScorecardControllerTest {

    private final DateService dateService = new DateService();

    @Autowired
    MockMvc mockMvc;

    @Test
    void saveScorecard_shouldReturnScorecard() throws Exception {
        mockMvc.perform(post("/api/golfapp/scorecard")
                        .contentType("application/json")
                        .content("""
                                                        {
                                                             "userId": "testPlayerID",
                                                             "golfCourseId": "testCourseID",
                                                             "players": [
                                                                 "testPlayerID"
                                                             ],
                                                             "date": "%s",
                                                             "scores": [
                                                                 {
                                                                     "holeNumber": 1,
                                                                     "totalStrokes": 5,
                                                                     "totalPutts": 2,
                                                                     "fairwayHit": true
                                                                 }
                                                             ],
                                                             "totalScore": 45
                                                         }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                                             "userId": "testPlayerID",
                                                             "golfCourseId": "testCourseID",
                                                             "players": [
                                                                 "testPlayerID"
                                                             ],
                                                             "date": "%s",
                                                             "scores": [
                                                                 {
                                                                     "holeNumber": 1,
                                                                     "totalStrokes": 5,
                                                                     "totalPutts": 2,
                                                                     "fairwayHit": true
                                                                 }
                                                             ],
                                                             "totalScore": 45
                                                         }
                        """.formatted(dateService.currentDate())));
    }
}