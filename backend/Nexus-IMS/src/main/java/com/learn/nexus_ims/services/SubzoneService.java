package com.learn.nexus_ims.services;

import java.util.List;

import com.learn.nexus_ims.dtos.SubzoneDto;

public interface SubzoneService {
    SubzoneDto createSubzone(SubzoneDto subzoneDto);
    SubzoneDto updateSubzone(Long zoneId, SubzoneDto subzoneDto);
    void deleteSubzone(Long zoneId);
    List<SubzoneDto> getAllSubzones();
    SubzoneDto getSubzoneById(Long zoneId);
}
