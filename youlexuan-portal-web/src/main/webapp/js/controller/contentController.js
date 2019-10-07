//广告控制层（运营商后台）
app.controller("contentController",function($scope,contentService){
    $scope.contentList=[];//广告集合 ，categoryId作为数组索引，广告集合作为值
    $scope.findByCategoryId=function(categoryId){
        contentService.findByCategoryId(categoryId).success(
            function(response){
                $scope.contentList[categoryId]=response;
            }
        );
    }

    //搜索跳转
    $scope.search=function(){
        location.href="http://localhost:9104/search.html#?keywords="+$scope.keywords;
    }

});