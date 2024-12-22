package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.comment.CommentAddDto;
import com.akichou.domain.vo.comment.CommentVo;
import com.akichou.domain.vo.page.PageVo;

/**
 * Comment Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface CommentService {

    ResponseResult<PageVo<CommentVo>> getCommentList(String commentType, Long articleId, Integer pageNum, Integer pageSize);

    ResponseResult<Object> addComment(CommentAddDto commentAddDto);
}
