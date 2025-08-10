package com.leankurt.erp.manufacturing_erp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Category {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long Id;
     private String name;
     private String description;


     @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
     @JsonIgnore
     private List<Material> materials;

}
