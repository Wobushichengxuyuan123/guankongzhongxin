import GetCmtWsClientHelper from "@/js/utils/cmtWsClientHelper.js";
import {ztConfig,companyConfig} from "@/js/utils/cmt-config.js";
import cmtEvents from "@/js/utils/cmtEvents.js";
// 
window.location = "CmtClientService://";
window.mso = GetCmtWsClientHelper();
window.msoOpen = 'off';
window.cmtLoginMaxTimes = 300;
window.cmtTryLoginTimes = 0;
window.cmtTryRegisterTimes = 0;
window.cmtLoginStatus = 'fail';
// 
window.secLog = function({text='log',color='red'}) {
  console.log('%c' + text + '重新连接' + window.cmtTryRegisterTimes + '-' + window.cmtTryLoginTimes + '次',`font-size:26px;color:${color};`);
}
window.cmtAgainTryLogin = function cmtAgainTryLogin () {
  window.cmtLoginStatus = 'fail';
  window.clearLoginAndRegisterTimer()
  if (window.cmtTryLoginTimes > window.cmtLoginMaxTimes || window.cmtTryRegisterTimes > window.cmtLoginMaxTimes) {
    return
  }
  window.cmtTryLoginTimes++
  window.timerTryLogin = setTimeout(function() {
    window.mso = GetCmtWsClientHelper();
    window.cmtLoginRegister()
  },1000)
}
window.cmtRegisterSuccess = function cmtRegisterSuccess () {
  var videoPlayUrl =
  window.location.protocol + "//" + ztConfig.ip + ":" + ztConfig.nPort + "/" + ztConfig.videoPlayUrl + "?" + "user=" + ztConfig.loginSinglePawn + "&passwd=" + ztConfig.loginSinglePawn;
  window.mso.setServiceConfig("videoPlayUrl", videoPlayUrl);
}
window.cmtLoginRegister = function cmtLoginRegister () {
  let res = window.mso.registerSip(ztConfig.loginSinglePawn, ztConfig.loginSinglePawn, ztConfig.ip, ztConfig.registerSip);
  if (res == 0) {
    window.secLog({
      text: 'cmt-注册状态',
      color: 'green'
    })
    // success
    if (window.timerTryLogin) {
      clearTimeout(window.timerTryLogin)
    }
    if (window.timerTryRegister) {
      clearTimeout(window.timerTryRegister)
    }
    window.cmtRegisterSuccess()
  } else {
    // fail
    if (window.msoOpen == 'off') {
      window.location = "CmtClientService://";
    }
    window.secLog({
      text: 'cmt-注册状态',
      color: 'red'
    })
    window.cmtTryRegisterTimes++
    window.timerTryRegister = setTimeout(function(){
      window.cmtLoginRegister()
    },1000)
  }
}
window.clearLoginAndRegisterTimer = function clearLoginAndRegisterTimer() {
  if (window.timerTryLogin) {
    clearTimeout(window.timerTryLogin)
  }
  if (window.timerTryRegister) {
    clearTimeout(window.timerTryRegister)
  }
}
// 
cmtEvents.on('opensuccess',() => {
  window.secLog({
    text: 'cmt-opensuccess',
    color: 'green'
  })
  window.msoOpen = 'on'
  setTimeout(window.cmtLoginRegister,800)
})
cmtEvents.on('onEventRegistered',(parameter) => {
  let { code } = parameter;
  code = 200
  if (code == 200) {
    if (window.timerTryLogin) {
      clearTimeout(window.timerTryLogin)
    }
    if (window.timerTryRegister) {
      clearTimeout(window.timerTryRegister)
    }
    window.secLog({
      text: 'cmt-登陆状态',
      color: 'green'
    })
    // success
    window.cmtLoginStatus = 'success';
    window.mso.subscribeAllPttGroupInfo();
    window.localStorage.setItem('zhinengjianceloading','login-success');
  } else {
    window.localStorage.removeItem('zhinengjianceloading')
    window.secLog({
      text: 'cmt-登陆状态',
      color: 'red'
    })
    // fail
    window.cmtAgainTryLogin()
  }
})
cmtEvents.on('onerror',() => {
  window.localStorage.removeItem('zhinengjianceloading')
  window.secLog({
    text: 'cmt-onerror',
    color: 'red'
  })
  window.cmtAgainTryLogin()
})
cmtEvents.on('onclose',() => {
  window.msoOpen = 'off'
  window.localStorage.removeItem('zhinengjianceloading')
  if (window.timerTryLogin) {
    clearTimeout(window.timerTryLogin)
  }
  if (window.timerTryRegister) {
    clearTimeout(window.timerTryRegister)
  }
})
// 
// window.cmtLoginRegister()