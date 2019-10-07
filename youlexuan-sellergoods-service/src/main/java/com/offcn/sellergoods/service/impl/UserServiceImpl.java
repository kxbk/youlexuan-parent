package com.offcn.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.offcn.entity.PageResult;
import com.offcn.mapper.TbUserMapper;
import com.offcn.pojo.TbUser;
import com.offcn.pojo.TbUserExample;
import com.offcn.sellergoods.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private TbUserMapper tbUserMapper;

    @Override
    public PageResult search(TbUser tbUser, int page, int rows) {
        PageHelper.startPage(page,rows);
        TbUserExample tbUserExample=new TbUserExample();
        TbUserExample.Criteria criteria=tbUserExample.createCriteria();
        if(tbUser!=null){
            if(tbUser.getUsername()!=null&&tbUser.getUsername().length()>0){
                criteria.andUsernameLike("%"+tbUser.getUsername()+"%");
            }
        }
        Page<TbUser>pages=(Page<TbUser>)tbUserMapper.selectByExample(tbUserExample);
        return new PageResult(pages.getTotal(), pages.getResult());
    }

    @Override
    public void insert(TbUser tbUser) {
        tbUserMapper.insert(tbUser);
    }

    @Override
    public void update(TbUser tbUser) {
        tbUserMapper.updateByPrimaryKeySelective(tbUser);
    }

    @Override
    public TbUser findOne(Long id) {
        return tbUserMapper.selectByPrimaryKey(id);
    }

    @Override
    public void del(Long[] ids) {
        for (Long id:ids) {
            tbUserMapper.deleteByPrimaryKey(id);
        }
    }
}
