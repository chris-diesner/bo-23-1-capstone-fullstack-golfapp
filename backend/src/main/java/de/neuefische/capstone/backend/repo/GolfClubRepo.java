package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.GolfClub;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GolfClubRepo extends MongoRepository<GolfClub, String> {
    public Optional<GolfClub> findGolfClubByClubID(String clubID);
}
