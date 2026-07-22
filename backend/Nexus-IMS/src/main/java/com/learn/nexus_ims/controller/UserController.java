package com.learn.nexus_ims.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learn.nexus_ims.dtos.UserDto;
import com.learn.nexus_ims.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto)
	{
		UserDto savedUser = userService.addUser(userDto);
		return new ResponseEntity<UserDto>(savedUser ,HttpStatus.CREATED);
		
	}
	
	@PostMapping("/registerAdmin")
	public ResponseEntity<UserDto> addAdmin(@RequestBody UserDto userDto)
	{
		UserDto savedUser = userService.addAdmin(userDto);
		return new ResponseEntity<UserDto>(savedUser ,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Integer id)
	{
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<UserDto>> getAllUser()
	{
		return new ResponseEntity<List<UserDto>>(userService.getAllUser(),HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String,String>> deleteUserById(@PathVariable Integer id)
	{
		userService.deleteUser(id);
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", "User deleted successfully");
	    response.put("status", "success");
	    return ResponseEntity.ok(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable Integer id)
	{
		UserDto updateUser = userService.updateUser(userDto, id);
		
		return ResponseEntity.ok(updateUser);
		
	}
	
	@GetMapping("/check-email")
	public ResponseEntity<Boolean> checkEmail(@RequestParam String email)
	{
		return ResponseEntity.ok(userService.checkEmailExists(email));
	}
	
}
