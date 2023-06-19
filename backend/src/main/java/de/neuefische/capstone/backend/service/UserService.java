package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.model.GolfUserDTO;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public GolfUserDTO registerUser(GolfUser golfUser) {
        golfUser.setId(uuidService.generateUUID());

        if (!isEmailValid(golfUser.getUsername())) {
            throw new IllegalArgumentException("Email is not valid");
        }

        if (repo.findUserByUsername(golfUser.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        String encodedPassword = passwordEncoder.encode(golfUser.getPassword());
        GolfUser tempUser = repo.save(golfUser.withPassword(encodedPassword));
        return new GolfUserDTO(tempUser.getUsername());

    }

    public boolean isEmailValid(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public GolfUser getUserDetails(String username) {
        Optional<GolfUser> optionalUser = repo.findUserByUsername(username);
        return optionalUser.orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public GolfUser editUserDetails(String userId, GolfUser golfUser) throws UsernameNotFoundException{
        Optional<GolfUser> optionalUser = repo.findById(userId);
        if (optionalUser.isPresent()) {
            GolfUser existingUser = optionalUser.get();
            existingUser.setUsername(golfUser.getUsername());
            existingUser.setFirstName(golfUser.getFirstName());
            existingUser.setLastName(golfUser.getLastName());
            existingUser.setHandicap(golfUser.getHandicap());
            return repo.save(existingUser);
        } else {
            throw new  IllegalArgumentException("User not found");
        }
    }

}