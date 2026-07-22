package com.learn.nexus_ims.services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learn.nexus_ims.dtos.UserDto;
import com.learn.nexus_ims.entities.Role;
import com.learn.nexus_ims.entities.User;
import com.learn.nexus_ims.enums.UserRole;
import com.learn.nexus_ims.repositories.RoleRepository;
import com.learn.nexus_ims.repositories.UserRepository;
import com.learn.nexus_ims.services.UserService;

@Service
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;

    UserServiceImpl(RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto addUser(UserDto userDto) {

    	userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User user = modelMapper.map(userDto, User.class);

        Role role = roleRepository
                .findByUserRole(UserRole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }
    
	
	@Override
	public UserDto addAdmin(UserDto userDto) {
		
		userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
		
		User user = modelMapper.map(userDto, User.class);
			
		Role role = roleRepository.findByUserRole(UserRole.ROLE_ADMIN).orElseThrow(()->new RuntimeException("Role not found"));
		user.setRole(role);
		User savedUser = userRepository.save(user);
		return modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer id) {
		User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setRole(userDto.getRole());
		User savedUser = userRepository.save(user);
		
		return modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public UserDto getUserById(Integer id) {
		
		User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("Id not found"));
		
		return modelMapper.map(user, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUser() {
		
		List<User> allUser = userRepository.findAll();
		
		return allUser.stream().map(user->modelMapper.map(user, UserDto.class)).toList();
	}

	@Override
	public void deleteUser(Integer id) {
		User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("Id not Found"));
		userRepository.delete(user);
	}

	@Override
	public boolean checkEmailExists(String email) {
		return userRepository.existsByEmail(email);
		
	}

}
