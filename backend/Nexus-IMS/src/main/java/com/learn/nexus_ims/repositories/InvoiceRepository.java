package com.learn.nexus_ims.repositories;

import com.learn.nexus_ims.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    
    Optional<Invoice> findByInvoiceNo(Integer invoiceNo);
    
    List<Invoice> findByEstimatedId(Long estimatedId);
    
    List<Invoice> findByChainId(Long chainId);
    
    List<Invoice> findByEmailId(String emailId);
    
    List<Invoice> findByServiceDetails(String serviceDetails);
}
