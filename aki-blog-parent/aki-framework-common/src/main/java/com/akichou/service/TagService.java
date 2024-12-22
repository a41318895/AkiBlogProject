package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.tag.TagAddDto;
import com.akichou.domain.dto.tag.TagEditDto;
import com.akichou.domain.dto.tag.TagSelectConditionsDto;
import com.akichou.domain.entity.Tag;
import com.akichou.domain.vo.page.PageVo;
import com.akichou.domain.vo.tag.TagInfoVo;
import com.akichou.domain.vo.tag.TagPageSelectVo;
import com.akichou.domain.vo.tag.TagVo;

import java.util.List;

/**
 * Tag Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface TagService {

    ResponseResult<PageVo<TagPageSelectVo>> selectTags(Integer pageNum, Integer pageSize, TagSelectConditionsDto tagSelectConditionsDto);

    ResponseResult<Object> addTag(TagAddDto tagAddDto);

    ResponseResult<Object> deleteTag(Long tagId);

    ResponseResult<TagInfoVo> getTag(Long tagId);

    ResponseResult<Object> editTag(TagEditDto tagEditDto);

    ResponseResult<List<TagVo>> listAllTags();

    List<Tag> listExistTags();
}
