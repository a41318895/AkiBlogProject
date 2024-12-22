package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.menu.MenuAddDto;
import com.akichou.domain.dto.menu.MenuEditDto;
import com.akichou.domain.vo.menu.MenuInfoVo;
import com.akichou.domain.vo.menu.MenuPageSelectVo;
import com.akichou.domain.vo.menu.MenuTreeSelectVo;
import com.akichou.domain.vo.menu.MenuVo;
import com.akichou.domain.vo.role.RoleMenuTreeSelectVo;

import java.util.List;

/**
 * Menu Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface MenuService {

    List<String> getPermsByUserId(Long id);

    List<MenuVo> getMenuRoutersInfo(Long userId);

    ResponseResult<List<MenuPageSelectVo>> listAllMenu(String menuName, Integer status);

    ResponseResult<Object> addMenu(MenuAddDto menuAddDto);

    ResponseResult<MenuInfoVo> getMenu(Long menuId);

    ResponseResult<Object> editMenu(MenuEditDto menuEditDto);

    ResponseResult<Object> deleteMenu(Long menuId);

    ResponseResult<List<MenuTreeSelectVo>> treeSelect();

    ResponseResult<RoleMenuTreeSelectVo> roleMenuTreeSelect(Long roleId);
}
