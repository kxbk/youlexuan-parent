package com.offcn.shop.controller;

import com.offcn.entity.Result;
import com.offcn.util.FastDFSClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传Controller(将选中的图片文件上传到fastdfs服务器，返回图片的地址)
 * 前端传回文件对象后对文件进行上传，上传到文件服务器中
 * @author Administrator
 */
@RestController
@RequestMapping("/picture")
public class UploadController {
    @Value("${FILE_SERVER_URL}")
    private String FILE_SERVER_URL;//文件服务器地址
    @RequestMapping("/upload")
    public Result upload(MultipartFile file){
        //1、取文件的扩展名
        String originalFilename = file.getOriginalFilename();
        //截取文件的后缀名字
        String extName=originalFilename.substring(originalFilename.lastIndexOf(".")+1);
        //2、创建一个 FastDFS 的客户端
        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            //3、执行上传处理
            String path = fastDFSClient.uploadFile(file.getBytes(), extName);
            //4、拼接返回的 url 和 ip 地址，拼装成完整的 url
            //文件服务器的地址
            String url = FILE_SERVER_URL + path;
            //成功就返回地址
            return new Result(true,url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(true,"上传失败");
        }
    }
}
