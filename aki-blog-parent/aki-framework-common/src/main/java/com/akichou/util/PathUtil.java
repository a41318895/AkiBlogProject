package com.akichou.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Path Utility
 *
 * <p>
 * Modify filename, editing directory for file uploading
 * </p>
 *
 * @author Aki Chou
 * @date 2024/08/20 Tue.
 */
public class PathUtil {

    public static String generateFilePath(String originalFilename){

        // Generate path via date    20xx/xx/xx/
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd/");
        String datePath = simpleDateFormat.format(new Date());
        // uuid -> be filename
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");

        int index = originalFilename.lastIndexOf(".");
        // test.jpg -> .jpg
        String fileType = originalFilename.substring(index);

        //return new StringBuilder().append(datePath).append(uuid).append(fileType).toString();
        return datePath + uuid + fileType;
    }
}