package com.akichou.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Content Entity
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "aki_comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String type;

    private Long articleId;

    private Long rootId;

    private String content;

    private Long toCommentUserId;

    private Long toCommentId;

    private Long createBy;

    private Date createTime;

    private Long updateBy;

    private Date updateTime;

    private Integer delFlag;
}
