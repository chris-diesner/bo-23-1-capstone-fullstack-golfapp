package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.Scorecard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScorecardRepo extends MongoRepository<Scorecard, String> {
    public Optional<Scorecard> findScorecardByScorecardId(String scorecardId);
    List<Scorecard> findByUserId(String userId);
}
