package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.user.*;
import com.akichou.domain.entity.User;
import com.akichou.domain.vo.page.PageVo;
import com.akichou.domain.vo.user.UserInfoAndRoleListVo;
import com.akichou.domain.vo.user.UserInfoVo;
import com.akichou.domain.vo.user.UserPageSelectVo;

import java.util.List;

/**
 * User Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface UserService {

    ResponseResult<UserInfoVo> getUserInfo();

    ResponseResult<Object> updateUserInfo(UserInfoRequest userInfoRequest);

    ResponseResult<Object> register(UserRegisterRequest userRegisterRequest);

    ResponseResult<PageVo<UserPageSelectVo>> selectUsers(Integer pageNum, Integer pageSize, UserSelectConditionsDto userSelectConditionsDto);

    ResponseResult<Object> addUser(UserAddDto userAddDto);

    ResponseResult<Object> deleteUser(Long userId);

    ResponseResult<UserInfoAndRoleListVo> getUser(Long userId);

    ResponseResult<Object> editUser(UserEditDto userEditDto);

    ResponseResult<Object> changeUserStatus(UserChangeStatusDto userChangeStatusDto);

    List<User> listExistUsers();

    ResponseResult<Object> forgotPassword(CheckInfoDto checkInfoDto);

    ResponseResult<Object> verifyCode(String verificationCode);

    ResponseResult<Object> resetPassword(PasswordResetRequest passwordResetRequest);
}
