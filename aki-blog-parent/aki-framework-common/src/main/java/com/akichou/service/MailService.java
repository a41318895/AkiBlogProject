package com.akichou.service;

/**
 * Mail Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface MailService {

    void sendMailForForgettingPassword(String email);
}
