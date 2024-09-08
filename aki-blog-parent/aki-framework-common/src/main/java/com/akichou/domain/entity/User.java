package com.akichou.domain.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User Entity
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sys_user")
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String nickName;

    private String password;

    private String type;

    private String status;

    private String email;

    private String phoneNumber;

    private String sex;

    private String avatar;

    private Long createBy;

    private Date createTime;

    private Long updateBy;

    private Date updateTime;

    private Integer delFlag;

}