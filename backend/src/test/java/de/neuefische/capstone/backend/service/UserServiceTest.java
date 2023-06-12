package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    UUIDService uuidService = mock(UUIDService.class);


    @Test
    void registerUser_shouldCreateAndReturnNewUser() {

        UserService userService = new UserService(userRepo, passwordEncoder, uuidService);

        String username = "test";
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
    void loadUserByUsername_whenUserDoesNotExist_shouldThrowException() {
        UserService userService = new UserService(userRepo, passwordEncoder, uuidService);

        String username = "nonexistent";
        when(userRepo.findUserByUsername(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername(username);
        });

        verify(userRepo, times(1)).findUserByUsername(username);
    }

    @Test
    void loadUserByUsername_whenUserExists_shouldReturnUserDetails() {
        UserService userService = new UserService(userRepo, passwordEncoder, uuidService);

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