package com.learn.nexus_ims.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.learn.nexus_ims.dtos.ChainDto;
import com.learn.nexus_ims.entities.Chain;
import com.learn.nexus_ims.repositories.ChainRepository;
import com.learn.nexus_ims.services.ChainService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChainServiceImpl implements ChainService {

    private final ChainRepository chainRepository;
    private final ModelMapper modelMapper;

    @Override
    public ChainDto createChain(ChainDto chainDto) {
        Chain chain = modelMapper.map(chainDto, Chain.class);
        if (chain.getCreated_at() == null) {
            chain.setCreated_at(LocalDateTime.now());
        }
        if (chain.getUpdated_at() == null) {
            chain.setUpdated_at(LocalDateTime.now());
        }
        return modelMapper.map(chainRepository.save(chain), ChainDto.class);
    }

    @Override
    public ChainDto updateChain(Long chainId, ChainDto chainDto) {
        Chain chain = chainRepository.findById(chainId)
            .orElseThrow(() -> new RuntimeException("Chain not found"));

        chain.setCompany_name(chainDto.getCompany_name());
        chain.setGst_no(chainDto.getGst_no());
        chain.setIs_active(chainDto.getIs_active());
        chain.setUpdated_at(LocalDateTime.now());

        return modelMapper.map(chainRepository.save(chain), ChainDto.class);
    }

    @Override
    public void deleteChain(Long chainId) {
        chainRepository.deleteById(chainId);
    }

    @Override
    public List<ChainDto> getAllChains() {
        return chainRepository.findAll().stream()
            .map(chain -> modelMapper.map(chain, ChainDto.class))
            .collect(Collectors.toList());
    }

    @Override
    public ChainDto getChainById(Long chainId) {
        return chainRepository.findById(chainId)
            .map(chain -> modelMapper.map(chain, ChainDto.class))
            .orElseThrow(() -> new RuntimeException("Chain not found"));
    }
}
