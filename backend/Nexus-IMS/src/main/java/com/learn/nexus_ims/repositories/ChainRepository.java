package com.learn.nexus_ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.nexus_ims.entities.Chain;

@Repository
public interface ChainRepository extends JpaRepository<Chain, Long> {
}
