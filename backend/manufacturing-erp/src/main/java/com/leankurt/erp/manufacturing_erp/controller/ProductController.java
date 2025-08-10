package com.leankurt.erp.manufacturing_erp.controller;


import com.leankurt.erp.manufacturing_erp.dto.Product.CategoryDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.MaterialDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.ProductDto;
import com.leankurt.erp.manufacturing_erp.model.Category;
import com.leankurt.erp.manufacturing_erp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;



    @PostMapping("/category")
    public ResponseEntity<String> createCategory(@RequestBody CategoryDto dto) {
        productService.addCategory(dto);
        return ResponseEntity.ok("Category added");
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategory() {
        return ResponseEntity.ok(productService.getAllCategory());

    }



    @PostMapping("/material")
    public ResponseEntity<?> createMaterial(@RequestBody MaterialDto dto) {
        productService.addMaterial(dto);
        return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.CREATED);
    }


    @GetMapping("/materials")
    public ResponseEntity<?> getMaterials() {
        return  ResponseEntity.ok(productService.getAllMaterials());
    }

    @PostMapping("/products")
    public ResponseEntity<String> createProduct(@RequestBody ProductDto dto) {
        productService.addProduct(dto);
        return ResponseEntity.ok("Product added with BOM");
    }

}
