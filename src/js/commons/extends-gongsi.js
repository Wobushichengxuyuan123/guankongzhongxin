// window.BASICS_SYSTEM="/nelda-admin";
window.SYSTEM_CONFIG_APPLICATIONAPI = "/nelda-admin";//认证授权+系统服务为
window.SYSTEM_CONFIG_APPLICATIONAUTH="/nelda-auth";
window.SYSTEM_NELDA_OUTAPI="/nelda-outapi";
window.SYSTEM_CONFIG_APPLICATIONAPI="/nelda-admin";
window.BACKGROUND_PATH="http://192.168.1.152:9311";//后台管理系统
window.SYSTEM_RYDW_PATH="http://192.168.1.218:9700";//人员定位
window.SYSTEM_SPJK_PATH="http://192.168.1.152";//视频监控


window.SYSTEM_NELDA_ALARM='/nelda-alarm';
window.BASICS_SYSTEM = "/nelda-smcc";

//格式化时间
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
window.TimeDifference=function(time){
	let reval="";
	let h=parseInt(time/(1000*60*60));
	let m=parseInt(time/(1000*60))-h*60;
	let s=parseInt(time/1000)-h*60*60-m*60;
	if(m<10){
		m="0"+m;
	}
	if(s<10){
		s="0"+s;
	}
	reval+=h+":"+m+":"+s;
	return reval;
}
window.openTab=(url)=>{
	var tmp=window.open("about:blank","","");
	tmp.focus(); 
	tmp.location.href=url; 
	
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
if(getQueryString("token")){
	let token=getQueryString("token")	
	sessionStorage.setItem('token',token);
}
//扩展fetch
let oldFetch=fetch;
fetch=function(url,param={}){
	if(url.indexOf("?")!=-1){
		url+="&t="+new Date().getTime();
	}else{
		url+="?t="+new Date().getTime();
	}
	//处理fetch 参数
	if(param){
		if(!param.headers){
			param.headers={}
		}
		param.headers.Authorization=sessionStorage.getItem('token');
		if(param.method){
			if(param.method.toUpperCase()=="POST"){//post提交时自动添加contentType
				param.headers["Content-Type"]="application/json";
			}else{
				url = encodeURI(url);
			}
		}else{//默认请求方式为get   get请求时  中文乱码 解决
			url = encodeURI(url);
		}
		param.headers['Cache-Control']='no-cache';
	}
	const response=oldFetch.apply(this,[url,param])
		if(param.mode!="no-cors"){
			response.then((r)=>{
				let rOld=r.clone();
				return rOld.json();
				})
			.then(b=>{
				if(b.code=="13"){
					//token校验不合法
					if(window.LOGINPATH){
						window.location.href=window.LOGINPATH+"?pathUrl="+window.location.protocol+"//"+window.location.host+window.location.pathname;
					}else{
						alert("登录地址未配置成功！");
					}
				}
			})
		}
	return response;
}
