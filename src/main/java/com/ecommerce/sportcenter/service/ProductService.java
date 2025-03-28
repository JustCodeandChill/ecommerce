package com.ecommerce.sportcenter.service;

import com.ecommerce.sportcenter.model.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductService {
    Page<ProductResponse> getAllProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword);
    ProductResponse getProductById(Integer id);
}
