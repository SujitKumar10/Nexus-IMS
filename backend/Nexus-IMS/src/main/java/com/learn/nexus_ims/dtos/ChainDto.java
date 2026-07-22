package com.learn.nexus_ims.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChainDto {
    private Long chain_id;
    private String company_name;
    private String gst_no;
    private Boolean is_active;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
