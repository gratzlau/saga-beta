/**
 * 检查是否为日期格式YYYY-MM-DD, 不检查是合法
 * @param date
 * @return
 */
function checkDate(date){
	var a = /^(\d{4})-(\d{2})-(\d{2})$/
	if (!a.test(date)) { 
		return false; 
	} 
	else 
		return true; 
} 

/**
 * 时间字符串+1 如2015-11-15 +1 后为 2015-11-16
 */

function dateStrAddOneDay() {
	var sysDate = (window.parent.document.getElementById("timerSpan").innerHTML).split(" ")[0];
	if(checkDate(sysDate)){
		var year = sysDate.split("-")[0];
		var month = sysDate.split("-")[1];
		var day = sysDate.split("-")[2];
		var addDate = new Date(((new Date(year, month-1, day))/ 1000 + 86400) * 1000);
		return addDate;
	}else{
		
		window.location="turnToMainPage.action";
	}
}
/**
 * 指定日期的前(后)n天  n为整数
 * @param sysDate  指定日期
 * @param 指定日期的前(后)n天 n>0：指定日期n天后的日期   n<0:指定日期n天前的日期
 * @return
 */
function dateStrAddNDays(sysDate,n) {
	
	sysDate=formatDate(sysDate);
	if(checkDate(sysDate)){
		var year = sysDate.split("-")[0];
		var month = sysDate.split("-")[1];
		var day = sysDate.split("-")[2];
		var addDate = new Date(((new Date(year, month-1, day))/ 1000 + n*86400) * 1000);
		return addDate;
	}else{
		//window.location="turnToMainPage.action";
	}
}
/**
 * 返回系统日期的前一天 如2015-11-15 的 前一天为 2015-11-14
 */

function dateStrSubOneDay() {
	var sysDate = (window.parent.document.getElementById("timerSpan").innerHTML).split(" ")[0];
	if(checkDate(sysDate)){
		var year = sysDate.split("-")[0];
		var month = sysDate.split("-")[1];
		var day = sysDate.split("-")[2];
		var addDate = new Date(((new Date(year, month-1, day))/ 1000 - 86400) * 1000);
		return addDate;
	}else{
		window.location="turnToMainPage.action";
	}
}
/**
 * 返回系统时间
 * @return
 */
function returnSysDate(){
	var sysDate = (window.parent.document.getElementById("timerSpan").innerHTML).split(" ")[0];
	if(checkDate(sysDate)){
		return sysDate;
	}else{
		
		window.location="turnToMainPage.action";
	}
}
/**
 * 为指定日期控件赋值-系统时间-1
 * 
 * @param date
 * @return
 */
function setSysDateAddForEr(dateId) {
	var sysDate = (window.parent.document.getElementById("timerSpan").innerHTML).split(" ")[0];
	erajs.getCmp(dateId).setValue(dateStrAddOneDay(sysDate));
}
/**
 * 为指定日期控件赋值-系统时间
 * 
 * @param dateId
 * @return
 */
function setSysDateForEr(dateId) {
	var sysDate = (window.parent.document.getElementById("timerSpan").innerHTML).split(" ")[0];
	erajs.getCmp(dateId).setValue(sysDate);
}

/**
 * 使用查询引擎的并且没有参数的
 * @param queryParam
 * @return
 */
function setQueryParam(queryParam){
	queryParam["queryParam.start"] = 1;
	queryParam["queryParam.limit"] = 15;
	queryParam["queryParam.pageCtrl"] = true;
}
/**
 * 类型下拉框值
 */
function combxLoadFilter(returnData) {
	var datas = returnData.data.list;
	return datas;
}

/**
 * 使用框架查询的下拉框值
 */
function combxByQueryLoadFilter(returnData) {
	var datas = returnData.data.result.datals;
	return datas;
}
function combxByQueryLoadFilter1(returnData) {
	var datas = returnData.data;
	return datas;
}

/**
 * 类型下拉框值
 */
