package com.leankurt.erp.manufacturing_erp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


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
    @JsonIgnore   // 🚀 hides category in JSON
    private Category category;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    @JsonIgnore   // 🚀 hides bom in JSON
    private List<Bom> bom;


    public String getCategoryName() {
        return category != null ? category.getName() : null;
    }

}
