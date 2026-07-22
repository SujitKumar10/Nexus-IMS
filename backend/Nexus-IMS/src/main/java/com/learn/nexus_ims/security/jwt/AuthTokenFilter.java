package com.learn.nexus_ims.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    
	@Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        logger.debug("AuthTokenFilter called for URI: {}", request.getRequestURI());
        System.out.println("🔍 AuthTokenFilter - Processing request to: " + request.getRequestURI());
        
        try {
            String jwt = parseJwt(request);
            System.out.println("📍 JWT extracted: " + (jwt != null ? "✅ found (length: " + jwt.length() + ")" : "❌ null"));
            logger.info("JWT extracted: {}", jwt != null ? "✅ found (length: " + jwt.length() + ")" : "❌ null");
            
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                System.out.println("✅ JWT validation passed, extracting username");
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                System.out.println("✅ Username extracted: " + username);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                System.out.println("✅ UserDetails loaded for: " + username);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());
                logger.debug("Roles from JWT: {}", userDetails.getAuthorities());
                System.out.println("✅ Authentication set with roles: " + userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("✅ Authentication added to SecurityContext");
            } else {
                System.out.println("❌ JWT validation failed or JWT is null");
                logger.warn("JWT validation failed or JWT is null");
            }
        } catch (Exception e) {
            System.out.println("❌ AuthTokenFilter exception: " + e.getMessage());
            logger.error("Cannot set user authentication: {}", e);
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromHeader(request);
        logger.debug("AuthTokenFilter.java: {}", jwt);
        return jwt;
    }
}
