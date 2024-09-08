package com.akichou.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Role Entity
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "sys_role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleName;

    private String roleKey;

    private Integer roleSort;

    private String status;

    private Long createBy;

    private Date createTime;

    private Long updateBy;

    private Date updateTime;

    private String remark;

    private Integer delFlag;
}
