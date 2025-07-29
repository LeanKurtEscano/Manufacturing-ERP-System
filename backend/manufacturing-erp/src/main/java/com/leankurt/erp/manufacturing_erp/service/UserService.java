package com.leankurt.erp.manufacturing_erp.service;


import com.leankurt.erp.manufacturing_erp.dto.RegistrationDto;
import com.leankurt.erp.manufacturing_erp.exception.EmailAlreadyExistsException;
import com.leankurt.erp.manufacturing_erp.model.User;
import com.leankurt.erp.manufacturing_erp.model.UserDetailsImpl;
import com.leankurt.erp.manufacturing_erp.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public  class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


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
        user.setEmail(request.getEmail());
        user.setAge(request.getAge());


        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);


        String employeeId = generateEmployeeId();
        user.setEmployeeId(employeeId);


        userRepository.save(user);
    }








}
