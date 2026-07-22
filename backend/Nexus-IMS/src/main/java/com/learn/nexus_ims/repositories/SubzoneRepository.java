package com.learn.nexus_ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.nexus_ims.entities.Subzone;

@Repository
public interface SubzoneRepository extends JpaRepository<Subzone, Long> {
}
