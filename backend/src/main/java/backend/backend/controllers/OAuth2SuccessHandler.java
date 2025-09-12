package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.repos.UsersRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UsersRepo userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            org.springframework.security.core.Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String email = null;
        if (oauthToken.getPrincipal().getAttributes().containsKey("email")) {
            email = (String) oauthToken.getPrincipal().getAttributes().get("email");
        } else if (oauthToken.getPrincipal().getAttributes().containsKey("login")) {
            email = (String) oauthToken.getPrincipal().getAttributes().get("login");
        }
        if (email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found in OAuth2 response!");
            return;
        }

        Optional<Users> userOpt = userRepository.findByEmail(email);
        Users user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            String username = null;
            if (oauthToken.getPrincipal().getAttributes().containsKey("given_name")) {
                username = (String) oauthToken.getPrincipal().getAttributes().get("given_name");
            } else if (oauthToken.getPrincipal().getAttributes().containsKey("name")) {
                username = (String) oauthToken.getPrincipal().getAttributes().get("name");
            } else {
                username = email.split("@")[0];
            }

            user = new Users();
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(null);
            userRepository.save(user);
        }
        String jwt = jwtUtil.generateToken(user.getEmail(), user.getId());
        response.sendRedirect("http://localhost:5173/auth/oauth-success?token=" + jwt + "&id=" + user.getId());
    }

}