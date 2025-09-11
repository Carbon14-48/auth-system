package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.repos.UsersRepo;

@Service
public class AuthService {

    @Autowired
    UsersRepo usersRepo;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String register(Users user) {
        if (usersRepo.getUserByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        usersRepo.save(user);
        return jwtUtil.generateToken(user.getUsername());
    }

    public String login(Users user) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            return jwtUtil.generateToken(user.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials!");
        }
    }

}
