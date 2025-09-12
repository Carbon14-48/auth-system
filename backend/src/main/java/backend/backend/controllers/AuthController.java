package backend.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.services.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/auth/login")
    public Map<String, String> login(@RequestBody Users user) {

        String token = authService.login(user);
        int id = jwtUtil.getUserId(token);
        return Map.of("token", token, "id", "" + id, "message", "Successful LOGIN");
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        try {
            String token = authService.register(user);
            int id = jwtUtil.getUserId(token);
            return ResponseEntity
                    .ok(Map.of("token", token, "id", String.valueOf(id), "message", "Registration successful!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
