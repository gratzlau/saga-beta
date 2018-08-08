function initPage()
{
	var sysDate=getDataFromServer("../../getSysCodeByCodeType.action",{type:"A06"},"获取系统时间",false);
	var expDate=dateStrAddNDays(sysDate,1);
	erajs.getCmp("expDate").setValue(dateStrAddNDays(sysDate,1));
	var queryForm = erajs.Extra.getQueryFormParams("workBenchListForm");
	erajs.Extra.crudSearch("workBenchGrid",queryForm);
}