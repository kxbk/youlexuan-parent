//创建服务层
app.service('userService',function ($http) {
    //搜索（分页查询）
    this.search=function(page,rows,searchEntity){
        return $http.post('../user/search.do?page='+page+"&rows="+rows,searchEntity);
    }
   
    //插入
    this.insert=function (entity) {
        return $http.post('../user/insert.do',entity);
    }

    //修改
    this.update=function (entity) {
        return $http.post('../user/update.do',entity);
    }

    //根据id查找
    this.findOne=function (id) {
        return $http.get('../user/findOne.do?id='+id);
    }
    //根据id删除
    this.del=function (ids) {
        return $http.post('../user/del.do?ids='+ids);
    }
})