package com.learn.nexus_ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.learn.nexus_ims.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>{

	boolean existsByEmail(String email);
	
	UserDetails findByEmail(String email);
	
}
