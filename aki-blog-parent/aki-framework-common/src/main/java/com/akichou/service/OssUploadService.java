package com.akichou.service;

import com.akichou.domain.ResponseResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * Oss Upload Service Interface
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
public interface OssUploadService {

    ResponseResult<Object> uploadImg(MultipartFile img) ;
}
