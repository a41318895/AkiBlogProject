package com.akichou.service;

import com.akichou.domain.dto.category.CategoryAddDto;
import com.akichou.domain.dto.category.CategorySelectConditionsDto;
import com.akichou.domain.dto.category.CategoryEditDto;
import com.akichou.domain.entity.Category;
import com.akichou.domain.ResponseResult;
import com.akichou.domain.vo.category.CategoryInfoVo;
import com.akichou.domain.vo.category.CategoryPageSelectVo;
import com.akichou.domain.vo.category.CategoryVo;
import com.akichou.domain.vo.page.PageVo;

import java.util.List;
import java.util.Set;

/**
 * Category Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface CategoryService {

    ResponseResult<List<CategoryVo>> listAllCategories();

    List<Category> getAllById(Set<Long> categoryIds) ;

    List<Category> listExistCategories() ;

    ResponseResult<PageVo<CategoryPageSelectVo>> selectCategories(Integer pageNum, Integer pageSize, CategorySelectConditionsDto categorySelectConditionsDto);

    ResponseResult<Object> addCategory(CategoryAddDto categoryAddDto);

    ResponseResult<CategoryInfoVo> getCategory(Long categoryId);

    ResponseResult<Object> editCategory(CategoryEditDto categoryEditDto);

    ResponseResult<Object> deleteCategory(Long categoryId);
}
