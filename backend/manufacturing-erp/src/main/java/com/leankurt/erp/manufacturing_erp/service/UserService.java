package com.leankurt.erp.manufacturing_erp.service;


import com.leankurt.erp.manufacturing_erp.config.JwtUtil;
import com.leankurt.erp.manufacturing_erp.dto.LoginDto;
import com.leankurt.erp.manufacturing_erp.dto.RegistrationDto;
import com.leankurt.erp.manufacturing_erp.dto.UpdateUserDto;
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
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
        User user = userRepository.findByEmailAddress(email)
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

        if(userRepository.findByEmailAddress(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email Already Exists");
        }




        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setMiddleName(request.getMiddleName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setEmailAddress(request.getEmail());
        user.setAddress(request.getAddress());
        user.setContactNumber(request.getContactNumber());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmployeeId("EMP-" + UUID.randomUUID().toString().substring(0, 8));

        userRepository.save(user);
    }

    public Map<String,Object> loginUser(LoginDto loginRequest) {
        User user = userRepository.findByEmailAddress(loginRequest.getEmail())
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
        return String.valueOf(userRepository.findByEmailAddress(email));
    }

    public List<User> getAllUsers() {
        return  userRepository.findAll();
    }


    public void updateUser(Long userId, UpdateUserDto dto) {
        User user  =  userRepository.findById(userId).orElseThrow(() ->  new NotFoundException("User is not found"));

        user.setFirstName(dto.getFirstName());
        user.setMiddleName(dto.getMiddleName());
        user.setLastName(dto.getLastName());
        user.setAddress(dto.getAddress());
        user.setAge(dto.getAge());
        user.setEmailAddress(dto.getEmail());
        user.setContactNumber(dto.getContactNumber());
        user.setRole(dto.getRole());

        userRepository.save(user);
    }






}
