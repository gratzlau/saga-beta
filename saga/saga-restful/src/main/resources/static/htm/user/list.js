

$(document).ready(function() {
//	$("#addBut").click(function() {
	$("#addBut").on("click",function(){
//		alert("in");
		$.ajax({
			url : "/user",
			type : "post",
			data : {
				"id" : 110,
				"userName" : "张三",
				"passWord" : "test",
				"age" : 11
				/*user:{
					"id" : 110,
					"userName" : "RESTful",
					"passWord" : "test",
					"age" : 11
				}*/
			},
			success : function(data) {
				$(showDiv).append("<p> 数据增加成功：" + data + "</p>");
			},
			dataType : "json",
			error : function(data) {
				$(showDiv).append("<p>出错了</p>");
			}
		})
	});
});






$("#editBut").on("click",function(){
    $.ajax({
        url: "restful",
        type : "post",
        data : {
            _method : "put",
            user :{
            	empno : 110,
                ename : "RESTful",
                sal : 1.1,
                hiredate : "1111-11-11"
            }
            
        },
        success : function(data){
            $(showDiv).append("<p> 数据更新成功："+data.flag+"</p>");
        },
        dataType : "json",
        error : function(data){
            $(showDiv).append("<p>出错了</p>");
        }
    })
});

$("#deleteBut").on("click",function(){
    $.ajax({
        url: "restful",
        method : "post" ,
        data : {
            _method : "delete",
            id : 1
        },
        dataType : "json",
        success : function(data){
            $(showDiv).append("<p> 数据删除成功："+data.flag+"</p>");
        },
        error : function(data){
            $(showDiv).append("<p>出错了</p>");
        }
    })
});

$("#getBut").on("click",function(){
    $.ajax({
        url: "restful/1",
        method : "get" ,
        data : {
        },
        dataType : "json",
        success : function(data){
            $(showDiv).append("<p> 编号："+data.allMembers.empno+"，名称："+data.allMembers.ename+",工资"+
                    data.allMembers.sal+",日期:"+data.emp.hiredate+"</p>");
            console.log(1);
        },
        error : function(data){
            $(showDiv).append("<p>出错了</p>");
        }
    })
});


