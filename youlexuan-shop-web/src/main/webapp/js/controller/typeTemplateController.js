 //类型模板控制层 
app.controller('typeTemplateController' ,function($scope,$controller   ,typeTemplateService,brandService,specificationService){
	
	$controller('baseController',{$scope:$scope});//继承



	$scope.addTableRow = function(){
		$scope.entity.customAttributeItems.push({});
	}

	$scope.delTableRow = function(index){
		$scope.entity.customAttributeItems.splice(index,1);
	}

	/*关联品牌 下拉框显示的数据（这里先写一些测试数据，效果做出来之后再来查询数据库）*/
    // $scope.brandList={data:[{id:1,text:'联想'},{id:2,text:'华为'},{id:3,text:'小米'}]};
    $scope.brandList={data:[]};

	//读取品牌列表
	$scope.findBrandList = function(){
		brandService.selectOptionList().success(function (resp) { //resp :品牌的json数组
            $scope.brandList={data:resp};
        })
	}

	//读取规格列表
    $scope.specList={data:[]};

    //读取品牌列表
    $scope.findSpecList = function(){
        specificationService.selectOptionList().success(function (resp) { //resp :品牌的json数组
            $scope.specList={data:resp};
        })
    }

    $scope.initSelect2Data = function(){
        $scope.findBrandList();
        $scope.findSpecList();
	}

	//将指定的json格式的字符串，取出其中某个字段的值，形成一个 字符串
	$scope.jsonToString = function(jsonStr,key){
		var jsonArr = JSON.parse(jsonStr);//json数组
		var arr = [];
		for(var i = 0 ; i < jsonArr.length ;i++){
			//arr.push(jsonArr[i].key)//不能这样写，jsonArr[i]中有一个名称叫“key”的字段
			arr.push(jsonArr[i][key]);
		}
		return arr.toString();
	}

    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		typeTemplateService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		typeTemplateService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		typeTemplateService.findOne(id).success(
			function(response){
				$scope.entity= response;//response中的brandIds，specIds，customeAttributeItems 现在只是一个字符串，格式是json
				$scope.entity.brandIds = JSON.parse($scope.entity.brandIds);
				$scope.entity.specIds = JSON.parse($scope.entity.specIds);
				$scope.entity.customAttributeItems = JSON.parse($scope.entity.customAttributeItems);
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=typeTemplateService.update( $scope.entity ); //修改  
		}else{
			serviceObject=typeTemplateService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
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
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		typeTemplateService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		typeTemplateService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	