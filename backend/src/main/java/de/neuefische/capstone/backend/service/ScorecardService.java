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

    public Scorecard saveScorecard(ScorecardDTO scorecard) {
        Scorecard newScorecard = new Scorecard(uuidService.generateUUID().toString(),
                scorecard.getUserId(),
                scorecard.getGolfCourseId(),
                scorecard.getPlayers(),
                scorecard.getDate(),
                scorecard.getScores(),
                scorecard.getTotalScore());
        return scorecardRepo.save(newScorecard);
    }
}
