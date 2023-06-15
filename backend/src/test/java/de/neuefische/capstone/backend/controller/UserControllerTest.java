package de.neuefische.capstone.backend.controller;

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
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("test@test.com"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test@test.com")
    void login_shouldReturnIsOK_andShouldReturnUsername() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        assertEquals("test@test.com", response);
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void logout_shouldInvalidateSessionAndClearContext() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        assertNull(httpSession.getAttribute("SPRING_SECURITY_CONTEXT"));
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }
}
