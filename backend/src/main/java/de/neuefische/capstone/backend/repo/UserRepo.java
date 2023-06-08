package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.GolfUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<GolfUser, String> {

    public Optional<GolfUser> findUserByUsername (String username);
}
