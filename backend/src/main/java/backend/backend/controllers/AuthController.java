package backend.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.backend.model.Users;
import backend.backend.services.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/auth/login")
    public String login(@RequestBody Users user) {

        return authService.login(user);
    }

    @PostMapping("/auth/register")
    public String register(@RequestBody Users user) {

        return authService.register(user);
    }
}
