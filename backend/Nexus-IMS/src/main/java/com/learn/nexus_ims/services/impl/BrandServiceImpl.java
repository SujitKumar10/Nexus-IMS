package com.learn.nexus_ims.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.learn.nexus_ims.dtos.BrandDto;
import com.learn.nexus_ims.entities.Brand;
import com.learn.nexus_ims.entities.Chain;
import com.learn.nexus_ims.repositories.BrandRepository;
import com.learn.nexus_ims.repositories.ChainRepository;
import com.learn.nexus_ims.services.BrandService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ChainRepository chainRepository;
    private final ModelMapper modelMapper;

    @Override
    public BrandDto createBrand(BrandDto brandDto) {
        Brand brand = new Brand();
        brand.setBrand_name(brandDto.getBrand_name());
        if (brandDto.getChain_id() != null) {
            Chain chain = chainRepository.findById(brandDto.getChain_id())
                .orElseThrow(() -> new RuntimeException("Chain not found"));
            brand.setChain(chain);
        }
        brand.setIs_active(brandDto.getIs_active() == null ? Boolean.TRUE : brandDto.getIs_active());
        brand.setCreated_at(LocalDateTime.now());
        brand.setUpdated_at(LocalDateTime.now());

        Brand saved = brandRepository.save(brand);

        BrandDto out = new BrandDto();
        out.setBrand_id(saved.getBrand_id());
        out.setBrand_name(saved.getBrand_name());
        out.setChain_id(saved.getChain() != null ? saved.getChain().getChain_id() : null);
        out.setIs_active(saved.getIs_active());
        out.setCreated_at(saved.getCreated_at());
        out.setUpdated_at(saved.getUpdated_at());
        return out;
    }

    @Override
    public BrandDto updateBrand(Long brandId, BrandDto brandDto) {
        Brand brand = brandRepository.findById(brandId)
            .orElseThrow(() -> new RuntimeException("Brand not found"));

        if (brandDto.getBrand_name() != null) brand.setBrand_name(brandDto.getBrand_name());
        if (brandDto.getChain_id() != null) {
            Chain chain = chainRepository.findById(brandDto.getChain_id())
                .orElseThrow(() -> new RuntimeException("Chain not found"));
            brand.setChain(chain);
        }
        if (brandDto.getIs_active() != null) brand.setIs_active(brandDto.getIs_active());
        brand.setUpdated_at(LocalDateTime.now());

        Brand saved = brandRepository.save(brand);

        BrandDto out = new BrandDto();
        out.setBrand_id(saved.getBrand_id());
        out.setBrand_name(saved.getBrand_name());
        out.setChain_id(saved.getChain() != null ? saved.getChain().getChain_id() : null);
        out.setIs_active(saved.getIs_active());
        out.setCreated_at(saved.getCreated_at());
        out.setUpdated_at(saved.getUpdated_at());
        return out;
    }

    @Override
    public void deleteBrand(Long brandId) {
        brandRepository.deleteById(brandId);
    }

    @Override
    public List<BrandDto> getAllBrands() {
        return brandRepository.findAll().stream().map(b -> {
            BrandDto out = new BrandDto();
            out.setBrand_id(b.getBrand_id());
            out.setBrand_name(b.getBrand_name());
            out.setChain_id(b.getChain() != null ? b.getChain().getChain_id() : null);
            out.setIs_active(b.getIs_active());
            out.setCreated_at(b.getCreated_at());
            out.setUpdated_at(b.getUpdated_at());
            return out;
        }).collect(Collectors.toList());
    }

    @Override
    public BrandDto getBrandById(Long brandId) {
        return brandRepository.findById(brandId).map(b -> {
            BrandDto out = new BrandDto();
            out.setBrand_id(b.getBrand_id());
            out.setBrand_name(b.getBrand_name());
            out.setChain_id(b.getChain() != null ? b.getChain().getChain_id() : null);
            out.setIs_active(b.getIs_active());
            out.setCreated_at(b.getCreated_at());
            out.setUpdated_at(b.getUpdated_at());
            return out;
        }).orElseThrow(() -> new RuntimeException("Brand not found"));
    }
}
