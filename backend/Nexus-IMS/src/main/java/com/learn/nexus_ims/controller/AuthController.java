package com.learn.nexus_ims.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.nexus_ims.dtos.UserDto;
import com.learn.nexus_ims.entities.User;
import com.learn.nexus_ims.security.LoginRequest;
import com.learn.nexus_ims.security.LoginResponse;
import com.learn.nexus_ims.security.jwt.JwtUtils;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest)
	{
		String email=loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		System.out.println("🔐 Login attempt for email: " + email);
		
		try {
			System.out.println("🔐 Authenticating credentials...");
			Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			
			System.out.println("✅ Authentication successful");
			SecurityContextHolder.getContext().setAuthentication(authenticate);
			
			User user =(User) authenticate.getPrincipal();
			System.out.println("✅ User retrieved: " + user.getEmail());
			
			String token = jwtUtils.generateTokenFromUsername(user);
			System.out.println("✅ JWT token generated, length: " + token.length());
			
			LoginResponse loginResponse = new LoginResponse();
			
			loginResponse.setToken(token);
			
			UserDto userDto = modelMapper.map(user, UserDto.class);
			
			loginResponse.setUserDto(userDto);
			
			System.out.println("✅ Login response prepared with token and user data");
			
			return new ResponseEntity<LoginResponse>(loginResponse,HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			System.out.println("❌ Bad Credentials");
			System.out.println("Exception: " + badCredentialsException.getMessage());
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			System.out.println("❌ Login error: " + e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	
}
