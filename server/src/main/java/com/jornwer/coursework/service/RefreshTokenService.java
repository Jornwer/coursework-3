package com.jornwer.coursework.service;

import com.jornwer.coursework.model.RefreshToken;
import com.jornwer.coursework.repository.RefreshTokenRepository;
import com.jornwer.coursework.exception.JwtAuthenticationException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public void deleteRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteByToken(refreshToken);
    }

    public RefreshToken generateRefreshToken() {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedDate(Instant.now());

        return refreshTokenRepository.save(refreshToken);
    }

    public void validateRefreshToken(String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken)
            .orElseThrow(() -> new JwtAuthenticationException("Invalid refresh Token"));
    }
}
