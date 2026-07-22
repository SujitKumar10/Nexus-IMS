package com.learn.nexus_ims.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDto {
    private Long id;
    private Integer srNo;
    private String name;
    private String status; // "ACTIVE" or "INACTIVE"
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
