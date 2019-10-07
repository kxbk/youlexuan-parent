package com.youlexuan.messagelistener;

import com.offcn.pojo.TbItem;
import com.offcn.util.SerializeUtils;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.Criteria;
import org.springframework.data.solr.core.query.Query;
import org.springframework.data.solr.core.query.SimpleQuery;

import java.util.List;

public class SearchServiceDeleteListener implements MessageListener {

    @Autowired
    private SolrTemplate solrTemplate;

    //接收消息
    @Override
    public void onMessage(Message message) {
        //获取消息message
        byte[] body = message.getBody();
        System.out.println("youlexuan-deletesearch-service" + body);
        List<TbItem> itemList =  (List<TbItem>)SerializeUtils.unserialize(body);
        //获取商品id
        Query query=new SimpleQuery();
        for(TbItem item : itemList){
            //按照solr表中的字段来删除，条件删除
            Criteria criteria=new Criteria("item_goodsid").is(item.getGoodsId());
            query.addCriteria(criteria);
            solrTemplate.delete(query);
        }
        solrTemplate.commit();
    }
}
