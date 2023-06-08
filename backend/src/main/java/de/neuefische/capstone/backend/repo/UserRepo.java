package de.neuefische.capstone.backend.repo;

import de.neuefische.capstone.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    public Optional<User> findUserByUsername (String username);
}
