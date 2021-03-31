package com.jornwer.coursework.service;

import com.jornwer.coursework.dto.AuthenticationResponse;
import com.jornwer.coursework.dto.AuthRequest;
import com.jornwer.coursework.dto.RefreshTokenRequest;
import com.jornwer.coursework.exception.DuplicateUserException;
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

    public void signup(AuthRequest authRequest) throws DuplicateUserException {
        if (isUserRegistered(authRequest.getUsername())){
            throw new DuplicateUserException("User with this username already exists");
        }
        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        user.setCreatedDate(Instant.now());
        user.setStatus(Status.ACTIVE);
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    private boolean isUserRegistered(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public AuthenticationResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        String token = jwtTokenProvider.createToken(authRequest.getUsername(), Role.USER.toString());
        return AuthenticationResponse.builder()
            .authenticationToken(token)
            .refreshToken(refreshTokenService.generateRefreshToken().getToken())
            .expiresAt(Instant.now().plusMillis(jwtTokenProvider.getValidityInMilliseconds() * 1000))
            .username(authRequest.getUsername())
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
