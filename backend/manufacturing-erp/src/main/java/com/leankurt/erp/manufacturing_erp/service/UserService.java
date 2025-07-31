package com.leankurt.erp.manufacturing_erp.service;


import com.leankurt.erp.manufacturing_erp.config.JwtUtil;
import com.leankurt.erp.manufacturing_erp.dto.LoginDto;
import com.leankurt.erp.manufacturing_erp.dto.RegistrationDto;
import com.leankurt.erp.manufacturing_erp.exception.BadRequestException;
import com.leankurt.erp.manufacturing_erp.exception.EmailAlreadyExistsException;
import com.leankurt.erp.manufacturing_erp.exception.NotFoundException;
import com.leankurt.erp.manufacturing_erp.model.User;
import com.leankurt.erp.manufacturing_erp.model.UserDetailsImpl;
import com.leankurt.erp.manufacturing_erp.repo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Service
public  class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return new UserDetailsImpl(user);
    }


    private String generateEmployeeId() {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder id = new StringBuilder();


        id.append(alphabet.charAt((int) (Math.random() * alphabet.length())));


        for (int i = 0; i < 4; i++) {
            id.append(alphanum.charAt((int) (Math.random() * alphanum.length())));
        }

        return id.toString(); // e.g., "R2XA9"
    }



    public void registerUser(RegistrationDto request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email Already Exists");
        }


        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setMiddleName(request.getMiddleName());
        user.setLastName(request.getLastName());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());
        user.setEmail(request.getEmail());
        user.setAge(request.getAge());


        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);


        String employeeId = generateEmployeeId();
        user.setEmployeeId(employeeId);


        userRepository.save(user);
    }

    public Map<String,Object> loginUser(LoginDto loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException("Email not found."));

        boolean passwordMatch = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if (!passwordMatch) {
            throw new BadRequestException("Invalid password.");
        }

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        String accessToken = jwtUtil.generateAccessToken(loginRequest.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(loginRequest.getEmail());

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        claims.put("access_token", accessToken);
        claims.put("refresh_token",refreshToken);

        return  claims;


    }

    public String getEmail(String email) {
        return String.valueOf(userRepository.findByEmail(email));
    }






}
