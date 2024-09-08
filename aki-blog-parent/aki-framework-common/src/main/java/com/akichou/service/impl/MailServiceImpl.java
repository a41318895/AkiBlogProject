package com.akichou.service.impl;

import com.akichou.service.MailService;
import com.akichou.generator.NonceGenerator;
import com.akichou.util.RedisCache;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import static com.akichou.constant.SystemConstants.VERIFY_CODE_REDIS_KEY;

/**
 * Mail Service Implementation
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final RedisCache redisCache ;

    @Override
    public void sendMailForForgettingPassword(String receiverEmail) {

        String numberUsedOnceCode = NonceGenerator.generateNonce();
        redisCache.setCacheObject(VERIFY_CODE_REDIS_KEY, numberUsedOnceCode, 5, TimeUnit.MINUTES) ;

        final String subject = "Forgot Password Info Verified Successfully" ;
        String content = "Your Verification Code is : [ " + numberUsedOnceCode + " ]\n\n Please key this into 'Verification Code Space' to verify identification and finish password reset process in 5 minutes !" ;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receiverEmail);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);
        log.info("Mail contains verification code sent...") ;
    }
}
