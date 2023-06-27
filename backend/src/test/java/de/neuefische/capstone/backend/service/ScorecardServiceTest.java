package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.Score;
import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.repo.ScorecardRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ScorecardServiceTest {

    private final UUIDService uuidService = mock(UUIDService.class);
    private final DateService dateService = mock(DateService.class);
    private final ScorecardRepo scorecardRepo = mock(ScorecardRepo.class);
    private final ScorecardService scorecardService = new ScorecardService(scorecardRepo, uuidService, dateService);

    @Test
    void saveScorecard() {
        ScorecardDTO scorecardDTO = new ScorecardDTO();
        scorecardDTO.setUserId("testPlayerID");
        scorecardDTO.setGolfCourseId("testCourseID");
        scorecardDTO.setPlayers(Collections.singletonList("testPlayerID"));
        scorecardDTO.setDate("2021-07-01");
        scorecardDTO.setScores(Collections.singletonList(new Score(1, 5, 2, true)));
        scorecardDTO.setTotalScore(45);
        scorecardDTO.setPlayBackNine(false);

        Scorecard savedScorecard = new Scorecard();
        savedScorecard.setScorecardId("testScorecardID");
        savedScorecard.setUserId("testPlayerID");
        savedScorecard.setGolfCourseId("testCourseID");
        savedScorecard.setPlayers(Collections.singletonList("testPlayerID"));
        savedScorecard.setDate("2021-07-01");
        savedScorecard.setScores(Collections.singletonList(new Score(1, 5, 2, true)));
        savedScorecard.setTotalScore(45);
        savedScorecard.setPlayBackNine(false);

        when(uuidService.generateUUID()).thenReturn("testScorecardID");
        when(dateService.currentDate()).thenReturn("2021-07-01");
        when(scorecardRepo.save(any(Scorecard.class))).thenReturn(savedScorecard);

        Scorecard result = scorecardService.saveScorecard(scorecardDTO);

        verify(uuidService, times(1)).generateUUID();
        verify(dateService, times(1)).currentDate();
        verify(scorecardRepo, times(1)).save(any(Scorecard.class));
        assertEquals(savedScorecard, result);
    }

    @Test
    void testEditScorecard_existingScorecard() {
        String scorecardId = "testScorecardId";
        Scorecard existingScorecard = new Scorecard();
        existingScorecard.setScorecardId(scorecardId);

        Scorecard updatedScorecard = new Scorecard();
        updatedScorecard.setScorecardId(scorecardId);
        updatedScorecard.setUserId("testUserId");
        updatedScorecard.setGolfCourseId("testGolfCourseId");

        when(scorecardRepo.findById(scorecardId)).thenReturn(Optional.of(existingScorecard));
        when(scorecardRepo.save(existingScorecard)).thenReturn(updatedScorecard);

        Scorecard result = scorecardService.editScorecard(scorecardId, updatedScorecard);

        assertNotNull(result);
        assertEquals(scorecardId, result.getScorecardId());
        assertEquals("testUserId", result.getUserId());

        verify(scorecardRepo, times(1)).findById(scorecardId);
        verify(scorecardRepo, times(1)).save(existingScorecard);
    }

    @Test
    void testEditScorecard_nonExistingScorecard() {
        String scorecardId = "testScorecardId";
        Scorecard updatedScorecard = new Scorecard();
        updatedScorecard.setScorecardId(scorecardId);
        updatedScorecard.setUserId("testUserId");
        updatedScorecard.setGolfCourseId("testGolfCourseId");

        when(scorecardRepo.findById(scorecardId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> {
            scorecardService.editScorecard(scorecardId, updatedScorecard);
        });

        verify(scorecardRepo, times(1)).findById(scorecardId);
        verify(scorecardRepo, never()).save(any());
    }

    @Test
    void testDeleteScorecard_existingScorecard() {
        String scorecardId = "testScorecardId";
        when(scorecardRepo.existsById(scorecardId)).thenReturn(true);
        assertEquals("Scorecard deleted!", scorecardService.deleteScorecard(scorecardId));
        verify(scorecardRepo, times(1)).deleteById(scorecardId);
    }

    @Test
    void testDeleteScorecard_nonExistingScorecard() {
        String scorecardId = "testScorecardId";
        when(scorecardRepo.existsById(scorecardId)).thenReturn(false);
        verify(scorecardRepo, never()).deleteById(scorecardId);
    }

    @Test
    void testGetScorecardById_existingScorecard() {
        String scorecardId = "testScorecardId";
        Scorecard scorecard = new Scorecard();
        scorecard.setScorecardId(scorecardId);
        when(scorecardRepo.findById(scorecardId)).thenReturn(Optional.of(scorecard));
        assertEquals(scorecard, scorecardService.getScorecardById(scorecardId));
        verify(scorecardRepo, times(1)).findById(scorecardId);
    }

    @Test
    void testGetScorecardById_nonExistingScorecard() {
        String scorecardId = "testScorecardId";
        when(scorecardRepo.findById(scorecardId)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> {
            scorecardService.getScorecardById(scorecardId);
        });
        verify(scorecardRepo, times(1)).findById(scorecardId);
    }
}