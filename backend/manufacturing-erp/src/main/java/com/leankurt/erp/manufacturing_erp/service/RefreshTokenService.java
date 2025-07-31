package com.leankurt.erp.manufacturing_erp.service;


import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class RefreshTokenService {
    private final Set<String> blacklistedTokens = Collections.synchronizedSet(new HashSet<>());

    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }
}
