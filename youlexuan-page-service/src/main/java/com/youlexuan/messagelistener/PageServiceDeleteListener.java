package com.youlexuan.messagelistener;

import com.offcn.util.SerializeUtils;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;

import java.io.File;

public class PageServiceDeleteListener implements MessageListener {

    @Override
    public void onMessage(Message message) {
        //获取消息message
        byte[] body = message.getBody();
        //接收消息体，并且解析
        Long[] ids = (Long[])SerializeUtils.unserialize(body);
        System.out.println("接收删除消息");
        //根据goodsid循环删除商品的静态页
        for(Long id :ids){
            File file=new File("F:/4/day01/day01/fourproject/fourproject/youlexuan-page-web/src/main/webapp/"+id+".html");
            file.delete();
        }
    }

    public static void main(String[] args) {
        File file=new File("F:/4/day01/day01/fourproject/fourproject/youlexuan-page-web/src/main/webapp/149187842867960.html");
        file.delete();
    }
}
