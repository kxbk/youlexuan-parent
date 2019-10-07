app.controller('brandController',function ($scope,brandService,$controller) {  //内置服务

    //通过$controller组件，可以帮我们完成控制器的继承
    $controller('baseController',{$scope:$scope})

    //定义一个查询实体，封装 name 和firstChar 这两个属性
    $scope.searchEntity = {};
    //条件查询
    $scope.search = function(page,rows){
        // $http.post("../brand/search.do?page="+page+"&rows="+rows,$scope.searchEntity).success(function (resp) {
        brandService.search(page,rows,$scope.searchEntity).success(function (resp) {
            //查询成功后，重新加载数据，调用reload（）?
            $scope.list = resp.rows;//把查询到的数据赋值 给list变量，table中绑定list
            $scope.paginationConf.totalItems=resp.total;//总记录数
        });
    }



    //点击删除按钮时要调用
    $scope.dele = function(){
        // $http.get("../brand/delete.do?ids="+$scope.selectIds).success(function (resp) {
        brandService.dele($scope.selectIds).success(function (resp) {
            if(resp.success){
                //删除成功
                $scope.reloadList();
            }else{
                alert(resp.message)
            }
        });
    }


    //根据指定id查询
    $scope.findOne = function(id){
        // $http.get("../brand/findOne.do?id="+id).success(function (resp) {
        brandService.findOne(id).success(function (resp) {
            $scope.entity = resp;//把根据指定的id查询到的TbBrand赋值给entity变量上，这个时候entity是有id的
        })
    };

    //保存（添加和修改，调用的同一个save方法，所以需要根据entity是是否有id，判断是新增还是修改，有id—》修改；没有id，新增操作）
    //添加时，品牌名称和首字母组成  var entity = {name:'aa',firstChar:'bb'}
    /* $scope.save = function(){

         var methodName = "add";

         if($scope.entity.id!=null){  //entity中如果id，代表是修改保存，没有id，代表的是新建的保存
             methodName = "update";
         }

         $http.post("../brand/"+methodName+".do",$scope.entity).success(function (resp) {
             if(resp.success){
                 alert(resp.message);
                 //重新加载数据
                 $scope.reloadList();
             }else{
                 alert(resp.message)
             }
         });
     }*/
    $scope.save = function(){

        if($scope.entity.id!=null){  //entity中如果id，代表是修改保存，没有id，代表的是新建的保存
            brandService.update($scope.entity).success(function (resp) {
                if(resp.success){
                    alert(resp.message);
                    //重新加载数据
                    $scope.reloadList();
                }else{
                    alert(resp.message)
                }
            })
        }else{
            brandService.add($scope.entity).success(function (resp) {
                if(resp.success){
                    alert(resp.message);
                    //重新加载数据
                    $scope.reloadList();
                }else{
                    alert(resp.message)
                }
            })
        }

        /*$http.post("../brand/"+methodName+".do",$scope.entity).success(function (resp) {
            if(resp.success){
                alert(resp.message);
                //重新加载数据
                $scope.reloadList();
            }else{
                alert(resp.message)
            }
        });*/
    }


    $scope.findAll = function () {
        // $http.get("../brand/findAll.do").success(function (resp) {
        brandService.findAll().success(function (resp) {
            $scope.list = resp;
        });
    }


    //分页查询，page：要查询第几页，rows：每页显示多少条
    $scope.findPage = function (page, rows) {
        // $http.get("../brand/findPage.do?page="+page+"&rows="+rows).success(function (resp) {
        brandService.findPage(page,rows).success(function (resp) {
            $scope.list = resp.rows;
            //将resp中的total数据重新赋值给分页组件模型数据中总记录数
            $scope.paginationConf.totalItems = resp.total;
        });
    }





})