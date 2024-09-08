package com.akichou.connectionTest;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Redis Connect Test
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
@Component
@RequiredArgsConstructor
public class RedisConnectionTest implements CommandLineRunner {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void run(String... args) {
        try {
            String pingResponse = Objects.requireNonNull(redisTemplate.getConnectionFactory()).getConnection().ping();
            System.out.println("Redis connection is OK: " + pingResponse);
        } catch (Exception e) {
            System.out.println("Failed to connect to Redis: " + e.getMessage());
        }
    }
}