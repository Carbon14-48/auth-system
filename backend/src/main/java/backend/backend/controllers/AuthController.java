package backend.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.services.AuthService;
import backend.backend.services.EmailService; // Add this import

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

    @Autowired
    EmailService emailService;

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

            String verificationLink = "https://yourdomain.com/verify?token=" + token;
            boolean emailSent = emailService.sendVerificationEmail(user.getEmail(), verificationLink);

            if (emailSent) {
                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "id", String.valueOf(id),
                        "message", "Registration successful! Check your email for verification."));
            } else {
                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "id", String.valueOf(id),
                        "message", "Registration successful! (Failed to send verification email)"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}