package de.neuefische.capstone.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
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
                .andExpect(status().isCreated());
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
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> jsonResponse = objectMapper.readValue(response, new TypeReference<Map<String, String>>() {});
        assertEquals("test@test.com", jsonResponse.get("username"));
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
        GolfUser testUser = new GolfUser();
        testUser.setUsername("testuser");
        testUser.setFirstName("test1");
        testUser.setLastName("test2");
        testUser.setHandicap(10.0);
        testUser.setProfilePicture("profile.jpg");

        when(userService.getUserDetails("testuser")).thenReturn(testUser);

        mockMvc.perform(get("/api/user/details/{username}", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.firstName").value("test1"))
                .andExpect(jsonPath("$.lastName").value("test2"))
                .andExpect(jsonPath("$.handicap").value(10.0))
                .andExpect(jsonPath("$.profilePicture").value("profile.jpg"));

        verify(userService, times(1)).getUserDetails("testuser");
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetMeFromEverywhere() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me2"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("user"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testEditUserDetails() throws Exception {
        GolfUser testUser = new GolfUser();
        testUser.setUsername("testuser");
        testUser.setFirstName("test1");
        testUser.setLastName("test2");
        testUser.setHandicap(10.0);
        testUser.setProfilePicture("profile.jpg");

        when(userService.getUserDetails("testuser")).thenReturn(testUser);

        MvcResult getGolfUser = mockMvc.perform(get("/api/user/details/{username}", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.firstName").value("test1"))
                .andExpect(jsonPath("$.lastName").value("test2"))
                .andExpect(jsonPath("$.handicap").value(10.0))
                .andExpect(jsonPath("$.profilePicture").value("profile.jpg"))
                .andReturn();

        String postResponseContent = getGolfUser.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        GolfUser registeredUser = objectMapper.readValue(postResponseContent, GolfUser.class);
        registeredUser.setId("testId");

        registeredUser.setFirstName("bla");
        registeredUser.setLastName("blubb");
        registeredUser.setHandicap(5.0);

        when(userService.editUserDetails(eq("testId"), any(GolfUser.class))).thenReturn(registeredUser);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/details/" + registeredUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content("""
                            {
                                "firstName": "bla",
                                "lastName": "blubb",
                                "handicap": 5
                            }
                            """))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("bla"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("blubb"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.handicap").value(5.0));
    }



}
