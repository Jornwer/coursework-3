package com.jornwer.coursework;

import com.jornwer.coursework.dto.AuthRequest;
import com.jornwer.coursework.dto.AuthenticationResponse;
import com.jornwer.coursework.exception.DuplicateUserException;
import com.jornwer.coursework.service.AuthService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class AuthServiceTests {
    private final AuthService authService;

    @Autowired
    public AuthServiceTests(AuthService authService) {
        this.authService = authService;
    }

    @Test
    void loginTest() {
        AuthRequest authRequest = new AuthRequest("Jornwer", "qwertyuiop");
        AuthenticationResponse response = authService.login(authRequest);
        Assertions.assertNotNull(response);
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
