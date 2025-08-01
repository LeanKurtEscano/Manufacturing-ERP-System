package com.leankurt.erp.manufacturing_erp.controller;


import com.leankurt.erp.manufacturing_erp.dto.UpdateUserDto;
import com.leankurt.erp.manufacturing_erp.model.User;
import com.leankurt.erp.manufacturing_erp.repo.UserRepository;
import com.leankurt.erp.manufacturing_erp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;



    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserDto dto) {

        userService.updateUser(id,dto);
        return  ResponseEntity.ok("Successfully updated User");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

}
