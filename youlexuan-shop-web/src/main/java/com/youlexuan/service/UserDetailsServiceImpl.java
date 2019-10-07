package com.youlexuan.service;

import com.offcn.pojo.TbSeller;
import com.offcn.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/*
*
* UserDetailsService : springsecurity提供的一个接口，用来做自定义认证，从数据库中读取用户信息，和登录表单中的数据做比对
* */
/*
* 自定义的认证类
* */
public class UserDetailsServiceImpl implements UserDetailsService {

    /*通过注解的方式，远程调用服务*/
//    @Reference
//    private SellerService sellerService;


    /*通过xml文件的方式调用远程服务*/
    private SellerService sellerService;
    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    /*参数：用户输入的username*/
    @Override  // username == sellerId
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //根据username去数据库中查询用户 密码，角色，权限等信息

        //构造一个角色列表（当前项目的角色只有一个，我们直接在代码中声明出来就可以，如果角色信息比较多，最好还是去数据库查询）
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        list.add(new SimpleGrantedAuthority("ROLE_SELLER"));

        TbSeller  seller = sellerService.findOne(username);//根据用户名（sellerid）查询用户信息
        //如果seller ==null ，没查到数据 ，用户名错误

        if(seller != null){
            //该商家已经审核通过了，允许登录
            if(seller.getStatus().equals("1")){
                //username:用户填写的用户名，password：从数据中读取到的正确的密码，list：当前用户拥有的角色列表
                return new User(username,seller.getPassword(),list); //  登录页输入的账号和密码   ===   return返回的对象
            }else{
                //状态不合法，不允许登录
                return null;
            }
        }else{
            return null;//数据库没有对应的用户信息，直接登录失败
        }

        //测试程序的效果：在登录表单中输入任意的username，只要password=123456，即可认证成功，并且拥有一个统一的角色（role-seller）\
        //在登录页上输入的用户名和密码===User对象做校验比对
        //return new User(username,"123456",list);
    }

}
