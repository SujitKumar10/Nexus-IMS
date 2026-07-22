package com.learn.nexus_ims.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.debug("Authorization Header: {}", bearerToken);
        logger.info("📍 getJwtFromHeader - Authorization Header: {}", bearerToken != null ? bearerToken.substring(0, Math.min(30, bearerToken.length())) + "..." : "null");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7); // Remove Bearer prefix
            logger.info("✅ JWT extracted from header, length: {}", token.length());
            return token;
        }
        logger.warn("⚠️ No Bearer token found in Authorization header");
        return null;
    }

    public String generateTokenFromUsername(UserDetails userDetails) {
        String username = userDetails.getUsername();
        String roles = userDetails.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                        .verifyWith((SecretKey) key())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtToken(String authToken) {
        try {
            System.out.println("🔐 Validating JWT token, length: " + (authToken != null ? authToken.length() : 0));
            logger.info("🔐 validateJwtToken called - Token length: {}", authToken != null ? authToken.length() : 0);
            
            if (authToken == null || authToken.isEmpty()) {
                logger.error("❌ Token is null or empty");
                return false;
            }
            
            Jwts.parser().verifyWith((SecretKey) key())
                    .build().parseSignedClaims(authToken);
            logger.info("✅ JWT token validation successful");
            System.out.println("✅ JWT validation successful");
            return true;
        } catch (MalformedJwtException e) {
            logger.error("❌ Invalid JWT token: {}", e.getMessage());
            System.out.println("❌ MalformedJwtException: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("❌ JWT token is expired: {}", e.getMessage());
            System.out.println("❌ ExpiredJwtException: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("❌ JWT token is unsupported: {}", e.getMessage());
            System.out.println("❌ UnsupportedJwtException: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("❌ JWT claims string is empty: {}", e.getMessage());
            System.out.println("❌ IllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            logger.error("❌ Unexpected error validating JWT: {}", e.getMessage());
            System.out.println("❌ Unexpected error: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
}
