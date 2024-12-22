package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.user.UserLoginRequest;
import com.akichou.domain.vo.user.BlogUserLoginVo;

/**
 * Blog Login Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface BlogLoginService {

    ResponseResult<BlogUserLoginVo> login(UserLoginRequest userLoginRequest);

    ResponseResult<Object> logout();
}
