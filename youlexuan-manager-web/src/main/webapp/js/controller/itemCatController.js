 //商品类目控制层 
app.controller('itemCatController' ,function($scope,$controller,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			//修改entity的父id
			$scope.entity.parentId=$scope.parentId;
			serviceObject=itemCatService.add( $scope.entity );//增加
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.findByParentId($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
					//删除后刷新列表
                    $scope.findByParentId($scope.parentId);
				}						
			}		
		);				
	}
	
	//搜索
	$scope.search=function(page,rows){
        itemCatService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录数
            }
        );
	}

    //我们需要一个变量去记住上级ID
    // $scope.parentId=0;//上级ID

    //根据上级ID显示下级列表
    // $scope.findByParentId=function(parentId){
    //     $scope.parentId=parentId;//每查询一次就将上级ID赋值给这个变量。
    //     itemCatService.findByParentId(parentId).success(
    //         function(response){
    //             $scope.list=response;
    //         }
    //     );
    // }


    $scope.grade=1;//默认为1级
    //设置级别，点击“查询下级”的时候调用，重新设置当前所处级别
    $scope.setGrade=function(value){
        $scope.grade=value;
    }
    //读取列表，点击“查询下级”调用的函数，参数为当前行的实体entity
//在调用selectList之前，先调用setGrade更新级别（进而更新面包屑）
//查询p_entity实体下的分类列表
    $scope.selectList=function(p_entity){
        if($scope.grade==1){//如果为1级
            $scope.entity_1=null;
            $scope.entity_2=null;
        }
        if($scope.grade==2){//如果为2级
            $scope.entity_1=p_entity;
            $scope.entity_2=null;
        }
        if($scope.grade==3){//如果为3级
            $scope.entity_2=p_entity;
        }
        $scope.searchEntity.parentId=p_entity.id;
        $scope.paginationConf.currentPage=1;
        $scope.reloadList();
    }


    $scope.typeTemplateList={data:[]};//模板列表数组
    $scope.selectOptionList=function () {
        typeTemplateService.selectOptionList().success(function (response) {
            $scope.typeTemplateList={data:response};
        })
    }

    //分页控件配置
    $scope.paginationConf1 = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            itemCatService.findByParentId(0);
        }
    };

});	