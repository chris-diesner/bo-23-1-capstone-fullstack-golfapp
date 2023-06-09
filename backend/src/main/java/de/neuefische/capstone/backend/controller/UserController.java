package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.model.GolfUserDTO;
import de.neuefische.capstone.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public GolfUserDTO registerUser(@RequestParam String username, @RequestParam String password) {
        GolfUser user = GolfUser.builder()
                .username(username)
                .password(password)
                .build();
        return userService.registerUser(user);
    }

    @GetMapping("/me2")
    public String getMeFromEverywhere(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/details/{username}")
    public GolfUser getUserDetails(@PathVariable String username) {
        return userService.getUserDetails(username);
    }

    @PutMapping("/details/{userId}")
    public ResponseEntity<GolfUser> editUserDetails(@PathVariable String userId, @RequestBody GolfUser golfUser) {
        GolfUser updatedUser = userService.editUserDetails(userId, golfUser);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, String> response = new HashMap<>();
        response.put("username", email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logout";
    }

}
