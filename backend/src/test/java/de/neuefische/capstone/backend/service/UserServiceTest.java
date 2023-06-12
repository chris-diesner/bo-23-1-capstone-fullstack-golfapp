package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
}