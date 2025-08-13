package com.leankurt.erp.manufacturing_erp.repo;

import com.leankurt.erp.manufacturing_erp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
