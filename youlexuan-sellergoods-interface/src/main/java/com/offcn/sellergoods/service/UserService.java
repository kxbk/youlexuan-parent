package com.offcn.sellergoods.service;

import com.offcn.entity.PageResult;
import com.offcn.pojo.TbUser;

public interface UserService {

    public PageResult search(TbUser tbUser,int page,int rows);
    //增加
    public void insert(TbUser tbUser);
    //修改
    public void update(TbUser tbUser);
    //更具id查找
    public TbUser findOne(Long id);
    //根据id删除
    public void del(Long[] ids);
}
