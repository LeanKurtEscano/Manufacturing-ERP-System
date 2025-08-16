package com.leankurt.erp.manufacturing_erp.dto.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;               // add if you want the product id
    private String name;
    private String sku;
    private String categoryId;     // keep this as String or change to Long if numeric
    private String description;
    private List<BOMDto> bom;
    private float totalCost;
    private LocalDateTime createdAt;

    // Mapper
    public static ProductDto fromEntity(com.leankurt.erp.manufacturing_erp.model.Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSku(product.getSku());
        dto.setDescription(product.getDescription());
        dto.setTotalCost(product.getTotalCost());
        dto.setCreatedAt(product.getCreatedAt());

        // Extract categoryId instead of the whole Category
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId().toString());
        }

        // You can also map BOM list if needed
        // dto.setBom(product.getBom().stream()
        //        .map(BOMDto::fromEntity)
        //        .toList());

        return dto;
    }
}
