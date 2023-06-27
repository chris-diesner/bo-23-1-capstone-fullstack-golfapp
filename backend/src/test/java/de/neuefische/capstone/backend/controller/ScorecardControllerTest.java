package de.neuefische.capstone.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.service.DateService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

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
                                                             "totalScore": 45,
                                                             "playBackNine": false
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
                                                         }
                        """.formatted(dateService.currentDate())));
    }

    @Test
    void editScorecard_shouldReturnUpdatedScorecard() throws Exception {

        MvcResult postScorecard = mockMvc.perform(post("/api/golfapp/scorecard")
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
                                                         }
                        """.formatted(dateService.currentDate())))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        Scorecard editedScorecard = objectMapper.readValue(postScorecard.getResponse().getContentAsString(), Scorecard.class);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/golfapp/scorecard/" + editedScorecard.getScorecardId())
                        .contentType("application/json")
                        .content("""
                                                        {
                                                             "userId": "testPlayerID",
                                                             "golfCourseId": "testCourseID",
                                                             "players": [
                                                                 "testPlayerID"
                                                             ],
                                                             "date": "2023-06-25",
                                                             "scores": [
                                                                 {
                                                                     "holeNumber": 1,
                                                                     "totalStrokes": 6,
                                                                     "totalPutts": 2,
                                                                     "fairwayHit": true
                                                                 }
                                                             ],
                                                             "totalScore": 46,
                                                             "playBackNine": false
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
                                                             "date": "2023-06-25",
                                                             "scores": [
                                                                 {
                                                                     "holeNumber": 1,
                                                                     "totalStrokes": 6,
                                                                     "totalPutts": 2,
                                                                     "fairwayHit": true
                                                                 }
                                                             ],
                                                             "totalScore": 46,
                                                             "playBackNine": false
                                                         }
                        """));
    }

    @Test
    @DirtiesContext
    void deleteScorecardById_shouldReturnMessageAnd200OK() throws Exception {
        MvcResult postScorecard = mockMvc.perform(post("/api/golfapp/scorecard")
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
                                                         }
                        """.formatted(dateService.currentDate())))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        Scorecard scorecard = objectMapper.readValue(postScorecard.getResponse().getContentAsString(), Scorecard.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/golfapp/scorecard/" + scorecard.getScorecardId())
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Scorecard deleted!"));
    }

    @Test
    @DirtiesContext
    void getScorecardById_shouldReturnScorecardAnd200OK() throws Exception {
        MvcResult postScorecard = mockMvc.perform(post("/api/golfapp/scorecard")
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
                                                         }
                        """.formatted(dateService.currentDate())))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        Scorecard scorecard = objectMapper.readValue(postScorecard.getResponse().getContentAsString(), Scorecard.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/golfapp/scorecard/" + scorecard.getScorecardId())
                        .contentType("application/json")
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
                                                             "totalScore": 45,
                                                             "playBackNine": false
                                                         }
                        """.formatted(dateService.currentDate())));
    }


}