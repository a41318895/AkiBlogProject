package com.akichou.config;

import com.akichou.interceptor.RateLimitInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.akichou.constant.SystemConstants.PASSWORD_FORGOT_PATH_TO_LIMIT;

/**
 * Web Configuration
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns(PASSWORD_FORGOT_PATH_TO_LIMIT) ;
    }
}
