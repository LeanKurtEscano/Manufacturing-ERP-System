package com.leankurt.erp.manufacturing_erp.dto.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private String name;
    private String sku;
    private Long category;
    private String description;
    private BOMDto bom;
}
