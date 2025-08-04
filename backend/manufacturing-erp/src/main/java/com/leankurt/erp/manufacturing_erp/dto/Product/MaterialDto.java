package com.leankurt.erp.manufacturing_erp.dto.Product;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialDto {
    private String name;
    private String sku;
    private Long category;
    private  float unitCost;
    private String unit;
    private String supplier;
    private String description;
}
