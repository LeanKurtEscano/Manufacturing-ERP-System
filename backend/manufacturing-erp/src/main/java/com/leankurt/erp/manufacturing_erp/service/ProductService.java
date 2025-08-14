package com.leankurt.erp.manufacturing_erp.service;


import com.leankurt.erp.manufacturing_erp.dto.Product.BOMDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.CategoryDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.MaterialDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.ProductDto;
import com.leankurt.erp.manufacturing_erp.model.Bom;
import com.leankurt.erp.manufacturing_erp.model.Category;
import com.leankurt.erp.manufacturing_erp.model.Material;
import com.leankurt.erp.manufacturing_erp.model.Product;
import com.leankurt.erp.manufacturing_erp.repo.BomRepository;
import com.leankurt.erp.manufacturing_erp.repo.CategoryRepository;
import com.leankurt.erp.manufacturing_erp.repo.MaterialRepository;
import com.leankurt.erp.manufacturing_erp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private BomRepository bomRepository;
    // ADD CATEGORY
    public void addCategory(CategoryDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        categoryRepository.save(category);
    }

    // ADD MATERIAL
    public void addMaterial(MaterialDto dto) {
        Category category = categoryRepository.findById(dto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + dto.getCategory()));

        Material material = new Material();
        material.setName(dto.getName());
        material.setSku(dto.getSku());
        material.setCategory(category);
        material.setDescription(dto.getDescription());
        material.setCostPerUnit(dto.getCostPerUnit());
        material.setSupplier(dto.getSupplier());
        material.setUnit(dto.getUnit());

        materialRepository.save(material);
    }

    public void addProduct(ProductDto dto) {
        Category category = categoryRepository.findById(Long.parseLong(dto.getCategoryId()))
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + dto.getCategoryId()));

        Product product = new Product();
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setCategory(category);
        product.setDescription(dto.getDescription());

        Product savedProduct = productRepository.save(product);

        float totalCost = 0f;

        for (BOMDto bomDto : dto.getBom()) {
            Material material = materialRepository.findById(bomDto.getMaterialId())
                    .orElseThrow(() -> new RuntimeException("Material not found with ID: " + bomDto.getMaterialId()));

            Bom bom = new Bom();
            bom.setMaterial(material);
            bom.setProduct(savedProduct);
            // You can optionally store quantity in BOM if the entity is updated later

            bomRepository.save(bom);

            // Update cost if quantity is included
            totalCost += material.getCostPerUnit() * bomDto.getQuantity();
        }

        savedProduct.setTotalCost(totalCost);
        productRepository.save(savedProduct); // update with total cost
    }


    public List<Category> getAllCategory() {
        return  categoryRepository.findAll();
    }


    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

}
