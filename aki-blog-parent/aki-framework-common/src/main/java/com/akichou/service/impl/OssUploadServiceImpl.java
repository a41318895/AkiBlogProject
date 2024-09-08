package com.akichou.service.impl;

import com.akichou.customEnum.AppHttpCodeEnum;
import com.akichou.domain.ResponseResult;
import com.akichou.exception.SystemException;
import com.akichou.service.OssUploadService;
import com.akichou.util.PathUtil;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

/**
 * Oss(Object Storage Service) Upload Service Implementation
 *
 * @author Aki Chou
 * @date 2024/08/14 Wed.
 */
@Service
@RequiredArgsConstructor
public class OssUploadServiceImpl implements OssUploadService {

    private static final Logger log = LoggerFactory.getLogger(OssUploadServiceImpl.class);
    private final MinioClient minioClient;

    @Value("${minio.bucket.name}")
    private String bucketName;

    @Value("${oss.minio.local.url}")
    private String minioUrl;

    @Override
    public ResponseResult<Object> uploadImg(MultipartFile img) {

        String originalFilename = img.getOriginalFilename();
        long fileSize = img.getSize();

        // Handle the exception : file type error
        assert originalFilename != null;
        if (!originalFilename.endsWith(".png") && !originalFilename.endsWith(".jpg")) {
            throw new SystemException(AppHttpCodeEnum.FILE_TYPE_ERROR);
        }

        // Handle the exception : file size too large error
        if (fileSize > 2 * 1024 * 1024) {
            throw new SystemException(AppHttpCodeEnum.FILE_SIZE_ERROR);
        }

        String filePath = PathUtil.generateFilePath(originalFilename);

        String url = uploadToMinio(img, filePath);

        return ResponseResult.okResult(url);
    }

    private String uploadToMinio(MultipartFile imgFile, String filePath) {

        try {
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            InputStream inputStream = imgFile.getInputStream();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(filePath)
                            .stream(inputStream, imgFile.getSize(), -1)
                            .contentType(imgFile.getContentType())
                            .build()
            );

            log.info("{}{}/{} <- was uploaded !", minioUrl, bucketName, filePath);
            return minioUrl + bucketName + "/" + filePath;
        } catch (Exception e) {

            throw new RuntimeException("Upload to Minio Process Error Occurred: " + e.getMessage());
        }
    }
}
