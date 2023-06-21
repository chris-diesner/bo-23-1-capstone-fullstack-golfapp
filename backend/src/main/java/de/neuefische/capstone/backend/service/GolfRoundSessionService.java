package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfRoundSession;
import de.neuefische.capstone.backend.repo.GolfRoundSessionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GolfRoundSessionService {

    private final GolfRoundSessionRepo golfRoundSessionRepo;
    private final UUIDService uuidService;

    public GolfRoundSession getGolfRoundSessionBySessionID(String sessionId) {
        Optional<GolfRoundSession> optionalGolfRoundSession = golfRoundSessionRepo.findGolfRoundSessionBySessionId(sessionId);
        return optionalGolfRoundSession.orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    public GolfRoundSession addGolfRoundSession(GolfRoundSession golfRoundSession) {
        GolfRoundSession newRoundSession = new GolfRoundSession();
        newRoundSession.setSessionId(uuidService.generateUUID());
        return golfRoundSessionRepo.save(newRoundSession);
    }
}
