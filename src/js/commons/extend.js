/* eslint-disable */
window.BASICS_SYSTEM = "/nelda-smcc";
window.SYSTEM_CONFIG_APPLICATIONAPI = "/nelda-admin";//认证授权+系统服务为
window.SYSTEM_CONFIG_APPLICATIONAUTH = "/nelda-auth";
window.SYSTEM_NELDA_OUTAPI = "/nelda-outapi";
window.SYSTEM_CONFIG_APPLICATIONAPI = "/nelda-admin";
window.SYSTEM_CONFIG_BASICS = "/nelda-basics";
window.SYSTEM_CONFIG_PPMS = '/ppms-portal-web';
window.SYSTEM_NELDA_ALARM = '/nelda-alarm';


//易县
// window.LOGINPATH = "http://192.168.1.103:8099";//登录服务页面
// window.SYSTEM_WEBSOCKET = 'http://192.168.1.103:19301';//websocket(发版)用于alert弹窗用

// 沂蒙
// window.LOGINPATH = "http://172.16.9.11:8099";//登录服务页面(沂蒙)
// window.SYSTEM_WEBSOCKET = 'http://172.16.9.11:19301';//websocket(发版)用于alert弹窗用
// window.FILE_PATH = 'http://172.16.9.11:19301/upload'; // 文件地址
// window.PATROL_CARD_TYPE_CODE = 'S3110'; // 基础服务巡查卡类型code

// 西安
// window.LOGINPATH = "http://192.168.1.4";//登录服务页面
// window.SYSTEM_WEBSOCKET = 'http://192.168.1.4:8189';//websocket(发版)用于alert弹窗用

// // 本地测试
// window.LOGINPATH = "http://192.168.1.112:8099";//登录服务页面(本地)
// window.SYSTEM_WEBSOCKET = 'http://192.168.1.112:19301';//websocket(发版)用于alert弹窗用

// 测试服务器66
// window.LOGINPATH = "http://192.168.1.66:10099";//登录服务页面(本地)
// window.VideoUrl = "192.168.1.27:1935";  // 视频流地址
// window.SYSTEM_WEBSOCKET = 'http://192.168.1.101:19301';//websocket(发版)用于alert弹窗用

// 测试服务器101
// window.LOGINPATH = "http://192.168.1.101:10099";//登录服务页面(本地)
// window.VideoUrl = "192.168.1.27:1935";  // 视频流地址
// window.SYSTEM_WEBSOCKET = 'http://192.168.1.101:19301';//websocket(发版)用于alert弹窗用


//格式化时间
Date.prototype.Format = function (fmt) { //author: meizzq
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
window.TimeDifference = function (time) {
    let reval = "";
    let h = parseInt(time / (1000 * 60 * 60));
    let m = parseInt(time / (1000 * 60)) - h * 60;
    let s = parseInt(time / 1000) - h * 60 * 60 - m * 60;
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    reval += h + ":" + m + ":" + s;
    return reval;
}
window.openTab = (url) => {
    var tmp = window.open("about:blank", "", "");
    tmp.focus();
    tmp.location.href = url;

}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

if (getQueryString("token")) {
    let token = getQueryString("token")
    sessionStorage.setItem('token', token);
    //三维存储token,防止刷新重登录
    window.PushData && window.PushData("GisToken" + "@" + JSON.stringify({ token }))
}
//扩展fetch
let oldFetch = fetch;
fetch = function (url, param = {}) {
    if (url.indexOf("?") != -1) {
        url += "&t=" + new Date().getTime();
    } else {
        url += "?t=" + new Date().getTime();
    }

    //处理fetch 参数
    if (param) {
        if (!param.headers) {
            param.headers = {}
        }
        param.headers.Authorization = sessionStorage.getItem('token');
        if (param.method) {
            if (param.method.toUpperCase() == "POST") {//post提交时自动添加contentType
                param.headers["Content-Type"] = "application/json";
            } else {
                url = encodeURI(url);
            }
        } else {//默认请求方式为get   get请求时  中文乱码 解决
            url = encodeURI(url);
        }
        param.headers['Cache-Control'] = 'no-cache';
    }
    const response = oldFetch.apply(this, [url, param])
    if (param.mode != "no-cors") {
        response.then((r) => {
            let rOld = r.clone();
            return rOld.json();
        })
            .then(b => {
                if (b.code == "13") {
                    //token校验不合法
                    if (window.LOGINPATH) {
                        window.location.href = LOGINPATH + "?pathUrl=" + location.protocol + "//" + location.host + location.pathname;
                    } else {
                        alert("登录地址未配置成功！");
                    }
                }
            })
    }
    return response;
}

//判断项目
environment()
function environment() {
    if (window.location.href.includes('centerSecond')) window.LOGINPATH = LOGINPATH
}
/* eslint-enable */