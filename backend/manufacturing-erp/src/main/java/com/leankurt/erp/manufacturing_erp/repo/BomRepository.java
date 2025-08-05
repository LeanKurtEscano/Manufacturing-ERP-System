package com.leankurt.erp.manufacturing_erp.repo;

import com.leankurt.erp.manufacturing_erp.dto.Product.BOMDto;
import com.leankurt.erp.manufacturing_erp.model.Bom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BomRepository  extends JpaRepository<Bom,Long> {
}
