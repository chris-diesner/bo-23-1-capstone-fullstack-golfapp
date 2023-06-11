package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final UUIDService uuidService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GolfUser user = repo.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username:" + username + " not found"));
        return new User(user.getUsername(), user.getPassword(), List.of());
    }

    public GolfUser registerUser(String username, String password) {
        Optional<GolfUser> existingUser = repo.findUserByUsername(username);
        if (existingUser != null) {
            throw new IllegalArgumentException("User already exists");
        }

        String encodedPassword = passwordEncoder.encode(password);
        GolfUser newUser = new GolfUser(uuidService.generateUUID(), username, encodedPassword);
        return repo.save(newUser);
    }
}
