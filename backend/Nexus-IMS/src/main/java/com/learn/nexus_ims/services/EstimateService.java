package com.learn.nexus_ims.services;

import com.learn.nexus_ims.dtos.EstimateDto;
import com.learn.nexus_ims.entities.Estimate;
import com.learn.nexus_ims.repositories.EstimateRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;
    private final ModelMapper modelMapper;

    /**
     * Create a new estimate
     */
    public EstimateDto createEstimate(EstimateDto estimateDto) {
        Estimate estimate = modelMapper.map(estimateDto, Estimate.class);
        Estimate savedEstimate = estimateRepository.save(estimate);
        return modelMapper.map(savedEstimate, EstimateDto.class);
    }

    /**
     * Get all estimates
     */
    public List<EstimateDto> getAllEstimates() {
        return estimateRepository.findAll()
                .stream()
                .map(estimate -> modelMapper.map(estimate, EstimateDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get estimate by ID
     */
    public EstimateDto getEstimateById(Long id) {
        Estimate estimate = estimateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estimate not found with ID: " + id));
        return modelMapper.map(estimate, EstimateDto.class);
    }

    /**
     * Update an estimate
     */
    public EstimateDto updateEstimate(Long id, EstimateDto estimateDto) {
        Estimate estimate = estimateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estimate not found with ID: " + id));

        estimate.setChainId(estimateDto.getChainId());
        estimate.setGroupName(estimateDto.getGroupName());
        estimate.setBrandName(estimateDto.getBrandName());
        estimate.setZoneName(estimateDto.getZoneName());
        estimate.setService(estimateDto.getService());
        estimate.setQty(estimateDto.getQty());
        estimate.setCostPerUnit(estimateDto.getCostPerUnit());
        estimate.setTotalCost(estimateDto.getTotalCost());
        estimate.setDeliveryDate(estimateDto.getDeliveryDate());
        estimate.setDeliveryDetails(estimateDto.getDeliveryDetails());

        Estimate updatedEstimate = estimateRepository.save(estimate);
        return modelMapper.map(updatedEstimate, EstimateDto.class);
    }

    /**
     * Delete an estimate
     */
    public void deleteEstimate(Long id) {
        if (!estimateRepository.existsById(id)) {
            throw new RuntimeException("Estimate not found with ID: " + id);
        }
        estimateRepository.deleteById(id);
    }

    /**
     * Get estimates by chain ID
     */
    public List<EstimateDto> getEstimatesByChainId(Long chainId) {
        return estimateRepository.findByChainId(chainId)
                .stream()
                .map(estimate -> modelMapper.map(estimate, EstimateDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get estimates by group name
     */
    public List<EstimateDto> getEstimatesByGroupName(String groupName) {
        return estimateRepository.findByGroupName(groupName)
                .stream()
                .map(estimate -> modelMapper.map(estimate, EstimateDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get estimates by brand name
     */
    public List<EstimateDto> getEstimatesByBrandName(String brandName) {
        return estimateRepository.findByBrandName(brandName)
                .stream()
                .map(estimate -> modelMapper.map(estimate, EstimateDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get estimates by zone name
     */
    public List<EstimateDto> getEstimatesByZoneName(String zoneName) {
        return estimateRepository.findByZoneName(zoneName)
                .stream()
                .map(estimate -> modelMapper.map(estimate, EstimateDto.class))
                .collect(Collectors.toList());
    }
}