function combogridLoadFilter(returnData) {
	var datas = returnData.data.list;
	return {
		total : 0,
		rows : datas
	};
}
// 走service
function combogridLoadFilterPage(returnData) {
	var datas = returnData.data.list;
	return {
		total : datas.total,
		rows : datas.datals
	};
}
// 走baseQuery
function combogridLoadFilterPage1(returnData) {
	var datas = returnData.data.result;
	return {
		total : datas.total,
		rows : datas.datals
	};
}

/**
 * 查询按钮点击
 */
function buttonClick() {
	$('#queryId').click();
}

/**
 * 为查询框架赋查询条件
 * @param param
 * @return
 */
function setBankIdForUrl(param) {
	param.bankId = (window.parent.document.getElementById("bankspan").innerHTML).split("-")[0];
}
function setBankIdForUrlQuery(param) {
	param.bankid = (window.parent.document.getElementById("bankspan").innerHTML).split("-")[0];
}

/**
 * 定投查看明细，初始化Table
 * 
 * @return
 */
function showFixedTradeDetail() {
	var url = {
		"fixedTrade.fixId" : erajs.getCmp("fixedPlanGrid").getSelected().fixId
	};
	erajs.getCmp("fixedTradeDetailGrid").reload(url);
}
/**
 * 辖内机构公用输入框DBClick
 * 
 * @return
 */
function bankInputDbClick() {
	var width = window.screen.width;
	var height = window.screen.height;
	;
	width = width / 1.6;
	height = height / 1.7;
	erajs.Extra.openNewWindow( {
		title : '机构信息查询',
		winId : 'bankInfoWindow',
		width : width,
		height : height,
		href : '../../accManage/html/bankInfoWindow.html'
	})
}
function setBankIdForFatherPage(rowIndex, rowData) {
	
	var oldBankId=$("#bankId_Query").val();
	var newBankId=rowData.bankid;
	$("#bankId_Query").val(newBankId);
	var bankName=$("#bankName");
	if(bankName!=undefined&&bankName!=null)
	{
		bankName.val(rowData.dispname);
	}
	erajs.Extra.closeSelfWindow('bankInfoWindow');
	
	if(oldBankId!=newBankId){
		if(fatherPageBankIdOnchange!=undefined&&fatherPageBankIdOnchange!=null&&typeof fatherPageBankIdOnchange=="function"){
			fatherPageBankIdOnchange();
		}
	}
}
/**
 * 往Cookie中放值
 */
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/**
 * 从Cookie中获取值
 */
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function delCookie(name){	
	var exp = new Date();	
	exp.setTime(exp.getTime() - 1);	
	var cval = getCookie(name);	
	if(cval != null){
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
}
/**
 * JS精确加法
 * @param arg1
 * @param arg2
 * @return arg1加arg2的精确结果 
 */
function jsAdd(arg1,arg2){ 
    var r1,r2,m; 
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
    m=Math.pow(10,Math.max(r1,r2)) 
    return (arg1*m+arg2*m)/m 
}
/**
 * JS精确减法
 * @param arg1
 * @param arg2
 * @return arg1减arg2的精确结果 
 */
function jsSub(arg1,arg2){     
    return jsAdd(arg1,-arg2); 
}

/**
 * JS精确乘法
 * @param arg1
 * @param arg2
 * @return arg1乘以arg2的精确结果 
 */
function jsMul(arg1,arg2) { 
    var m=0,s1=arg1.toString(),s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){} 
    try{m+=s2.split(".")[1].length}catch(e){} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
}
/**
 * JS精确除法
 * @param arg1
 * @param arg2
 * @return arg1除以arg2的精确结果 
 */
