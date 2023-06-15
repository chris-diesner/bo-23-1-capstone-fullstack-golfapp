package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.model.GolfUserDTO;
import de.neuefische.capstone.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("/details/{username}")
    public GolfUser getUserDetails(@PathVariable String username) {
        return userService.getUserDetails(username);
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/logout")
    public String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logout";
    }

}
