package com.jornwer.coursework.service;

import com.jornwer.coursework.dto.AuthenticationResponse;
import com.jornwer.coursework.dto.LoginRequest;
import com.jornwer.coursework.dto.RefreshTokenRequest;
import com.jornwer.coursework.dto.RegisterRequest;
import com.jornwer.coursework.model.Role;
import com.jornwer.coursework.model.Status;
import com.jornwer.coursework.model.User;
import com.jornwer.coursework.repository.UserRepository;
import com.jornwer.coursework.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;

    public void signup(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreatedDate(Instant.now());
        user.setStatus(Status.ACTIVE);
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        String token = jwtTokenProvider.createToken(loginRequest.getUsername(), Role.USER.toString());
        return AuthenticationResponse.builder()
            .authenticationToken(token)
            .refreshToken(refreshTokenService.generateRefreshToken().getToken())
            .expiresAt(Instant.now().plusMillis(jwtTokenProvider.getValidityInMilliseconds() * 1000))
            .username(loginRequest.getUsername())
            .build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtTokenProvider.generateTokenWithUserName(refreshTokenRequest.getUsername());
        return AuthenticationResponse.builder()
            .authenticationToken(token)
            .refreshToken(refreshTokenRequest.getRefreshToken())
            .expiresAt(Instant.now().plusMillis(jwtTokenProvider.getValidityInMilliseconds() * 1000))
            .username(refreshTokenRequest.getUsername())
            .build();
    }
}
