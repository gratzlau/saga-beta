var globalParam;
/**
 * @param param
 * @param formDatasObj={
 * 			authorFormActionUrl:"......",//指定复核验证通过后执行action的路径(必输)
			refreTableGridId:"......"//指定action执行成功后刷新表格的ID(选输)
 * 			}
 */
function openAuthorPage(param,formDatasObj)
{
	globalParam=param;
	$.cookie('authorFormActionUrl',formDatasObj.authorFormActionUrl);
	$.cookie('refreTableGridId',formDatasObj.refreTableGridId);
	erajs.Extra.openNewWindow( {
		title : '复核',
		winId : 'authorPageWin',
		formDatas:formDatasObj,
		width : 360,
		height : 180,
		href : '../../common/html/author.html'
	});
}

function beforeAuthor(param)
{
	var user={"loginId":param["user.loginId"],"password":param["user.password"]};
	var result=validateUser(user);
	if(result)
	{
		globalParam["authorUser.loginId"]=param["user.loginId"];
		erajs.merge(param,globalParam);
		var obj = $('#authorSubmitBut');
		erajs.Extra.closeSelfWindow(obj);
		
		obj = $('#submitBut');
		erajs.Extra.closeSelfWindow(obj);
		return true;
	}
	else
	{
		return false;
	}		
}
/**
 * 验证用户、用户密码
 * @param user
 * @return  0:用户不存在   1:没有复核权限    2:有复核权限
 */
function validateUser(user) {
	var loginId=user.loginId;////$("#loginId").val();
	var password=user.password;//$("#password").val();
	if(loginId!=null&&loginId.lenght!=0&&password!=null&&password.length!=0) {
		var param={"authorUser.loginId":loginId,"authorUser.password":password};
		var result=getDataFromServer("../../validateUser.action",param,"验证用户密码",false);
		if (result == "0") {
			erajs.Messager.alert("提示", "用户不存在!", "warning");
			return false;
		} else if (result == "1") {
			erajs.Messager.alert("提示", "该用户没有复核权限!", "warning");
			return false;
		} else if (result == "2") {
			return true;
		} else if (result == "3") {
			erajs.Messager.alert("提示", "密码不正確!", "warning");
			return false;
		} else if (result == "4") {
			erajs.Messager.alert("提示", "审批者与发起者不能相同!", "warning");
			return false;
		} else if (result == "5") {
			erajs.Messager.alert("提示", "审批者与发起者不在同一机构!", "warning");
			return false;
		} else if (result == "6") {
			erajs.Messager.alert("提示", "复核失败!", "warning");
			return false;
		} else {
			erajs.Messager.alert("提示", result, "warning");
			return false;
		}
	} else {
		if (loginId == null || loginId.length == 0) {
			erajs.Messager.alert("提示", "请输入用户名!", "warning");
			return false;
		}
		if (password == null || password.length == 0) {
			erajs.Messager.alert("提示", "请输入密码!", "warning");
			return false;
		}
	}
}