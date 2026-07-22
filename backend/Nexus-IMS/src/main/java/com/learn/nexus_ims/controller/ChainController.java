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

import com.learn.nexus_ims.dtos.ChainDto;
import com.learn.nexus_ims.services.ChainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chains")
@CrossOrigin
@RequiredArgsConstructor
public class ChainController {

    private final ChainService chainService;

    @PostMapping
    public ResponseEntity<ChainDto> createChain(@RequestBody ChainDto chainDto) {
        return new ResponseEntity<>(chainService.createChain(chainDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ChainDto>> getAllChains() {
        return ResponseEntity.ok(chainService.getAllChains());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChainDto> getChainById(@PathVariable Long id) {
        return ResponseEntity.ok(chainService.getChainById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChainDto> updateChain(@PathVariable Long id, @RequestBody ChainDto chainDto) {
        return ResponseEntity.ok(chainService.updateChain(id, chainDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChain(@PathVariable Long id) {
        chainService.deleteChain(id);
        return ResponseEntity.noContent().build();
    }
}
