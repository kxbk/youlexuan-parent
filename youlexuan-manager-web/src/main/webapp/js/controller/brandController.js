//创建处理器
app.controller('brandController',function ($scope,$controller,brandService) {

    $controller('baseController',{$scope:$scope});//继承

    $scope.findAll = function () {
        brandService.findAll.success(function (resp) {
            $scope.list = resp;
        });
}

    //分页查询，page：要查询第几页，rows：每页显示多少条
    $scope.findPage = function (page, rows) {
        brandService.findPage(page,rows).success(function (resp) {
            $scope.list = resp.rows;
            //将resp中的total数据重新赋值给分页组件模型数据中总记录数
            $scope.paginationConf.totalItems = resp.total;
        });
    }

    //保存
    $scope.save=function () {

        if($scope.entity.id!=null){//如果有ID，执行修改；没有ID，执行添加
            brandService.update($scope.entity).success(
                function(response){
                    if(response.success){
                        //重新查询
                        $scope.reloadList();//重新加载
                    }else{
                        alert(response.message);
                    }
                }
            );
        }else {
            brandService.add($scope.entity).success(
                function(response){
                    if(response.success){
                        //重新查询
                        $scope.reloadList();//重新加载
                    }else{
                        alert(response.message);
                    }
                }
            );
        }
    }

    //修改时查看
    $scope.findOne=function (id) {
        brandService.findOne(id).success(
            function (resp) {
                $scope.entity=resp;
            }
        );
    }

    //批量删除
    $scope.dele=function(){
        //获取选中的复选框
        brandService.dele($scope.selectIds).success(
            function(response){
                if(response.success){
                    $scope.reloadList();//刷新列表
                }else{
                    alert(response.message);
                }
            }
        );
    }

    $scope.searchEntity={};//定义搜索对象
    //条件查询
    $scope.search=function(page,rows){
        brandService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.paginationConf.totalItems=response.total;//总记录数
                $scope.list=response.rows;//给列表变量赋值
            }
        );
    }



})