package com.akichou.service;

import com.akichou.domain.ResponseResult;
import com.akichou.domain.dto.link.LinkAddDto;
import com.akichou.domain.dto.link.LinkEditDto;
import com.akichou.domain.dto.link.LinkChangeStatusDto;
import com.akichou.domain.dto.link.LinkSelectConditionsDto;
import com.akichou.domain.entity.Link;
import com.akichou.domain.vo.link.LinkInfoVo;
import com.akichou.domain.vo.link.LinkPageSelectVo;
import com.akichou.domain.vo.link.LinkVo;
import com.akichou.domain.vo.page.PageVo;

import java.util.List;

/**
 * Link Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface LinkService {

    ResponseResult<List<LinkVo>> getAllLink();

    ResponseResult<PageVo<LinkPageSelectVo>> selectLinks(Integer pageNum, Integer pageSize, LinkSelectConditionsDto linkSelectConditionsDto);

    ResponseResult<Object> addLink(LinkAddDto linkAddDto);

    ResponseResult<LinkInfoVo> getLinkById(Long linkId);

    ResponseResult<Object> editLink(LinkEditDto linkEditDto);

    ResponseResult<Object> deleteLink(Long linkId);

    ResponseResult<Object> changeLinkStatus(LinkChangeStatusDto linkChangeStatusDto);

    List<Link> listExistLinks();
}
