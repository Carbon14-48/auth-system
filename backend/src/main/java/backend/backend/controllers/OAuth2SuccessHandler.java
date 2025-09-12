package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import backend.backend.config.JwtUtil;
import backend.backend.model.Users;
import backend.backend.repos.UsersRepo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

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

        Users user = userRepository.findByEmail(email).get();
        if (user == null) {
            user = new Users();
            user.setEmail(email);
            userRepository.save(user);
        }
        String jwt = jwtUtil.generateToken(user.getEmail(), user.getId());
        response.sendRedirect("http://localhost:5173/auth/oauth-success?token=" + jwt);
    }

}