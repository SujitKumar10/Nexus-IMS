package com.learn.nexus_ims.repositories;

import com.learn.nexus_ims.entities.Estimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstimateRepository extends JpaRepository<Estimate, Long> {
    
    List<Estimate> findByChainId(Long chainId);
    
    List<Estimate> findByGroupName(String groupName);
    
    List<Estimate> findByBrandName(String brandName);
    
    List<Estimate> findByZoneName(String zoneName);
}
