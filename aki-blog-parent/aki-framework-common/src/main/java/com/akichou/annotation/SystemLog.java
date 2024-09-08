package com.akichou.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * SystemLog (Executing business name log)
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface SystemLog {

    String businessName() ;
}
