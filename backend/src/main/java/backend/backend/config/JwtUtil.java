package backend.backend.config;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private String SecretKey = "85907ae13b0dbdd2f95efeb54f4e577b719fe7c5b2a3ad11ab27159dc91e3613";
    private int jwtExpiration = 1 * 1000 * 60 * 60 * 24;

    private Key getKey() {
        byte[] keyBytes = SecretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date getExpirationDate(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) getKey()).build()
                .parseSignedClaims(token).getPayload().getExpiration();
    }

    String getUsername(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) getKey()).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    private boolean isExpired(String token) {
        return getExpirationDate(token).before(new Date());
    }

    public int getUserId(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("userId", Integer.class);
    }

    public String generateToken(String username, int userId) {
        return Jwts.builder()
                .subject(username)
                .claim("userId", userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getKey())
                .compact();
    }

    public boolean isTokenValid(String token, String username) {
        if (getUsername(token) == username && !isExpired(token))
            return true;
        return false;
    }

}