package com.leankurt.erp.manufacturing_erp.repo;

import com.leankurt.erp.manufacturing_erp.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository  extends JpaRepository<Material, Long> {
}
