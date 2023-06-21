package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfRoundSession;
import de.neuefische.capstone.backend.service.GolfRoundSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class GolfRoundSessionController {

    private final GolfRoundSessionService golfRoundSessionService;

    @GetMapping("/session/{sessionId}")
    public GolfRoundSession getGolfRoundSessionBySessionID(@PathVariable String sessionId) {
        return golfRoundSessionService.getGolfRoundSessionBySessionID(sessionId);
    }

    @PostMapping("/session")
    public GolfRoundSession addGolfRoundSession(@RequestBody GolfRoundSession golfRoundSession) {
        return golfRoundSessionService.addGolfRoundSession(golfRoundSession);
    }
}
