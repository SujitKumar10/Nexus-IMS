package com.learn.nexus_ims.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "invoice_no")
    private Integer invoiceNo;

    @Column(name = "estimated_id")
    private Long estimatedId;

    @Column(name = "chain_id")
    private Long chainId;

    @Column(name = "service_details", length = 50)
    private String serviceDetails;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "cost_per_qty")
    private Float costPerQty;

    @Column(name = "amount_payable")
    private Float amountPayable;

    @Column(name = "balance")
    private Float balance;

    @Column(name = "date_of_payment")
    private LocalDateTime dateOfPayment;

    @Column(name = "date_of_service")
    private LocalDate dateOfService;

    @Column(name = "delivery_details", length = 100)
    private String deliveryDetails;

    @Column(name = "email_id", length = 50)
    private String emailId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
