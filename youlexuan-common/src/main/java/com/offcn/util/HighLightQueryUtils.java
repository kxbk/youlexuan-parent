package com.offcn.util;

import com.offcn.pojo.TbItem;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.core.query.*;
import org.springframework.data.solr.core.query.result.HighlightEntry;
import org.springframework.data.solr.core.query.result.HighlightPage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HighLightQueryUtils {

    /**
     *
     * @param prefix
     * @param postfix
     * @return
     */
    public static List<TbItem> searchList(SolrTemplate solrTemplate , String prefix, String postfix, Map searchMap){

        Map map=new HashMap();

        HighlightQuery query=new SimpleHighlightQuery();//高亮查询需要用的高亮对象
        HighlightOptions highlightOptions=new HighlightOptions().addField("item_title");//设置高亮的域

        highlightOptions.setSimplePrefix(prefix);//高亮前缀
        highlightOptions.setSimplePostfix(postfix);//高亮后缀

        query.setHighlightOptions(highlightOptions);//设置高亮选项

        //条件1：按照关键字查询
        Criteria criteria=new Criteria("item_title").is(searchMap.get("keywords"));
        query.addCriteria(criteria);

        //条件2：按分类筛选
        if(!"".equals(searchMap.get("category"))){
            Criteria filterCriteria=new Criteria("item_category").is(searchMap.get("category"));
            FilterQuery filterQuery=new SimpleFilterQuery(filterCriteria);
            query.addFilterQuery(filterQuery);
        }

        //条件3：按品牌筛选
        if(!"".equals(searchMap.get("brand"))){
            Criteria filterCriteria=new Criteria("item_brand").is(searchMap.get("brand"));
            FilterQuery filterQuery=new SimpleFilterQuery(filterCriteria);
            query.addFilterQuery(filterQuery);
        }

        //条件4：规格过滤
        if(searchMap.get("spec")!=null){
            Map<String,String> specMap= (Map) searchMap.get("spec");
            for(String key:specMap.keySet() ){
                Criteria filterCriteria=new Criteria("item_spec_"+key).is( specMap.get(key) );
                FilterQuery filterQuery=new SimpleFilterQuery(filterCriteria);
                query.addFilterQuery(filterQuery);
            }
        }


        HighlightPage<TbItem> page = solrTemplate.queryForHighlightPage(query, TbItem.class);

        for(HighlightEntry<TbItem> h: page.getHighlighted()){//循环高亮入口集合
            TbItem item = h.getEntity();//获取原实体类
            if(h.getHighlights().size()>0 && h.getHighlights().get(0).getSnipplets().size()>0){
                item.setTitle(h.getHighlights().get(0).getSnipplets().get(0));//设置高亮的结果
            }
        }
        return page.getContent();
    }
}
