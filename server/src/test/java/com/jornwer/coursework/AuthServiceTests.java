package com.jornwer.coursework;

import com.jornwer.coursework.dto.AuthRequest;
import com.jornwer.coursework.dto.AuthenticationResponse;
import com.jornwer.coursework.exception.DuplicateUserException;
import com.jornwer.coursework.service.AuthService;
import com.jornwer.coursework.service.RefreshTokenService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.UUID;

@SpringBootTest
public class AuthServiceTests {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthServiceTests(AuthService authService, RefreshTokenService refreshTokenService) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
    }

    @Test
    void loginTest() {
        AuthRequest authRequest = new AuthRequest("Jornwer", "qwertyuiop");
        AuthenticationResponse response = authService.login(authRequest);
        refreshTokenService.deleteRefreshToken(response.getRefreshToken());
        Assertions.assertNotNull(response);

        authRequest.setPassword(UUID.randomUUID().toString());
        Assertions.assertThrows(BadCredentialsException.class, () -> authService.login(authRequest));
    }

    @Test
    void signupTest() throws Exception {
        AuthRequest authRequest = new AuthRequest("Jornwer", "qwertyuiop");
        try {
            authService.signup(authRequest);
            throw new Exception();
        } catch (DuplicateUserException e) { }
    }

    @Test
    void isUserRegisteredTest() {
        String username = "Jornwer";
        Assertions.assertTrue(authService.isUserRegistered(username));
        username = UUID.randomUUID().toString();
        Assertions.assertFalse(authService.isUserRegistered(username));
    }
}
