package com.leankurt.erp.manufacturing_erp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Bom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Material material;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
