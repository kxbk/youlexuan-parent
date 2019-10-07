package com.youlexuan.messagelistener;

import com.offcn.pojo.TbItem;
import com.offcn.search.service.ItemSearchService;
import com.offcn.util.SerializeUtils;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SearchServiceListener implements MessageListener {
    @Autowired
    private ItemSearchService itemSearchService;

    //接收消息
    @Override
    public void onMessage(Message message) {
        //获取消息message
        byte[] body = message.getBody();
        System.out.println("youlexuan-search-service   " + body);
        List<TbItem> itemList =  (List<TbItem>)SerializeUtils.unserialize(body);
        itemSearchService.importItemListToSolr(itemList);
    }
}
