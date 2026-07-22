package com.learn.nexus_ims.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.learn.nexus_ims.entities.User;


@Service
public class UserDetailsImpl implements UserDetailsService{

	@Autowired
	private com.learn.nexus_ims.repositories.UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserDetails user = userRepository.findByEmail(email);
		return user;
	}
	

}
