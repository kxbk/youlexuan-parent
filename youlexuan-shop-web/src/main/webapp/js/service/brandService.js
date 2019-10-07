app.service('brandService',function ($http) {


    this.selectOptionList = function () {
        return $http.get("../brand/selectOptionList.do");
    }

    this.findAll = function () {
        return $http.get("../brand/findAll.do");
    }

    this.findPage = function (page, rows) {
        return $http.get("../brand/findPage.do?page="+page+"&rows="+rows);
    }

    //添加
    this.add = function (entity) {
        return $http.post("../brand/add.do",entity);
    }

    //修改
    this.update=function(entity){
        return $http.post('../brand/update.do',entity);
    }
    //删除
    this.dele=function(ids){
        return $http.get('../brand/delete.do?ids='+ids);
    }
    //根据id获取品牌信息
    this.findOne=function(id){
        return $http.get('../brand/findOne.do?id='+id);
    }
    //搜索（分页查询）
    this.search=function(page,rows,searchEntity){
        return $http.post('../brand/search.do?page='+page+"&rows="+rows,searchEntity);
    }
});