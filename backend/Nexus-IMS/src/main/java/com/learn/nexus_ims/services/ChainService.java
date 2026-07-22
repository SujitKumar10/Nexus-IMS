package com.learn.nexus_ims.services;

import java.util.List;

import com.learn.nexus_ims.dtos.ChainDto;

public interface ChainService {
    ChainDto createChain(ChainDto chainDto);
    ChainDto updateChain(Long chainId, ChainDto chainDto);
    void deleteChain(Long chainId);
    List<ChainDto> getAllChains();
    ChainDto getChainById(Long chainId);
}
