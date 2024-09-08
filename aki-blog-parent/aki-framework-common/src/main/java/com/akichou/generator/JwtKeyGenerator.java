package com.akichou.generator;

import java.security.SecureRandom;
import java.util.Base64;

import static com.akichou.constant.SystemConstants.JWT_KEY_GENERATOR_KEY_BYTE_LEN;

/**
 * JwtKey Generator Utility
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
public class JwtKeyGenerator {
    public static void main(String[] args) {

        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[JWT_KEY_GENERATOR_KEY_BYTE_LEN];
        secureRandom.nextBytes(key);
        String base64Key = Base64.getEncoder().encodeToString(key);

        System.out.println("Generated JWT Key: " + base64Key);
    }
}