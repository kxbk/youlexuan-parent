//创建处理器
app.controller('userController',function ($scope,$controller,userService) {

    $controller('baseController',{$scope:$scope});//继承
    $scope.searchEntity={};//定义搜索对象
    //条件查询
    $scope.search=function(page,rows){
        userService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.paginationConf.totalItems=response.total;//总记录数
                $scope.list=response.rows;//给列表变量赋值
            }
        );
    }
    //插入
    $scope.save=function () {
        if($scope.entity.id!=null){
            userService.update($scope.entity).success(function (resp) {
                if(resp.success){
                    $scope.reloadList();
                    alert(resp.message);
                }else {
                    alert(resp.message);
                }
            });
        }else {
            userService.insert($scope.entity).success(function (resp) {
                if(resp.success){
                    $scope.reloadList();
                    alert(resp.message);
                }else {
                    alert(resp.message);
                }
            });
        }
    }

    //根据id查找
    $scope.findOne=function (id) {
        userService.findOne(id).success(function (resp) {
            $scope.entity=resp;
        });
    }

    //根据id删除
    $scope.del=function () {
        userService.del($scope.selectIds).success(function (resp) {
            if(resp.success){
                $scope.reloadList();
                alert(resp.message);
            }else {
                alert(resp.message);
            }
        });
    }

})