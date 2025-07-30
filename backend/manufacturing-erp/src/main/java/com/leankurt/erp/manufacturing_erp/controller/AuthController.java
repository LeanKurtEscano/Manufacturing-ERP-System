package com.leankurt.erp.manufacturing_erp.controller;
import com.leankurt.erp.manufacturing_erp.config.JwtUtil;
import com.leankurt.erp.manufacturing_erp.dto.LoginDto;
import com.leankurt.erp.manufacturing_erp.dto.RegistrationDto;
import com.leankurt.erp.manufacturing_erp.model.User;
import com.leankurt.erp.manufacturing_erp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationDto user) {
        userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");



    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginRequest) {

            Map<String, Object> auth = userService.loginUser(loginRequest);
            return ResponseEntity.ok(auth);

    }
}
