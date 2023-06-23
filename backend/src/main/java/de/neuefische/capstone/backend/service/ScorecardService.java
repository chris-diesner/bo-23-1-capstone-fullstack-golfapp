package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.repo.ScorecardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScorecardService {
    private final ScorecardRepo scorecardRepo;
    private final UUIDService uuidService;
    private final DateService dateService;

    public Scorecard saveScorecard(ScorecardDTO scorecardDTO) {
        Scorecard newScorecard = new Scorecard();
        newScorecard.setScorecardId(uuidService.generateUUID());
        newScorecard.setUserId(scorecardDTO.getUserId());
        newScorecard.setGolfCourseId(scorecardDTO.getGolfCourseId());
        newScorecard.setPlayers(scorecardDTO.getPlayers());
        newScorecard.setDate(dateService.currentDate());
        newScorecard.setScores(scorecardDTO.getScores());
        newScorecard.setTotalScore(scorecardDTO.getTotalScore());
        return scorecardRepo.save(newScorecard);
    }
}
