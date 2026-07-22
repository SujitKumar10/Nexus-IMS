package com.learn.nexus_ims.dtos;

import com.learn.nexus_ims.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private Integer id;
	private String name;
	private String email;
	private String password;
	private Role role;

}