function jsDivide(arg1,arg2){ 
    var t1=0,t2=0,r1,r2; 
    try{t1=arg1.toString().split(".")[1].length}catch(e){} 
    try{t2=arg2.toString().split(".")[1].length}catch(e){} 
    with(Math){ 
        r1=Number(arg1.toString().replace(".","")) 
        r2=Number(arg2.toString().replace(".","")) 
        return (r1/r2)*pow(10,t2-t1); 
    } 
}
/**
 * 四舍五入数字
 * @param value
 * @return
 */
function formatNum(value){	
	if(value == null || value == ""){
	 	value = 0;
	}
	value = "" + value;
	if(value.indexOf(",") > 0){
		value = value.replace(/\,/g,"");
	}
	var num = parseFloat(value);
	return num.toFixed(2);
}

/**
 * 四舍五入数字
 * @param value
 * @return
 */
function rectWeight(value){	
	if(value == null || value == ""){
	 	value = 0;
	}
	value = "" + value;
	if(value.indexOf(",") > 0){
		value = value.replace(/\,/g,"");
	}
	var num = parseFloat(value);
	return num.toFixed(4);
}


/**
 * 四舍五入折扣
 * 
 * @param value
 * @return
 */
function formatDiscount(value){	
	if(value == null || value == ""){
	 	value = 100;
	}
	value = "" + value;
	if(value.indexOf(",") > 0){
		value = value.replace(/\,/g,"");
	}
	var num = parseFloat(value);
	return num.toFixed(2);
}

/**
 * 时间类型部位，value格式hhmmss
 * @param value
 * @return
 */
function timeTo6(value){
	var time = ""+value;
	var length = 6 - time.length;
	for(var i = 0; i < length; i++){
		time = "0" + time;
	}
	return time;
}

/**
 * 从服务器取数
 * @param url            action-url
 * @param param          参数(json)
 * @param description    描述
 * @param showFlag       出错时是否显示提示信息
 * @param async          是否异步
 * @author fengyouning
 * @return data
 */
function getDataFromServer(url,param,description,showFlag,async)
{
	if(description==undefined||description==null)
	{
		description="";
	}
	if(showFlag==undefined||showFlag==null)
	{
		showFlag=false;
	}
	if(async==undefined||async==null)
	{
		async=false;
	}
	var re;
	$.ajax({
		type:'post', 
		async : async,
		url: url,
		dataType:'json', 
		data:param,
		success: function(result){
			if(result.success == true)
			{
				re=result.data.result;
			}
			else if(result.success == false)
			{
				if(showFlag)
				{
					erajs.Messager.alert('提示',"result.success="+result.success+","+description+"失败!",'info');
					showFlag=false;
				}
			}
		},
		error: function(){
			if(showFlag)
			{
				erajs.Messager.alert('提示', description+"失败!", 'info');
				showFlag=false;
			}
			
		}
	});
	if(re==null){
		
		if(showFlag)
		erajs.Messager.alert('提示', description+"失败!", 'info');
		return "";
	}
	return re;
}
function doAction(url,param,description,showFlag,async)
{
	getDataFromServer(url,param,description,showFlag,async);
}
function formatAmt(value,rowData,index)
{
	return erajs.util.Format.number(value,'0,000.00');
}
function formatWeight(value,rowData,index)
{
	return erajs.util.Format.number(value,'0,000.0000');
}
/**
 * 格式化日期
 * @param dateStr  传入格式yyyyMMdd
 * @return   传出格式yyyy-MM-dd
 */
function formatDate(dateStr)
{
	var reg=/^[0-9]{8}$/;
	if(reg.test(dateStr))
	{
		return erajs.dateRenderer(dateStr);
	}
	else
	{
		return dateStr;
	}
}
/**
 * 格式化时间  
 * @param timeStr   传入格式hhmmss
 * @return  传出格式hh-mm-ss
 */
function formatTime(timeStr)
{
	var reg=/^[0-9]{6}$/;
	if(reg.test(timeStr))
	{
		return timeStr.substring(0,2)+":"+timeStr.substring(2,4)+":"+timeStr.substring(4,6);
	}
	else
	{
		return timeStr;
	}
}