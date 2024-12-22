package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.user.UserLoginRequest;
import com.akichou.domain.vo.user.AdminUserLoginVo;

/**
 * Blog Admin Login Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface BlogAdminLoginService {

    ResponseResult<AdminUserLoginVo> adminLogin(UserLoginRequest userLoginRequest);

    ResponseResult<Object> logout();
}
