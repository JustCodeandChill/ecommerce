package com.ecommerce.sportcenter.service;

import com.ecommerce.sportcenter.entity.Product;
import com.ecommerce.sportcenter.model.ProductResponse;
import com.ecommerce.sportcenter.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        log.info("getting AllProducts");
        Page<Product> productsPage = productRepository.findAll(pageable);
        Page<ProductResponse> responses = productsPage
                        .map(this::convertToProductResponse);
        log.info("Fetched AllProducts");
        return responses;
    }

    @Override
    public ProductResponse getProductById(Integer id) {
        log.info("getting Product by id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product with id " + id + " not found"));
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by id: {}", id);
        return productResponse;
    }


    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId()).name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .typeName(product.getType().getName())
                .brandName(product.getBrand().getName())
                .build();
    }
}
