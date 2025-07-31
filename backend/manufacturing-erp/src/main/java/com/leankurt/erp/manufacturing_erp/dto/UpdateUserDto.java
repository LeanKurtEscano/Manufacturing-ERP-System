package com.leankurt.erp.manufacturing_erp.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDto {

    private String firstName;
    private String middleName;
    private String lastName;
    private String role;
    private Integer age;
    private String email;
    private String contactNumber;
    private String address;
}
