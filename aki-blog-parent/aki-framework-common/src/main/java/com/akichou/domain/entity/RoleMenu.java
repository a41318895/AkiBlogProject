package com.akichou.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Role Menu Entity
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "sys_role_menu")
public class RoleMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;
}