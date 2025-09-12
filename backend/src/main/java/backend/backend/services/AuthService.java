package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.repos.UsersRepo;

import java.util.Optional;

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
        if (usersRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        usersRepo.save(user);
        return jwtUtil.generateToken(user.getUsername(), user.getId());
    }

    public String login(Users user) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            Optional<Users> dbUserOpt = usersRepo.getUserByUsername(user.getUsername());
            if (dbUserOpt.isPresent()) {
                Users dbUser = dbUserOpt.get();
                return jwtUtil.generateToken(dbUser.getUsername(), dbUser.getId());
            }
            throw new RuntimeException("User not found");

        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials!");
        }
    }

}