app.service('uploadService1',function ($http) {
    this.uploadFile=function () {
        var formData=new FormData();
        formData.append("file",file.files[0]);//选取上传的文件id选择
        return $http({
            url:"../picture/upload.do",
            method:"post",
            data:formData,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        });
    }
});