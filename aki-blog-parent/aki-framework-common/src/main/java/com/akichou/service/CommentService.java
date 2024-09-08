package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.CommentAddDto;
import com.akichou.domain.vo.CommentVo;
import com.akichou.domain.vo.PageVo;

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
