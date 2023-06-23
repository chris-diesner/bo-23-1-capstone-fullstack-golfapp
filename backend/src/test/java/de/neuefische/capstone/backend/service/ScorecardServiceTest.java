package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.Score;
import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.repo.ScorecardRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.Date;

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

        Scorecard savedScorecard = new Scorecard();
        savedScorecard.setScorecardId("testScorecardID");
        savedScorecard.setUserId("testPlayerID");
        savedScorecard.setGolfCourseId("testCourseID");
        savedScorecard.setPlayers(Collections.singletonList("testPlayerID"));
        savedScorecard.setDate("2021-07-01");
        savedScorecard.setScores(Collections.singletonList(new Score(1, 5, 2, true)));
        savedScorecard.setTotalScore(45);

        when(uuidService.generateUUID()).thenReturn("testScorecardID");
        when(dateService.currentDate()).thenReturn("2021-07-01");
        when(scorecardRepo.save(any(Scorecard.class))).thenReturn(savedScorecard);

        Scorecard result = scorecardService.saveScorecard(scorecardDTO);

        verify(uuidService, times(1)).generateUUID();
        verify(dateService, times(1)).currentDate();
        verify(scorecardRepo, times(1)).save(any(Scorecard.class));
        assertEquals(savedScorecard, result);
    }
}