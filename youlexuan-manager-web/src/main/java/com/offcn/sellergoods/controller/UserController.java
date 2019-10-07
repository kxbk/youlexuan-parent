package com.offcn.sellergoods.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbUser;
import com.offcn.sellergoods.service.UserService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/user")
public class UserController {
    @Reference
    private UserService userService;
    //展示和搜索
    @RequestMapping("/search")
    public PageResult search(@RequestBody TbUser tbUser,int page, int rows){
        return userService.search(tbUser,page,rows);
    }
    /**
     * 插入
     */
    @RequestMapping("/insert")
    public Result insert(@RequestBody TbUser tbUser){
        Date date=new Date();
        tbUser.setCreated(date);
        tbUser.setUpdated(date);
        try {
            userService.insert(tbUser);
            return new Result(true,"添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"添加失败");
        }
    }

    /**
     * 更新
     */
    @RequestMapping("/update")
    public Result update(@RequestBody TbUser tbUser){
        Date date=new Date();
        tbUser.setUpdated(date);
        try {
            userService.update(tbUser);
            return new Result(true,"修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"修改失败");
        }
    }
    /**
     * 根据id查找一个对象
     */
    @RequestMapping("/findOne")
    public TbUser findOne(Long id){
        return userService.findOne(id);
    }

    /**
     * 根据id删除
     */
    @RequestMapping("/del")
    public Result del(Long[] ids){
        try {
            userService.del(ids);
            return new Result(true,"删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return  new Result(false,"删除失败");
        }
    }
}
