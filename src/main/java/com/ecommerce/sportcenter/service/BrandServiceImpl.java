package com.ecommerce.sportcenter.service;

import com.ecommerce.sportcenter.entity.Brand;
import com.ecommerce.sportcenter.model.BrandResponse;
import com.ecommerce.sportcenter.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Autowired
    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    /**
     * Gets all the brands.
     *
     * @return A list of all the BrandResponse objects.
     */
    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching all brands!");
        List<Brand> brandList = brandRepository.findAll();
        // stream operator to map response
        List<BrandResponse> brandResponses = brandList.stream()
                .map(this::convertToBrandResponse)
                .collect(Collectors.toList());
        log.info("Fetched all brands!");
        return brandResponses;
    }

    /**
     * Convert a {@link Brand} entity to a {@link BrandResponse} for exposing to the outside world.
     * @param brand The brand to convert.
     * @return The converted response.
     */
    private BrandResponse convertToBrandResponse(Brand brand) {
        return BrandResponse.builder().id(brand.getId()).name(brand.getName()).build();
    }
}
