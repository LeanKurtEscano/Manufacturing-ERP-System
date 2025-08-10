package com.leankurt.erp.manufacturing_erp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String sku;
    private String description;
    private String supplier;
    private float costPerUnit;
    private String unit;


    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    private List<Bom> bom;


}
