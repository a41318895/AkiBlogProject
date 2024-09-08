package com.akichou.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Article Tag Entity
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "aki_article_tag")
public class ArticleTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
