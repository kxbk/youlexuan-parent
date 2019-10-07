package com.youlexuan.messagelistener;

import com.offcn.page.service.ItemPageService;
import com.offcn.util.SerializeUtils;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.annotation.Autowired;

public class PageServiceListener implements MessageListener {

    @Autowired
    private ItemPageService itemPageService;

    @Override
    public void onMessage(Message message) {
        //获取消息message
        byte[] body = message.getBody();
        //接收消息体，并且解析
        Long[] ids = (Long[])SerializeUtils.unserialize(body);
        System.out.println("接收消息");
        //根据goodsid循环添加商品的静态页
        for(Long id :ids){
            itemPageService.genItemHtml(id);
        }
    }
}
