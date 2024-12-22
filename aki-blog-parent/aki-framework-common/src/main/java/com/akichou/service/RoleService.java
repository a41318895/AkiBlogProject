package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.role.RoleAddDto;
import com.akichou.domain.dto.role.RoleChangeStatusDto;
import com.akichou.domain.dto.role.RoleEditDto;
import com.akichou.domain.dto.role.RoleSelectConditionsDto;
import com.akichou.domain.entity.Role;
import com.akichou.domain.vo.page.PageVo;
import com.akichou.domain.vo.role.RoleListVo;
import com.akichou.domain.vo.role.RolePageSelectVo;
import com.akichou.domain.vo.role.RoleInfoVo;

import java.util.List;

/**
 * Role Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface RoleService {

    List<String> getRoleKeysByUserId(Long id);

    ResponseResult<PageVo<RolePageSelectVo>> selectRoles(Integer pageNum, Integer pageSize, RoleSelectConditionsDto roleSelectConditionsDto);

    ResponseResult<Object> changeRoleStatus(RoleChangeStatusDto roleChangeStatusDto);

    ResponseResult<Object> addRole(RoleAddDto roleAddDto);

    ResponseResult<RoleInfoVo> getRoleInfo(Long roleId);

    ResponseResult<Object> editRole(RoleEditDto roleEditDto);

    ResponseResult<Object> deleteRole(Long roleId);

    ResponseResult<List<RoleListVo>> listAllRoles();

    List<Role> listExistRoles();
}
