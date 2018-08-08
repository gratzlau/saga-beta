 /*
  *
  * 跳转登录页面
  * **/
 function redirectLogin(result){
     var obj=$.parseJSON(result);
     if(obj){
         if(obj.message&&obj.message=='ecas.core.user.notLogin'){
             if(obj.ecasUrl) {
                 top.location.href=obj.ecasUrl;
             } else {
                 alert('not LoginUrl');
             }
         }
     }
 }
    /**
     *解决打开新增，修改窗口不能跳到登录页面bug和弹出无权限功能
     *
     */
    //备注：公司老版本的ui框架是不需要加入此‘extend’方法
    $.extend(erajs.ui.Window.defaults,{
    	extractor:function(data){
    		 var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
             var matches = pattern.exec(data);
             var result = null;
             if (matches) {
                 result = matches[1];
             } else {
                 result = data;
             }
             if(result.indexOf('ecas.core.user.notLogin')>=0){
            	 redirectLogin(result);
             }
             else if(result.indexOf('error.forbidden')>=0){
            	 result='<div style="position:fixed;left:47%;top:50%;">error.forbidden</div>';
             }
             else if(result.indexOf('error.user.noRight')>=0){
            	 result='<div style="position:fixed;left:47%;top:50%;font-size:18px;font-color:black;font-family:\'微软雅黑\'">你没有权限操作</div>';
             }
             return result;
    	}
    });