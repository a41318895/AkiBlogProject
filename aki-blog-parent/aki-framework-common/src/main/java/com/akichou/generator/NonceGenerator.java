package com.akichou.generator;

import java.security.SecureRandom;

import static com.akichou.constant.SystemConstants.NONCE_GENERATOR_NONCE_BYTE_LEN;

/**
 * Nonce Generator
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
public class NonceGenerator {

    public static String generateNonce() {

        SecureRandom secureRandom = new SecureRandom();
        byte[] nonceBytes = new byte[NONCE_GENERATOR_NONCE_BYTE_LEN];
        secureRandom.nextBytes(nonceBytes);
        return bytesToHex(nonceBytes);
    }

    private static String bytesToHex(byte[] bytes) {

        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
