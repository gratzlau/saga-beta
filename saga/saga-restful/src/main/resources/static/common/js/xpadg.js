var intervalId=0;//定时器id
var clickXpadg=false;

window.parent.document.getElementById("xpadg").onclick=function() {
	toLoadWorkbench();
	startInterval();
	clickXpadg=true;
}
window.parent.document.getElementById("appMenu").onclick=function() //父元素：id="appMenu"    子元素：id="xpadg" 
{
	if(clickXpadg)
	{
		clickXpadg=false;
	}
	else
	{
		clearTimeout(intervalId);
	}
}

function toLoadWorkbench(){
	var xpadgApplNode=window.parent.document.getElementById("xpadg");
	window.parent.menuClick(xpadgApplNode);
	var frame=window.parent.document.getElementById("homeIframe");
	var root = window.location + "";
	root = root.substring(0, root.indexOf('xpadg')-1);
	var url = root + "/xpadg/common/html/workbench.html";
	setTimeout(function(){frame.src=url;},100);
}
function initWorkbench(){
	
	var appl=getApplFromCookies();
	if(appl=="xpadg"){
		toLoadWorkbench();
	}
}

function getApplFromCookies() {
	
	var cookieList=window.parent.document.cookie;
	if(cookieList!=undefined&&cookieList!=null&&cookieList!=""){
		
		var cookie=cookieList.split(";");
		if(cookie!=undefined&&cookie!=null&&cookie.length>0) {
			
			for(var i=0;i<cookie.length;i++){
				
				if(cookie[i].indexOf("appl=")!=-1){
					
					var targetCookie=cookie[i];
					var keyValue=cookie[i].split("=");
					var value=keyValue[1];
					return value;
				}	
			}
		}else {
			
			return null;
		}
	}else{
		
		return null;
		
	}
}
/**
 * 对付准备金监控定时器
 **/
function exchangePreAmtInterval()
{
	//获取客户存金总余额
	var accountBal=getDataFromServer("../../getCustEgoldTotalWeight.action",{},"获取客户存金总余额",false);
	var custEgoldTotalWeight=null;
	if(accountBal!=undefined&&accountBal!=null){
		
		custEgoldTotalWeight=accountBal.currBalG;
		if(custEgoldTotalWeight==0)custEgoldTotalWeight="0.0";
	}
	if(custEgoldTotalWeight==undefined||custEgoldTotalWeight==null||custEgoldTotalWeight=="0.0"){
		
		messenger.sendMessages('showMessage',{ 
	        'type' : 'show',//消息类型：alert、show 
	        'title':'兑付准备金监控',//提示标题 
	        'message':'当前客户无存金余额!',//消息内容 
	        'showType' : 'slide',//消息显示方式 
	        'timeout' : 2000,//消息框消失时间 
	        'style' :{}//消息框样式 
	    }); 
		return ;
		
	}
	
	var cust=getDataFromServer("../../selectCustProfit.action",{},"获取客户收益",false);
	var custProfit=null;
	if(cust!=undefined&&cust!=null){
		
		custProfit=cust.bonusAmount;
		if(custProfit==0)custProfit="0.0";
	}
	
	//兑付准备金率
	var exchPreEgoldRate=getDataFromServer("../../getSysCodeByCodeType.action",{type:"A52"},"获取兑付准备金率",false);
	if(exchPreEgoldRate==undefined||exchPreEgoldRate==null)
	{
		messenger.sendMessages('showMessage',{ 
	        'type' : 'show',//消息类型：alert、show 
	        'title':'兑付准备金监控',//提示标题 
	        'message':'当前系统未设定兑付准备金率!',//消息内容 
	        'showType' : 'slide',//消息显示方式 
	        'timeout' : 2000,//消息框消失时间 
	        'style' :{}//消息框样式 
	    });
		return ;
	}
	
	//获取交易账户实时持仓
	var params={key:"Au(T+D)"};
	var tradeAccCurrentWeight=getDataFromServer("../../getCacheValue.action",params,"获取交易账户实时持仓",false);
	if(tradeAccCurrentWeight==undefined||tradeAccCurrentWeight==null||tradeAccCurrentWeight=='')
	{
			
		var errorMsg=getDataFromServer("../../getCacheValue.action",{key:"autderror"},"",false);
		if(errorMsg==undefined||errorMsg==null||errorMsg=="")
		{
			return;
		}
		if(errorMsg=="HJ0003")
		{
			return;
		}
		messenger.sendMessages('showMessage',{ 
	        'type' : 'show',//消息类型：alert、show 
	        'title':'兑付准备金监控',//提示标题 
	        'message':errorMsg,//消息内容 
	        'showType' : 'slide',//消息显示方式 
	        'timeout' : 2000,//消息框消失时间 
	        'style' :{}//消息框样式 
	    });
		return ;
	}
	
	//对付准备金=交易账户实时持仓-获取客户收益
	var exchangPreAmt=jsSub(tradeAccCurrentWeight,custProfit);
	if(exchangPreAmt<0)exchangPreAmt=0;
	//兑付准备金占比=对付准备金/获取客户存金总余额
	exchangPreAmtPercent=Math.round(exchangPreAmt/custEgoldTotalWeight*100)/100;//保留2位小数
	
	var exchPre=getDataFromServer("../../getSysCodeByCodeType.action",{type:"A61"},"获取系统参数",false);//百分比值
	if(exchPre==undefined||exchPre==null||exchPre=='')
	{
		exchPre=75;//若系统未设定该值,取75%
	}
	if(exchangPreAmtPercent<(exchPreEgoldRate/100)*exchPre/100)
	{
		messenger.sendMessages('showMessage',{ 
			'type' : 'show',//消息类型：alert、show 
			'title':'兑付准备金监控',//提示标题 
			'message':'"兑付准备金占比【'+Math.round(exchangPreAmtPercent*100*100)/100+'%】"小于"兑付准备金率【'+exchPreEgoldRate+'%】"的'+exchPre+'%!',//消息内容 
			'showType' : 'slide',//消息显示方式 
			'timeout' : 2000,//消息框消失时间 
			'style' :{}//消息框样式 
		});
	}
}
/**
 *  启动定时器
 * @return
 */
function startInterval(){
	
	var appl=getApplFromCookies();
	if(appl=="xpadg"){
		exchangePreAmtInterval();
		var intervalTime=getDataFromServer("../../getSysCodeByCodeType.action",{type:"A53"},"获取监控间隔时间",false);//监控间隔时间
		if(intervalTime==undefined||intervalTime==null||intervalTime=="")
		{
			intervalTime=30;
		}
		intervalId=setInterval('exchangePreAmtInterval()',jsMul(intervalTime,1000));
	}
}
