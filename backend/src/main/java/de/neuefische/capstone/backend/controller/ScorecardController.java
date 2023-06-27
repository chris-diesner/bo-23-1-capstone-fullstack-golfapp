package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.service.ScorecardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class ScorecardController {
    private final ScorecardService scorecardService;

    @PostMapping("/scorecard")
    public Scorecard saveScorecard(@RequestBody ScorecardDTO scorecard) {
        return scorecardService.saveScorecard(scorecard);
    }

    @PutMapping("/scorecard/{scorecardId}")
    public ResponseEntity<Scorecard> editScorecard(@PathVariable String scorecardId, @RequestBody Scorecard scorecard) {
        Scorecard updatedScorecard = scorecardService.editScorecard(scorecardId, scorecard);
        return ResponseEntity.ok(updatedScorecard);
    }

    @GetMapping("/scorecard/{scorecardId}")
    public Scorecard getScorecardById(@PathVariable String scorecardId) {
        return scorecardService.getScorecardById(scorecardId);
    }

    @DeleteMapping("/scorecard/{scorecardId}")
    public String deleteScorecard(@PathVariable String scorecardId) {
        return scorecardService.deleteScorecard(scorecardId);
    }
}
