// import { ceictLog } from "@/libs/util.js";
import cmtEvents from './cmtEvents.js';
const ceictLog = () => {};
function testGroupId(str) {
  let regexp = /(group;create;)([0-9]+)(;success;)/ig
  let regexp2 = /(group;drop;)([0-9]+)(;success;)/ig
  let regexp3 = /(group;update;)([0-9]+)(;success;)/ig
  let start;
  let last;
  let newCreateGroupId;
  let deleteGroupId;
  let updateGroupId;
  if (regexp.test(str)) {
    let regexp2str = 'group;create;'
    let startIndex = regexp2str.length
    let regexp2 = /group;create;/ig
    let regexp3 = /;success;/ig
    start = regexp2.exec(str).index + startIndex
    last = regexp3.exec(str).index
    newCreateGroupId = str.substring(start,last)
    return {
      msg: 'create;group;success',
      newCreateGroupId
    }
  } else if(regexp2.test(str)) {
    let regexp2str = 'group;drop;'
    let startIndex = regexp2str.length
    let regexp2 = /group;drop;/ig
    let regexp3 = /;success;/ig
    start = regexp2.exec(str).index + startIndex
    last = regexp3.exec(str).index
    deleteGroupId = str.substring(start,last)
    return {
      msg: 'drop;group;success',
      deleteGroupId
    }
  } else if(regexp3.test(str)) {
    let regexp2str = 'group;update;'
    let startIndex = regexp2str.length
    let regexp2 = /group;update;/ig
    let regexp3 = /;success;/ig
    start = regexp2.exec(str).index + startIndex
    last = regexp3.exec(str).index
    updateGroupId = str.substring(start,last)
    return {
      msg: 'update;group;success',
      updateGroupId
    }
  }
}
//处理事件的辅助函数
function CmtWsClientHelper() {
  // this.statusStore = {
  //   onopen: false
  // }
  // **
  /* 
  ~ 存放呼叫和广播
  */
  var currentCmdInfo = {}

  var wsUri = "ws://127.0.0.1:8181/cmtclient";
  var websocket = null;
  this.callId = null;
  var callId = null;
  var eventHandler = []; //是个数组
  var _that = this;
  this.isCreateGroupFlag = false;
  //通过设置修改默认的websocket uri
  this.setWsUri = function(uri) {
    wsUri = uri;
  };
  //共有方法
  this.addCmtEventHandler = function(handler) {
    //添加事件监听
    eventHandler.push(handler);
  };
  //关闭socket
  this.close = function() {
    if (websocket != null) {
      websocket.close();
    }
  };

  this.removeCmtEventHandler = function(handler) {
    for (var i = 0; i < eventHandler.length; i++) {
      //找出本次需要处理的事件下标
      if (eventHandler[i] == handler) {
        //从事件处理数组里面删除
        eventHandler.splice(i, 1);
        break;
      }
    }
  };
  this.isOpened = false;

  this.fireEvent = function(strEvent) {
    // console.log("got event:" + strEvent);
    // console.log(strEvent, 'strEvent');
    // console.log(strEvent.event, "got event:" + strEvent);
    //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
    // for (var i = 0; i < eventHandler.leonEventConnectedngth; i++) {
    for (var i = 0; i < eventHandler.length; i++) {
      //执行触发
      var objEvtdata = null;
      try {
        objEvtdata = JSON.parse(strEvent);
      } catch (error) {
        ceictLog(error);
      }
      if (objEvtdata.cmdName != undefined) {
        //收到命令回复
        if (eventHandler[i].onCmdResult != "undefined") {
          eventHandler[i].onCmdResult(objEvtdata);
        }
      } else if (objEvtdata.event != undefined) {
        //收到事件响应
        if (eventHandler[i].onEventFired != "undefined") {
          eventHandler[i].onEventFired(objEvtdata);
        }
      }
    }
    let eventText = JSON.parse(strEvent);
    
    console.log("fireEvent监听到的事件=>", eventText);
    switch (eventText.event || eventText.cmdName) {
      case "createVideoMeet":
        cmtEvents.emit('createVideoMeet',eventText)
        break;
      case "createAudioMeet":
        cmtEvents.emit('createAudioMeet',eventText)
        break;
      case "onEventSwitchGroup":
        cmtEvents.emit('onEventSwitchGroup',eventText)
        break;
      case "onEventConnected":
        _that.callId = eventText.callId;
        cmtEvents.emit('onEventConnected',eventText)
        break;
      case "onEventRegistered":
        cmtEvents.emit('onEventRegistered',eventText)
        break;
      case "onEventIncomingCall":
        _that.callId = eventText.callId;
        cmtEvents.emit('comingCall',eventText)
        break;
      case "onclose":
        cmtEvents.emit('onclose', eventText);
        window.localStorage.removeItem('zhinengjianceloading')
        console.log(window.localStorage.removeItem('zhinengjianceloading'));
        break;
      case "onopen":
        if (_that.isOpened) {
          console.log('websocket服务准备好了，此时可以进行注册');
          cmtEvents.emit('opensuccess')
        }
        break;
      case "onerror":
        console.log('websocket服务准备失败。');
        cmtEvents.emit('onerror')
        break;
      case "onEventUserStatusUpdate":
        cmtEvents.emit('onEventUserStatusUpdate', eventText);
        break;
      case "hangUpCall":
        cmtEvents.emit('hangUpCall',eventText)
        break;
      case "onEventDisconnected":
        cmtEvents.emit('onEventDisconnected',eventText)
        break;
      case "onEventRecvSMS":
        cmtEvents.emit('onEventRecvSMS', eventText);
        break;
      case "sendSMS":
          cmtEvents.emit('sendSMS', eventText);
        break;
      case "makeAudioCall":
        _that.callId = eventText.result;

        // currentCmdInfo = {
        //   cmdName:'makeAudioCall',
        //   emitType: '呼叫',
        //   callId: eventText.result
        // }
        cmtEvents.emit('makeAudioCall',eventText)
        break;
      case "makeVideoCall":
        _that.callId = eventText.result;
        break;
      case "onEventPttGroup":
        console.log("onEventPttGroup",eventText);
        // return
        // cmtEvents.emit('calcLoadAchieve',eventText)
        cmtEvents.emit('onEventPttGroup',eventText)
        break;
      case "setMuteEx":
        cmtEvents.emit('setMuteEx',eventText)
        break;
      case "onEventURLPttGroupNotify":
        console.log("onEventURLPttGroupNotify",eventText);
        // return
        if (eventText.strNotify.includes('error')) {
          cmtEvents.emit('onEventURLPttGroupNotify', {
            msg: 'error'
          })
        } else {
          cmtEvents.emit('onEventURLPttGroupNotify', testGroupId(strEvent))
        }
        
        break;
      case "createAudioBroadcast":
        _that.callId = eventText.result;
        cmtEvents.emit('createAudioBroadcast',{
          isCreate: true,
          eventText
        })
        currentCmdInfo = {
          cmdName:'createAudioBroadcast',
          emitType: '语音广播',
          callId: eventText.result
        }
        break;
      case "getPttGroupMemberState":
        cmtEvents.emit('getPttGroupMemberState',eventText)
        break;
      default:
        break;
    }
  };

  this.sendCmd = function(cmd) {
    console.log("connect send message " + cmd);
    if (this.isOpened == true) {
      websocket.send(cmd);
      return 0;
    } else {
      return "-1";
    }
  };
  var that = this;
  this.init = function() {
    //初始化构造函数
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      console.log("connect onopen, isOPend is " + that.isOpened);
      //if (that.isOpened == false) {
      that.isOpened = true;
      that.fireEvent('{"event":"onopen"}');
      //}
    };
    websocket.onclose = function(evt) {
      console.log("connect close " + evt);
      that.fireEvent('{"event":"onclose"}');
      that.isOpened = false;
    };
    websocket.onmessage = function(evt) {
      that.fireEvent(evt.data);
    };
    websocket.onerror = function(evt) {
      console.log("connect error " + evt);
      that.fireEvent('{"event":"onerror"}');
      that.isOpened = false;
    };
  };

  this.tellWhoAmI = function(myName, cmdId) {
    var cmd = {
      cmdName: "whoami",
      cmdParam: [myName, cmdId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  // this.registerSip = function(user, passwd, server, port) {
  //   //获取短消息
  //   var cmd = {
  //     cmdName: "registerSip",
  //     cmdParam: [user, passwd, server, port]
  //   };
  //   return this.sendCmd(JSON.stringify(cmd));
  // };
  this.registerSip = function(user, passwd, server, port) {
    //注册
    var cmd = {
      cmdName: "registerSip",
      cmdParam: [user, passwd, server, port]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.setMute = function(callId, bMute) {
    //禁声功能
    var cmd = {
      cmdName: "setMute",
      cmdParam: [callId, bMute]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.setMuteEx = function(callId, bRx, bMute) {
    //禁声功能扩展，单路禁声
    var cmd = {
      cmdName: "setMuteEx",
      cmdParam: [callId, bRx, bMute]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.sendSMS = function(callNumber, msg) {
    //发送短消息
    var cmd = {
      cmdName: "sendSMS",
      cmdParam: [callNumber, msg]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.sendSmsEx = function(callNumber, msg, extension, type) {
    //发送短消息
    var cmd = {
      cmdName: "sendSmsEx",
      cmdParam: [callNumber, msg, extension, type]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.sendSmsCmd = function(callNumber, msg) {
    //发送短消息
    var cmd = {
      cmdName: "sendSmsCmd",
      cmdParam: [callNumber, msg]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.getPhysicsHandCount = function() {
    //查询可用逻辑手柄数量
    var cmd = {
      cmdName: "getPhysicsHandCount",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.isVideoConversation = function(callId) {
    //音频视频会话
    var cmd = {
      cmdName: "isVideoConversation",
      cmdParam: [callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.remoteControlLocation = function(strDestSip, bOpen) {
    //控制台遥控终端开启定位功能
    var cmd = {
      cmdName: "remoteControlLocation",
      cmdParam: [strDestSip, bOpen]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoInfo = function(nDropeedFrame, nBuffer, nPlayMode) {
    //设置视频信息
    var cmd = {
      cmdName: "setVideoInfo",
      cmdParam: [nDropeedFrame, nBuffer, nPlayMode]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.makeAudioCall = function(destNumber, nHand) {
    //拨打语音电话
    var cmd = {
      cmdName: "makeAudioCall",
      cmdParam: [destNumber, nHand]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.answerCall = function(callId, nHand) {
    //接听来电
    var cmd = {
      cmdName: "answerCall",
      cmdParam: [callId, nHand]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.makeVideoCall = function(destNumber, hWnd, nHand) {
    //拨打视频电话
    var cmd = {
      cmdName: "makeVideoCall",
      cmdParam: [destNumber, hWnd, nHand]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.hangUpCall = function(callId) {
    console.log('-----------------------挂断--------------------------');
    //终止通话
    var cmd = {
      cmdName: "hangUpCall",
      cmdParam: [callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoWnd = function(callId, hWnd) {
    //设置视频播放窗口
    var cmd = {
      cmdName: "setVideoWnd",
      cmdParam: [callId, hWnd]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.callThroughConn = function(nCallId, strDestSip) {
    //转接
    var cmd = {
      cmdName: "callThroughConn",
      cmdParam: [callId, strDestSip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.ptzControl = function(strSip, strControlType, isDown) {
    //ptz云台控制
    var cmd = {
      cmdName: "ptzControl",
      cmdParam: [strSip, strControlType, isDown]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.startVideoDispatch = function(strSrcNum, strDestNum) {
    //开始视频分发
    var cmd = {
      cmdName: "startVideoDispatch",
      cmdParam: [strSrcNum, strDestNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.stopVideoDispatch = function(strChanName, strDestNum) {
    //结束视频分发
    var cmd = {
      cmdName: "stopVideoDispatch",
      cmdParam: [strChanName, strDestNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.queryVideoDispatch = function() {
    //视频分发查询
    var cmd = {
      cmdName: "queryVideoDispatch",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.getDefaultGroup = function() {
    //获取默认组
    var cmd = {
      cmdName: "getDefaultGroup",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.getCurrentGroup = function() {
    //获取当前组
    var cmd = {
      cmdName: "getCurrentGroup",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.switchGroup = function(csGroupNum) {
    //切换对讲组
    var cmd = {
      cmdName: "switchGroup",
      cmdParam: [csGroupNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.getGroupState = function(pttGroupNum) {
    //得到组状态
    var cmd = {
      cmdName: "getGroupState",
      cmdParam: [pttGroupNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.requestPtt = function(opt) {
    //ptt申请，释放
    var cmd = {
      cmdName: "requestPtt",
      cmdParam: [opt]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  // this.getGroupState = function(pttGroupNum) {
  //   //获取组状态
  //   var cmd = {
  //     cmdName: "getGroupState",
  //     cmdParam: [pttGroupNum]
  //   };
  //   return this.sendCmd(JSON.stringify(cmd));
  // };

  this.onEventPttGroup = function(nEvent, nIDGroup, strGroup, bDel) {
    // *获取组成员
    var cmd = {
      cmdName: "getGroupState",
      cmdParam: [nEvent, nIDGroup, strGroup, bDel]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.endPtt = function(csGroupNum) {
    //结束对讲
    var cmd = {
      cmdName: "endPtt",
      cmdParam: [csGroupNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.makePttCall = function(dest, audioDev, join) {
    //发起ptt
    var cmd = {
      cmdName: "makePttCall",
      cmdParam: [dest, audioDev, join]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.getPttGroupMemberState = function(strGroupID, strMemberID) {
    //获取组成员状态
    var cmd = {
      cmdName: "getPttGroupMemberState",
      cmdParam: [strGroupID, strMemberID]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.playVideoFile = function(strVideoType, strVideoPath) {
    //播放视频文件
    var cmd = {
      cmdName: "playVideoFile",
      cmdParam: [strVideoType, strVideoPath]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoTransmit = function(call_id, txFlag) {
    //打开关闭视频（视频回传）
    var cmd = {
      cmdName: "setVideoTransmit",
      cmdParam: [call_id, txFlag]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.subscribeAllPttGroupInfo = function() {
    //订阅所有组信息
    var cmd = {
      cmdName: "subscribeAllPttGroupInfo",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.createPttGroupURL = function(
    strServer,
    nPort,
    groupID,
    strGroupName,
    strMySip,
    strMembers
  ) {
    //创建对讲组
    var cmd = {
      cmdName: "createPttGroupURL",
      cmdParam: [strServer, nPort, groupID, strGroupName, strMySip, strMembers]
    };
    console.log('createPttGroupURL创建对讲组中......');
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.modifyPttGroupURL = function(
    strServer,
    nPort,
    groupID,
    strGroupName,
    strMySip,
    strMembers
  ) {
    //更改对讲组
    var cmd = {
      cmdName: "modifyPttGroupURL",
      cmdParam: [strServer, nPort, groupID, strGroupName, strMySip, strMembers]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.deletePttGroupURL = function(strServer, nPort, groupID, strMySip) {
    //删除对讲组
    var cmd = {
      cmdName: "deletePttGroupURL",
      cmdParam: [strServer, nPort, groupID, strMySip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.createAudioMeet = function(members, nHand) {
    //创建会议
    var cmd = {
      cmdName: "createAudioMeet",
      cmdParam: [members, nHand]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.hangUpCall = function(callId) {
    //结束会议
    var cmd = {
      cmdName: "hangUpCall",
      cmdParam: [callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.audioMeetAddMember = function(strMeetID, memberSip) {
    //追呼成员
    var cmd = {
      cmdName: "audioMeetAddMember",
      cmdParam: [strMeetID, memberSip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.audioMeetDelMember = function(strMeetID, memberSip) {
    //踢出成员
    var cmd = {
      cmdName: "audioMeetDelMember",
      cmdParam: [strMeetID, memberSip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.createVideoMeet = function(memberSip, nHand) {
    //创建会议
    var cmd = {
      cmdName: "createVideoMeet",
      cmdParam: [memberSip, nHand]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.endVideoMeet = function(nCallID) {
    //结束会议
    var cmd = {
      cmdName: "endVideoMeet",
      cmdParam: [nCallID]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetAddMember = function(strMeetID, memberSip) {
    //追呼成员
    var cmd = {
      cmdName: "videoMeetAddMember",
      cmdParam: [strMeetID, memberSip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetDelMember = function(strMeetID, memberSip) {
    //踢出成员
    var cmd = {
      cmdName: "videoMeetDelMember",
      cmdParam: [strMeetID, memberSip]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetPlayVideo = function(hWnd, nCallId, strSipNum) {
    //设置播放窗口
    var cmd = {
      cmdName: "videoMeetPlayVideo",
      cmdParam: [hWnd, nCallId, strSipNum]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.restart = function() {
    //重启服务
    var cmd = {
      cmdName: "restart",
      cmdParam: []
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.makeVideoMonitorCall = function(destNumber, handle) {
    //视频监控(无声侦护)
    var cmd = {
      cmdName: "makeVideoMonitorCall",
      cmdParam: [destNumber, handle]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.setVideoRotate = function(callId, isClockWise) {
    var cmd = {
      cmdName: "setVideoRotate",
      cmdParam: [callId, isClockWise]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.startVideoRecord = function(fileName, callId) {
    var cmd = {
      cmdName: "startVideoRecord",
      cmdParam: [fileName, callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.stopVideoRecord = function(callId) {
    var cmd = {
      cmdName: "stopVideoRecord",
      cmdParam: [callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.takeVideoPicture = function(fileName, callId) {
    var cmd = {
      cmdName: "takeVideoPicture",
      cmdParam: [fileName, callId]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.clientAskInfo = function(what, param) {
    //客户端之间互相查询,问问题
    var cmd = {
      cmdName: "clientAskInfo",
      cmdParam: [what, param]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.clientAnswerInfo = function(what, param, result) {
    //客户端之间互相查询，回答问题
    var cmd = {
      cmdName: "clientAnswerInfo",
      cmdParam: [what, param, result]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.setServiceConfig = function(key, value) {
    //设置服务器的配置, 注意别设置冲突了
    var cmd = { cmdName: "setServiceConfig", cmdParam: [key, value] };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.getAudioDeviceList = function() {
    //获取音频设备列表
    var cmd = { cmdName: "getAudioDeviceList", cmdParam: [] };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.setAudioDeviceIndex = function(type, sIndex, mIndex) {
    //设置使用的音频设备index
    var cmd = {
      cmdName: "setAudioDeviceIndex",
      cmdParam: [type, sIndex, mIndex]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.getServiceConfig = function(key, value) {
    //设置服务器的配置, 注意别设置冲突了
    var cmd = { cmdName: "getServiceConfig", cmdParam: [key, value] };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.closeService = function() {
    //关闭服务
    var cmd = {
      cmdName: "close",
      cmdParam: []
    };
    console.log("closeService");
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.createAudioBroadcast = function(members, nHand, fileName) {
    //创建语音广播
    var cmd = {
      cmdName: "createAudioBroadcast",
      cmdParam: [members, nHand, fileName]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.createShortCut = function(name, url) {
    //创建桌面快捷方式
    var cmd = {
      cmdName: "createShortCut",
      cmdParam: [name, url]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  this.onEventUserStatusUpdate = function(sipNum, status) {
    //用户状态
    var cmd = {
      cmdName: "onEventUserStatusUpdate",
      cmdParam: [sipNum, status]
    };
    return this.sendCmd(JSON.stringify(cmd));
  };
  // 1. 首先尝试打开websocket
  this.init();
}
let helper = null;
export default function GetCmtWsClientHelper() {
  if (helper == null) {
    helper = new CmtWsClientHelper();
  }
  return helper;
}
