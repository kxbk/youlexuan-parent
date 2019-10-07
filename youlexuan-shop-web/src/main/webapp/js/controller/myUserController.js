app.controller("myUserController",function (myUserService, $controller,$scope) {


    $controller("baseController",{$scope:$scope});

    $scope.searchEntity = {};

    $scope.search = function (page,rows) {
        // myUserService.findPage(page,rows,$scope.searchEntity).success(function (resp) {
        //     alert(123)
        //     $scope.paginationConf.totalItems =  resp.total;
        //     $scope.list = resp.rows;
        // });
        myUserService.findPage(page,rows,$scope.searchEntity).success(function (resp) {
            $scope.list = resp.rows;
            $scope.paginationConf.totalItems = resp.total;
        });
    };

    $scope.save = function () {

        if($scope.entity.id ==null){
            //添加
            myUserService.add($scope.entity).success(function (resp) {
                if(resp.success){
                    alert(resp.message);
                    $scope.reloadList();
                    $scope.entity = {};
                }else{
                    alert(resp.message)
                }
            });
        }else{
            myUserService.update($scope.entity).success(function (resp) {
                if(resp.success){
                    alert(resp.message);
                    $scope.reloadList();
                }else{
                    alert(resp.message)
                }
            })
        }


    };

    $scope.findOne = function (id) {
        myUserService.findOne(id).success(function (resp) {
            $scope.entity = resp;
        })
    }

    $scope.del = function () {
        myUserService.del($scope.selectIds).success(function (resp) {
            if(resp.success){
                alert(resp.message);
                $scope.reloadList();
            }else{
                alert(resp.message)
            }
        })
    }

})