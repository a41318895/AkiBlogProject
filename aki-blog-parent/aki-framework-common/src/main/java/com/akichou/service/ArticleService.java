package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.article.ArticleAddDto;
import com.akichou.domain.dto.article.ArticleEditDto;
import com.akichou.domain.dto.article.ArticleSelectConditionsDto;
import com.akichou.domain.entity.Article;
import com.akichou.domain.vo.article.*;
import com.akichou.domain.vo.page.PageVo;

import java.util.List;

/**
 * Article Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface ArticleService {

    // BLog Client Side
    ResponseResult<List<HotArticleVo>> getHotArticleList();

    ResponseResult<PageVo<ArticleVo>> getArticleList(Integer pageNum, Integer pageSize, Long categoryId);

    ResponseResult<ArticleDetailVo> getArticleDetail(Long articleId) ;

    ResponseResult<Object> updateViewCount(Long articleId);

    // Blog Admin
    ResponseResult<Object> addArticle(ArticleAddDto articleAddDto);

    ResponseResult<PageVo<ArticlePageSelectVo>> selectArticles(Integer pageNum, Integer pageSize, ArticleSelectConditionsDto articleSelectConditionsDto);

    ResponseResult<ArticleInfoVo> getArticle(Long articleId);

    ResponseResult<Object> editArticle(ArticleEditDto articleEditDto);

    ResponseResult<Object> deleteArticle(Long articleId);

    List<Article> listExistArticles();
}
