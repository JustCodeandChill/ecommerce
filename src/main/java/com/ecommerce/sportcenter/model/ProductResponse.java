package com.ecommerce.sportcenter.model;

import com.ecommerce.sportcenter.entity.Brand;
import com.ecommerce.sportcenter.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;

    private String description;
    private Long price;

    private String imageUrl;

    private String brandName;

    private String typeName;
}
