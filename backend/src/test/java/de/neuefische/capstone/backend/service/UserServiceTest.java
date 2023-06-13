package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    UUIDService uuidService = mock(UUIDService.class);
    UserService userService = new UserService(userRepo, passwordEncoder, uuidService);

    @Test
    void registerUser_shouldCreateAndReturnNewUser() {
        String username = "test@test.com";
        String password = "password";
        String encodedPassword = "encodedPassword";
        String generatedUUID = "generatedUUID";
        GolfUser newUser = new GolfUser(generatedUUID, username, encodedPassword);

        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        when(uuidService.generateUUID()).thenReturn(generatedUUID);
        when(userRepo.save(newUser)).thenReturn(newUser);

        GolfUser registeredUser = userService.registerUser(username, password);

        assertNotNull(registeredUser);
        assertEquals(generatedUUID, registeredUser.getId());
        assertEquals(username, registeredUser.getUsername());
        assertEquals(encodedPassword, registeredUser.getPassword());

        verify(passwordEncoder, times(1)).encode(password);
        verify(uuidService, times(1)).generateUUID();
    }

    @Test
    void registerUser_whenEmailIsInvalid_shouldThrowException() {
        String username = "invalid_email";
        String password = "password";

        assertThrows(IllegalArgumentException.class, () -> {
            userService.registerUser(username, password);
        });
    }

    @Test
    void registerUser_whenUsernameAlreadyExists_shouldThrowException() {
        String username = "test@test.com";
        String password = "password";
        String encodedPassword = "encodedPassword";
        String generatedUUID = "generatedUUID";
        GolfUser newUser = new GolfUser(generatedUUID, username, encodedPassword);

        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        when(uuidService.generateUUID()).thenReturn(generatedUUID);
        when(userRepo.save(newUser)).thenReturn(newUser);

        GolfUser existingUser = userService.registerUser(username, password);
        when(userRepo.findUserByUsername(username)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.registerUser(username, password);
        });
    }

    @Test
    void loadUserByUsername_whenUserDoesNotExist_shouldThrowException() {

        String username = "nonexistent";
        when(userRepo.findUserByUsername(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername(username);
        });

        verify(userRepo, times(1)).findUserByUsername(username);
    }

    @Test
    void loadUserByUsername_whenUserExists_shouldReturnUserDetails() {

        String username = "test";
        String password = "password";
        GolfUser user = new GolfUser(uuidService.generateUUID(), username, password);
        when(userRepo.findUserByUsername(username)).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername(username);

        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        assertEquals(password, userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().isEmpty());

        verify(userRepo, times(1)).findUserByUsername(username);
    }
}