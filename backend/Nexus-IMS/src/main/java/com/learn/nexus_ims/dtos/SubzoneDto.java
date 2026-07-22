package com.learn.nexus_ims.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubzoneDto {
    private Long zone_id;
    private String zone_name;
    private Long brand_id;
    private Boolean is_active;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
