app.controller('indexController',function ($scope,loginService) {
    $scope.showLoginName = function () {
        loginService.loginName().success(function (resp) {
            $scope.loginName =  resp.loginName;
        })
    }
})