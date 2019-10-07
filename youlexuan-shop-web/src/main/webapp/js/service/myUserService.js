app.service("myUserService",function ($http) {

    this.findPage = function (page, rows, entity) {
        return $http.post("../myuser/search.do?page="+page+"&rows="+rows,entity);
    }
    this.add = function (entity) {
        return $http.post("../myuser/add.do",entity);
    }

    this.findOne = function (id) {
        return $http.get("../myuser/findOne.do?id="+id);
    }

    this.update = function (entity) {
        return $http.post("../myuser/update.do",entity);
    }

    this.del = function (ids) {
        return $http.get("../myuser/delete.do?ids="+ids);
    }

});