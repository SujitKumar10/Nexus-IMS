package com.learn.nexus_ims.controller;

import com.learn.nexus_ims.dtos.EstimateDto;
import com.learn.nexus_ims.services.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estimates")
@CrossOrigin
@RequiredArgsConstructor
public class EstimateController {

    private final EstimateService estimateService;

    /**
     * Create a new estimate
     */
    @PostMapping
    public ResponseEntity<EstimateDto> createEstimate(@RequestBody EstimateDto estimateDto) {
        return new ResponseEntity<>(estimateService.createEstimate(estimateDto), HttpStatus.CREATED);
    }

    /**
     * Get all estimates
     */
    @GetMapping
    public ResponseEntity<List<EstimateDto>> getAllEstimates() {
        return ResponseEntity.ok(estimateService.getAllEstimates());
    }

    /**
     * Get estimate by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<EstimateDto> getEstimateById(@PathVariable Long id) {
        return ResponseEntity.ok(estimateService.getEstimateById(id));
    }

    /**
     * Update an estimate
     */
    @PutMapping("/{id}")
    public ResponseEntity<EstimateDto> updateEstimate(@PathVariable Long id, @RequestBody EstimateDto estimateDto) {
        return ResponseEntity.ok(estimateService.updateEstimate(id, estimateDto));
    }

    /**
     * Delete an estimate
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEstimate(@PathVariable Long id) {
        estimateService.deleteEstimate(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get estimates by chain ID
     */
    @GetMapping("/chain/{chainId}")
    public ResponseEntity<List<EstimateDto>> getEstimatesByChainId(@PathVariable Long chainId) {
        return ResponseEntity.ok(estimateService.getEstimatesByChainId(chainId));
    }

    /**
     * Get estimates by group name
     */
    @GetMapping("/group/{groupName}")
    public ResponseEntity<List<EstimateDto>> getEstimatesByGroupName(@PathVariable String groupName) {
        return ResponseEntity.ok(estimateService.getEstimatesByGroupName(groupName));
    }

    /**
     * Get estimates by brand name
     */
    @GetMapping("/brand/{brandName}")
    public ResponseEntity<List<EstimateDto>> getEstimatesByBrandName(@PathVariable String brandName) {
        return ResponseEntity.ok(estimateService.getEstimatesByBrandName(brandName));
    }

    /**
     * Get estimates by zone name
     */
    @GetMapping("/zone/{zoneName}")
    public ResponseEntity<List<EstimateDto>> getEstimatesByZoneName(@PathVariable String zoneName) {
        return ResponseEntity.ok(estimateService.getEstimatesByZoneName(zoneName));
    }
}
