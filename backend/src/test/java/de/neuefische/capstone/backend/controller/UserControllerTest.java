package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.repo.UserRepo;
import de.neuefische.capstone.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private HttpSession httpSession;

    @Test
    @DirtiesContext
    @WithMockUser
    void registerUser_shouldReturnIsCreated_andShouldReturnUserDTO() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .param("username", "test@test.com")
                        .param("password", "test")
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("test@test.com"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test@test.com")
    void login_shouldReturnIsOK_andShouldReturnUsername() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        assertEquals("test@test.com", response);
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void logout_shouldInvalidateSessionAndClearContext() throws Exception {
        mockMvc.perform(get("/api/user/logout"))
                .andExpect(status().isOk());
        assertNull(httpSession.getAttribute("SPRING_SECURITY_CONTEXT"));
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    void testGetUserDetails() throws Exception {
        // Erstelle einen Testbenutzer
        GolfUser testUser = new GolfUser();
        testUser.setUsername("testuser");
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        testUser.setHandicap(10.0);
        testUser.setProfilePicture("profile.jpg");

        // Definiere das erwartete Verhalten des UserService
        when(userService.getUserDetails("testuser")).thenReturn(testUser);

        // Führe die Anfrage durch, um die Benutzerdetails abzurufen
        mockMvc.perform(get("/api/user/{username}", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.handicap").value(10.0))
                .andExpect(jsonPath("$.profilePicture").value("profile.jpg"));

        // Überprüfe, ob die Methode im UserService aufgerufen wurde
        verify(userService, times(1)).getUserDetails("testuser");
    }
}
