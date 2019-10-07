app.controller('baseController',function ($scope) {
    //重新加载
    $scope.reloadList = function(){
        // $scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);没有查询条件
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }

    /*分页控件的模型数据*/
    $scope.paginationConf = {
        currentPage: 1,  //当前是第几页
        totalItems: 10,  //总条数（默认值10），每次调用findPage()方法，都会 更新这个参数  $scope.paginationConf.totalItems = resp.total;
        itemsPerPage: 10, //每页显示10条（默认值），当下拉框改变的时候，这个值也会改变
        perPageOptions: [10, 20, 30, 40, 50], /*每页显示的条数，下拉框组件的 参数 数组*/
        onChange: function(){  //更新事件，页码改变或者每页显示多少条的下拉框改变，都会触发这个onChange，调用了reloadList()方法，重新加载数据
            $scope.reloadList();//重新加载，分页组件变化后会触发该函数,  页面第一次加载的时候也要去调用
        }
    };


    //用来保存用户勾选上的复选框的id
    $scope.selectIds = [];

    //定义一个方法，判断是 选中复选框，还是取消选中复选框
    //参数1： 事件对象  参数2：当前行的id
    $scope.updateSelection = function($event,id){
        //判断是选中还是取消选中
        if($event.target.checked){//  $event.target.checked==true 选中 ，反之，取消选中
            $scope.selectIds.push(id);
        }else{
            //从selectIds数组中将id移除
            //先来判断id在数组中的位置
            var idx = $scope.selectIds.indexOf(id);
            //移除指定位置的元素
            $scope.selectIds.splice(idx,1);//从idx这个位置开始，移除1个元素

        }
    }

    //从集合中按照key查询对象
    $scope.searchObjectByKey=function(list,key,keyValue){
        for(var i=0;i<list.length;i++){
            if(list[i][key]==keyValue){
                return list[i];
            }
        }
        return null;
    }

})