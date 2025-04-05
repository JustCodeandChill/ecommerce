package com.ecommerce.sportcenter.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketItemResponse {
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String imageUrl;
    private String productBrand;
    private String productType;
    private Integer quantity;
}
