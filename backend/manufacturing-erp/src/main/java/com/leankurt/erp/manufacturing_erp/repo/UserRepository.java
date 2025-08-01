package com.leankurt.erp.manufacturing_erp.repo;

import com.leankurt.erp.manufacturing_erp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByEmailAddress(String email);
    List<User> findByRoleNot(String role);
}
