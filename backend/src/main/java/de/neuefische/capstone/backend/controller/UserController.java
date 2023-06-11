package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfUser;
import de.neuefische.capstone.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public GolfUser registerUser(@RequestParam String username, @RequestParam String password) {
        return userService.registerUser(username, password);
    }

}
