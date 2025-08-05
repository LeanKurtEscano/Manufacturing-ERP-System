package com.leankurt.erp.manufacturing_erp.controller;


import com.leankurt.erp.manufacturing_erp.dto.Product.CategoryDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.MaterialDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.ProductDto;
import com.leankurt.erp.manufacturing_erp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/categories")
    public ResponseEntity<String> createCategory(@RequestBody CategoryDto dto) {
        productService.addCategory(dto);
        return ResponseEntity.ok("Category added");
    }

    @PostMapping("/materials")
    public ResponseEntity<String> createMaterial(@RequestBody MaterialDto dto) {
        productService.addMaterial(dto);
        return ResponseEntity.ok("Material added");
    }

    @PostMapping("/products")
    public ResponseEntity<String> createProduct(@RequestBody ProductDto dto) {
        productService.addProduct(dto);
        return ResponseEntity.ok("Product added with BOM");
    }

}
