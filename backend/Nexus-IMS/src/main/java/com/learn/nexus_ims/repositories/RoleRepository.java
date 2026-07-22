package com.learn.nexus_ims.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.learn.nexus_ims.entities.Role;
import com.learn.nexus_ims.enums.UserRole;
@RepositoryRestResource(path = "roles")
public interface RoleRepository extends JpaRepository<Role, Integer> {

	Optional<Role> findByUserRole(UserRole userRole);
}
