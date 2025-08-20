package com.leankurt.erp.manufacturing_erp.controller;


import com.leankurt.erp.manufacturing_erp.dto.Product.CategoryDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.MaterialDto;
import com.leankurt.erp.manufacturing_erp.dto.Product.ProductDto;
import com.leankurt.erp.manufacturing_erp.model.Category;
import com.leankurt.erp.manufacturing_erp.model.Material;
import com.leankurt.erp.manufacturing_erp.model.Product;
import com.leankurt.erp.manufacturing_erp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

        Object result = productService.getAllMaterials();
        System.out.println("DEBUG >>> " + result.getClass());

        return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.CREATED);
    }


    @GetMapping("/materials")
    public ResponseEntity<Map<String, Object>> getMaterials() {
        List<MaterialDto> materials = productService.getAllMaterials();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", materials); // ✅ let Jackson handle serialization

        return ResponseEntity.ok(response);
    }


    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductDto dto) {
        productService.addProduct(dto);
        return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.CREATED);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProduct(@PathVariable String id) {
        Optional<Product> product =  productService.getProduct(id);
        return (ResponseEntity<?>) ResponseEntity.ok(product);
    }



    @GetMapping("/all-products")
    public ResponseEntity<?> getAllProducts() {
        List<ProductDto> product =  productService.getAllProducts();
        return (ResponseEntity<?>) ResponseEntity.ok(product);
    }

}
