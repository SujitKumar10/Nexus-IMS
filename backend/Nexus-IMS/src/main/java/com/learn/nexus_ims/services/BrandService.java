package com.learn.nexus_ims.services;

import java.util.List;

import com.learn.nexus_ims.dtos.BrandDto;

public interface BrandService {
    BrandDto createBrand(BrandDto brandDto);
    BrandDto updateBrand(Long brandId, BrandDto brandDto);
    void deleteBrand(Long brandId);
    List<BrandDto> getAllBrands();
    BrandDto getBrandById(Long brandId);
}
