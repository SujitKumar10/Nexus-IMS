package com.learn.nexus_ims.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "estimates")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Estimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "estimated_id")
    private Long estimatedId;

    @Column(name = "chain_id")
    private Long chainId;

    @Column(name = "group_name", length = 50)
    private String groupName;

    @Column(name = "brand_name", length = 50)
    private String brandName;

    @Column(name = "zone_name", length = 50)
    private String zoneName;

    @Column(name = "service", length = 100)
    private String service;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "cost_per_unit")
    private Float costPerUnit;

    @Column(name = "total_cost")
    private Float totalCost;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "delivery_details", length = 100)
    private String deliveryDetails;

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
