package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.repo.ScorecardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
        newScorecard.setGolfCourseName(scorecardDTO.getGolfCourseName());
        newScorecard.setGolfClubName(scorecardDTO.getGolfClubName());
        newScorecard.setPlayers(scorecardDTO.getPlayers());
        newScorecard.setDate(dateService.currentDate());
        newScorecard.setScores(scorecardDTO.getScores());
        newScorecard.setTotalScore(scorecardDTO.getTotalScore());
        newScorecard.setPlayBackNine(scorecardDTO.isPlayBackNine());
        newScorecard.setCourseRating(scorecardDTO.getCourseRating());
        newScorecard.setSlopeRating(scorecardDTO.getSlopeRating());
        newScorecard.setCourseHandicap(scorecardDTO.getCourseHandicap());
        return scorecardRepo.save(newScorecard);
    }

    public Scorecard editScorecard(String scorecardId, Scorecard scorecard) {
        Scorecard existingScorecard = scorecardRepo.findById(scorecardId)
                .orElseThrow(() -> new IllegalArgumentException("Scorecard not found"));

        existingScorecard.setScorecardId(scorecard.getScorecardId());
        existingScorecard.setUserId(scorecard.getUserId());
        existingScorecard.setGolfCourseId(scorecard.getGolfCourseId());
        existingScorecard.setGolfCourseName(scorecard.getGolfCourseName());
        existingScorecard.setGolfClubName(scorecard.getGolfClubName());
        existingScorecard.setPlayers(scorecard.getPlayers());
        existingScorecard.setDate(scorecard.getDate());
        existingScorecard.setScores(scorecard.getScores());
        existingScorecard.setTotalScore(scorecard.getTotalScore());
        existingScorecard.setPlayBackNine(scorecard.isPlayBackNine());
        existingScorecard.setCourseRating(scorecard.getCourseRating());
        existingScorecard.setSlopeRating(scorecard.getSlopeRating());
        existingScorecard.setCourseHandicap(scorecard.getCourseHandicap());

        return scorecardRepo.save(existingScorecard);
    }

    public Scorecard getScorecardById(String scorecardId) {
        Optional<Scorecard> optionalScorecard = scorecardRepo.findById(scorecardId);
        if (optionalScorecard.isEmpty()) {
            throw new NoSuchElementException("Scorecard not found");
        }
        return optionalScorecard.get();
    }

    public String deleteScorecard(String scorecardId) {
        if (!scorecardRepo.existsById(scorecardId)) {
            throw new NoSuchElementException("Scorecard not found");
        }
        scorecardRepo.deleteById(scorecardId);
        return "Scorecard deleted!";
    }

    public List<Scorecard> getScorecardsByUserId(String userId) {
        return scorecardRepo.findByUserId(userId);
    }

}
