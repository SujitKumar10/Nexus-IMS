package com.learn.nexus_ims.services;

import java.util.List;

import com.learn.nexus_ims.dtos.UserDto;

public interface UserService {

	UserDto addUser(UserDto userDto);
	
	UserDto addAdmin(UserDto userDto);
	
	UserDto updateUser(UserDto userDto,Integer id);
	
	UserDto getUserById(Integer id);
	
	List<UserDto> getAllUser();
	
	void deleteUser(Integer id);
	
	boolean checkEmailExists(String email);
	
}
