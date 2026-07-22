package com.learn.nexus_ims.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDto {

    private Long id;
    private Integer invoiceNo;
    private Long estimatedId;
    private Long chainId;
    private String serviceDetails;
    private Integer qty;
    private Float costPerQty;
    private Float amountPayable;
    private Float balance;
    private LocalDateTime dateOfPayment;
    private LocalDate dateOfService;
    private String deliveryDetails;
    private String emailId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
