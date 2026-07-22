package com.learn.nexus_ims.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstimateDto {

    private Long estimatedId;
    private Long chainId;
    private String groupName;
    private String brandName;
    private String zoneName;
    private String service;
    private Integer qty;
    private Float costPerUnit;
    private Float totalCost;
    private LocalDate deliveryDate;
    private String deliveryDetails;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
