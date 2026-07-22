package com.learn.nexus_ims.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.learn.nexus_ims.dtos.SubzoneDto;
import com.learn.nexus_ims.entities.Brand;
import com.learn.nexus_ims.entities.Subzone;
import com.learn.nexus_ims.repositories.BrandRepository;
import com.learn.nexus_ims.repositories.SubzoneRepository;
import com.learn.nexus_ims.services.SubzoneService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubzoneServiceImpl implements SubzoneService {

    private final SubzoneRepository subzoneRepository;
    private final BrandRepository brandRepository;

    @Override
    public SubzoneDto createSubzone(SubzoneDto subzoneDto) {
        Subzone subzone = new Subzone();
        subzone.setZone_name(subzoneDto.getZone_name());
        if (subzoneDto.getBrand_id() != null) {
            Brand brand = brandRepository.findById(subzoneDto.getBrand_id())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            subzone.setBrand(brand);
        }
        subzone.setIs_active(subzoneDto.getIs_active() == null ? Boolean.TRUE : subzoneDto.getIs_active());
        subzone.setCreated_at(LocalDateTime.now());
        subzone.setUpdated_at(LocalDateTime.now());

        Subzone saved = subzoneRepository.save(subzone);
        return mapToDto(saved);
    }

    @Override
    public SubzoneDto updateSubzone(Long zoneId, SubzoneDto subzoneDto) {
        Subzone subzone = subzoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Subzone not found"));

        if (subzoneDto.getZone_name() != null) {
            subzone.setZone_name(subzoneDto.getZone_name());
        }
        if (subzoneDto.getBrand_id() != null) {
            Brand brand = brandRepository.findById(subzoneDto.getBrand_id())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            subzone.setBrand(brand);
        }
        if (subzoneDto.getIs_active() != null) {
            subzone.setIs_active(subzoneDto.getIs_active());
        }
        subzone.setUpdated_at(LocalDateTime.now());

        return mapToDto(subzoneRepository.save(subzone));
    }

    @Override
    public void deleteSubzone(Long zoneId) {
        subzoneRepository.deleteById(zoneId);
    }

    @Override
    public List<SubzoneDto> getAllSubzones() {
        return subzoneRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SubzoneDto getSubzoneById(Long zoneId) {
        return subzoneRepository.findById(zoneId)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Subzone not found"));
    }

    private SubzoneDto mapToDto(Subzone subzone) {
        SubzoneDto dto = new SubzoneDto();
        dto.setZone_id(subzone.getZone_id());
        dto.setZone_name(subzone.getZone_name());
        dto.setBrand_id(subzone.getBrand() != null ? subzone.getBrand().getBrand_id() : null);
        dto.setIs_active(subzone.getIs_active());
        dto.setCreated_at(subzone.getCreated_at());
        dto.setUpdated_at(subzone.getUpdated_at());
        return dto;
    }
}
