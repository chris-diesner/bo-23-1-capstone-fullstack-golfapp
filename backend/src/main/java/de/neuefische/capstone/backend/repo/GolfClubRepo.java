package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.GolfClub;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GolfClubRepo extends MongoRepository<GolfClub, String> {
    public Optional<GolfClub> findGolfClubByClubID(String clubID);
}
