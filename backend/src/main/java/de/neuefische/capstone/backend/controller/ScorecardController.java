package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.Scorecard;
import de.neuefische.capstone.backend.model.ScorecardDTO;
import de.neuefische.capstone.backend.service.ScorecardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class ScorecardController {
    private final ScorecardService scorecardService;

    @PostMapping("/scorecard")
    public Scorecard saveScorecard(@RequestBody ScorecardDTO scorecard) {
        return scorecardService.saveScorecard(scorecard);
    }
}
