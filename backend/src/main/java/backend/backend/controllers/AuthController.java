package backend.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.backend.model.Users;
import backend.backend.services.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/auth/login")
    public Map<String, String> login(@RequestBody Users user) {

        String token = authService.login(user);
        return Map.of("token", token, "message", "Successful LOGIN");
    }

    @PostMapping("/auth/register")
    public Map<String, String> register(@RequestBody Users user) {
        String token = authService.register(user);
        return Map.of("token", token, "message", "Registration successful!");
    }
}
