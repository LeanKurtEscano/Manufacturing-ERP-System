package com.leankurt.erp.manufacturing_erp.dto.Product;


import com.leankurt.erp.manufacturing_erp.model.Material;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialDto {

    private String categoryName;
    private String name;
    private String sku;
    private Long category;
    private  float costPerUnit;
    private String unit;
    private String supplier;
    private String description;


    public static MaterialDto fromEntity(Material material) {
        MaterialDto dto = new MaterialDto();

        dto.setName(material.getName());
        dto.setSku(material.getSku());
        dto.setDescription(material.getDescription());
        dto.setSupplier(material.getSupplier());
        dto.setCostPerUnit(material.getCostPerUnit());
        dto.setUnit(material.getUnit());

        // 🚀 Custom method to get category name safely

        dto.setCategoryName(material.getCategoryName());

        return dto;
    }

}
