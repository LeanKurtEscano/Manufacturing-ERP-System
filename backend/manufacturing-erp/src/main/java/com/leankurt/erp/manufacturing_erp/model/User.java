package com.leankurt.erp.manufacturing_erp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    private Integer age;

    @Column(name  = "email_address",unique = true, nullable = false)
    private String emailAddress;

    @Column(nullable = false)
    private String address;


    @Column(name = "contact_number", unique = true,nullable = false)
    private String contactNumber;

    private String role;

    private String password;

    private String employeeId;

}
