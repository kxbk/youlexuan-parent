package com.offcn.search.page.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.offcn.mapper.TbGoodsDescMapper;
import com.offcn.mapper.TbGoodsMapper;
import com.offcn.mapper.TbItemCatMapper;
import com.offcn.mapper.TbItemMapper;
import com.offcn.page.service.ItemPageService;
import com.offcn.pojo.TbGoods;
import com.offcn.pojo.TbGoodsDesc;
import com.offcn.pojo.TbItem;
import com.offcn.pojo.TbItemExample;
import com.offcn.pojo.TbItemExample.Criteria;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;

import java.io.FileWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

;
;

@Service
public class ItemPageServiceImpl implements ItemPageService {

    @Autowired
    private FreeMarkerConfig freeMarkerConfig;

    @Autowired
    private TbGoodsMapper goodsMapper;

    @Autowired
    private TbGoodsDescMapper goodsDescMapper;

    @Autowired
    private TbItemCatMapper itemCatMapper;

    @Autowired
    private TbItemMapper itemMapper;

    @Override
    public boolean genItemHtml(Long goodsId){

        try {
            Configuration configuration = freeMarkerConfig.getConfiguration();
            Template template = configuration.getTemplate("item.ftl");
            Map dataModel=new HashMap<>();

            //1.加载商品表数据
            TbGoods goods = goodsMapper.selectByPrimaryKey(goodsId);
            dataModel.put("goods", goods);

            //2.加载商品扩展表数据
            TbGoodsDesc goodsDesc = goodsDescMapper.selectByPrimaryKey(goodsId);
            dataModel.put("goodsDesc", goodsDesc);

            //3.商品分类
            String itemCat1 = itemCatMapper.selectByPrimaryKey(goods.getCategory1Id()).getName();
            String itemCat2 = itemCatMapper.selectByPrimaryKey(goods.getCategory2Id()).getName();
            String itemCat3 = itemCatMapper.selectByPrimaryKey(goods.getCategory3Id()).getName();
            dataModel.put("itemCat1", itemCat1);
            dataModel.put("itemCat2", itemCat2);
            dataModel.put("itemCat3", itemCat3);

            //4.SKU列表
            TbItemExample example=new TbItemExample();
            Criteria criteria = example.createCriteria();
            criteria.andStatusEqualTo("1");//状态为有效
            criteria.andGoodsIdEqualTo(goodsId);//指定SPU ID
            example.setOrderByClause("is_default desc");//按照状态降序，保证第一个为默认
            List<TbItem> itemList = itemMapper.selectByExample(example);
            dataModel.put("itemList", itemList);

            //生成路径
            Writer out=new FileWriter("F:\\4\\day01\\day01\\fourproject\\fourproject\\youlexuan-page-web\\src\\main\\webapp\\"+goodsId+".html");
           // F:\4\day01\day01\fourproject\fourproject\youlexuan-page-web\src\main\webapp1111.html
            template.process(dataModel, out);
            out.close();
            return true;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
    }
}
