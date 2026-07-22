package com.learn.nexus_ims.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.nexus_ims.dtos.SubzoneDto;
import com.learn.nexus_ims.services.SubzoneService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subzones")
@CrossOrigin
@RequiredArgsConstructor
public class SubzoneController {

    private final SubzoneService subzoneService;

    @PostMapping
    public ResponseEntity<SubzoneDto> createSubzone(@RequestBody SubzoneDto subzoneDto) {
        return new ResponseEntity<>(subzoneService.createSubzone(subzoneDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SubzoneDto>> getAllSubzones() {
        return ResponseEntity.ok(subzoneService.getAllSubzones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubzoneDto> getSubzoneById(@PathVariable Long id) {
        return ResponseEntity.ok(subzoneService.getSubzoneById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubzoneDto> updateSubzone(@PathVariable Long id, @RequestBody SubzoneDto subzoneDto) {
        return ResponseEntity.ok(subzoneService.updateSubzone(id, subzoneDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubzone(@PathVariable Long id) {
        subzoneService.deleteSubzone(id);
        return ResponseEntity.noContent().build();
    }
}
