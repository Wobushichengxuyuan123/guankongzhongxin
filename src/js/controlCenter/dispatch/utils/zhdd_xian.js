import { presenterArtemis, viewerArtemis } from 'Artemis';
import cmtEvents from './cmtEvents';
import { message } from 'antd'
import _ from 'lodash';
import {triggerType} from '../trigger.js';
import { getStateByProp, handleAcceptTheCall, statusOnlineAlready } from '../redux/redux_utils';
import openNotification from '../components/globalNotices/globalNotices';
if (process.env.NODE_ENV == 'development') {
  let test = [
      {
          personId: '855012632499400704',
          equipmentList: [
            {equipmentId: '943561560347951104'}
          ],
          personName: '张国良',
          isZhdd:false,
          englishName: 'zgl',
          account: 'zgl'
      },
      {
          personId: 'we3447638d',
          equipmentList: [
            {equipmentId: 'we3447638d'}
          ],
          personName: '小炎子',
          isZhdd:true,
          englishName: 'xyz',
          account: 'we3447638d'
      },
      {
          personId: '909844139642265600',
          equipmentList: [
            {equipmentId: '943561374150213632'}
          ],
          personName: '王世云',
          isZhdd:false,
          englishName: 'wsy',
          account: 'wsy'
      },
      {
          personId: '909844139642265600',
          equipmentList: [
            {equipmentId: '943561374150213632'}
          ],
          personName: '章宝财',
          isZhdd:false,
          englishName: 'zgc',
          account: '12313'
      },
      {
          personId: '854416639277977600',
          equipmentList: [
            {equipmentId: '942749262792478720'}
          ],
          personName: '李振学',
          isZhdd:true,
          englishName: 'lzx',
          account: '432111'
      },
      {
          personId: '867c0bab-ccfb-4005-adda-3cce530be2be',
          equipmentList: [
            {equipmentId: '27228449831123649281'}
          ],
          personName: '公网调度台',
          isZhdd:true,
          englishName: 'gitDDT',
          account: 'gitDDT',
      }
  ]
  test.forEach(v => {
    // !此处的id由原来的人员id改为设备id
    v.personId = v.account;
    window.sessionStorage.setItem('IscRelationMemberInfo' + v.englishName,JSON.stringify(v))
  })
}

function ZhddXianHelper() {
  this.comingCallInfo = {};
  this.micReleasedHoldingMicInfo = [];
  this.waitAddGroupList = [];
  this.alreadyAddGroupList = [];
  this.userId = IscRelationMemberInfo.personId;
  this.userName = IscRelationMemberInfo.personName;
  let artemis;
  const _this = this;
  this.broadcastNotice = {}; //存储广播notice通知信息
  this.isOwnPressTallBackBtn = false; //默认听讲
  this.isCallOrVideo = false;  //判断当前是否已经在沟通了
  this.dialInfo = {
    newTabPane: {},
    status: false,  //true: 'success', false: 'fail'
    triggerType: "", //触发类型
    personInfo: {
      personId: [],
    }, // 给谁播，被呼叫者的信息
  }; 
  // let wsUri = 'wss://192.168.1.34:8443'; //websocket url
  // let wsUri = 'wss://117.50.172.198:8443'; //websocket url
  let wsUri = window.DISPATCHWSS; //websocket url
  // let tem_container = document.querySelector('body');
  const options = {
    // 心跳为三秒
    // useHeartBate: true,
    // 心跳监听
    // heartbeatResponse (message = {}) {
    //     console.log(message,'心跳监听');
    // },
    // 是否开启组件内部的 console.log 打印
    logger: true,
    // $root就必须传！
    // 如果需要视频会议，视频画面将在 $root 中创建。
    // $videoContainer: tem_container||videoContainers,
    // $callContainer: tem_container||videoContainers,
    onlineAlready: (onlineList) => {
      // *登陆成功
      statusOnlineAlready(onlineList,true,false,true)
      // _this.responseStatus2('onlineAlready',onlineList)
      console.log(onlineList, 'onlineAlreadys')
    },
    anyoneOffline: (offline) => {
      _this.responseStatus2('anyoneOffline',offline)
      console.log(offline, 'offline')
    },
    anyoneOnline: (online) => {
      _this.responseStatus2('anyoneOnline',online)
      console.log(online, 'online')
    },
    acceptTheCall (msg = {}) {
      console.log('来电了',msg);
      if (!_this.comingCallInfo['from']) {
        // _this.responseStatus2('acceptTheCall',msg)
        _this.comingCallInfo = { from: msg.from };
        handleAcceptTheCall(msg);
        openNotification(msg);
        return new Promise( (resolve) => {
          let domOn = document.querySelector('#answer');
          let domOff = document.querySelector('#answer_off');
          domOn&&domOn.addEventListener('click',_this.domOnFn(msg,resolve,domOn))
          domOff&&domOff.addEventListener('click',_this.domOffFn(msg,domOff))
          // cmtEvents.on('acceptTheCallFeedBack',_this.acceptTheCallFeedBackFn(msg,resolve))
        })
      } else {
        // return new Promise( (resolve) => {
          _this.rejectAudioCall(msg.from)
          // resolve(true)
        // } )
      }
    },
    singleOptions: {
      stopCommunication(message) {
        console.log('stopCommunication',message);
        let data = (_this.dialInfo);
        if (message.message&&message.message.includes('business')) {
          _this.responseStatus('singleOptions',{
            type:'stopCommunication-business',
            status:'success',
            data
          })
        } else {
          _this.responseStatus('singleOptions',{
            type:'stopCommunication',
            status:'success',
            data
          })
        }
      },
      notice(message) {
        console.log(message,'singleOptions');
      }
    },
    one2ManyOptions: {
      appendVideo(videoDom, params) {
        if (_this.dialInfo.newTabPane.triggerType!='audioBroadCast') {
          console.log(_this.dialInfo.newTabPane.triggerType,'appendVideo',_this.dialInfo,params);
          _this.responseStatus('one2ManyOptions',{type:'appendVideo',status:'success',data:{videoDom,params}})
        }
      },
      notice(msg) {
        let { target,targetStatus } = msg;
        console.log('广播的信息',msg,94);
        // if (targetStatus != "ready") {
        //   return true;
        // }
        // if (_this.broadcastNotice['target']) {
        //   return true;
        // } else {
        //   _this.broadcastNotice['target'] = targetStatus;
        //   let someoneId = [target];
        //   _this.responseStatus('onEventConnected', {
        //     type: 'broadcast',
        //     status: 'success',
        //     data: {
        //       someoneId,
        //       newTabPane: _this.dialInfo.newTabPane
        //     }
        //   });
        // }
      }
    },
    groupOptions: {
      appendVideo(videoDom, params) {
        console.log('groupOptions');
        _this.responseStatus('groupOptions',{type:'appendVideo',status:'success',data:{videoDom,params}})
      },
      joinRoomResponse(msg) {
        console.log(msg,'joinRoomResponse');
      },
      participantLeft(msg) {
        console.log(msg,'participantLeft');
        let { userId } = msg;
        let someoneId = [userId];
        _this.responseStatus('onEventConnected', {
          type: 'participantLeft',
          status: 'leave',
          data: {
            someoneId,
            newTabPane: _this.dialInfo.newTabPane
          }
        });
      },
      receiveVideoAnswer(msg) {
        console.log(msg,'receiveVideoAnswer');
        let { userId } = msg;
        let someoneId = [userId];
        _this.responseStatus('onEventConnected', {
          type: 'receiveVideoAnswer',
          status: 'success',
          data: {
            someoneId,
            newTabPane: _this.dialInfo.newTabPane
          }
        });
      },
      newParticipantArrived(msg) {
        console.log(msg,'newParticipantArrived');
        let { userId } = msg;
        let someoneId = [userId];
        _this.responseStatus('onEventConnected', {
          type: 'newParticipantArrived',
          status: 'success',
          data: {
            someoneId,
            newTabPane: _this.dialInfo.newTabPane
          }
        });
      }
    },
    intercomOptions: {
      appendVideo(videoDom, params) {
        console.log(videoDom,params,'appendVideo');
        // _this.responseStatus('one2ManyOptions',{type:'appendVideo',status:'success',data:{videoDom,params}})
      },
      // 创建组成功
      createResponse(msg) {
        let tabId = msg&&msg.result&&msg.result.id || undefined;
        if (!tabId) {
          return true;
        }
        let tabPane = _this.waitAddGroupList.find((v) => {
          return v.tabId == tabId;
        });
        if (tabPane) {
          _this.responseStatus('intercomOptions',
            { 
              type:'createResponse',
              status:'success',
              data: tabPane 
            }
          );
          _this.delWaitGroup(tabId);
          let baseInfo = { tabId, holdingMicPersonId: "" };
          _this.addAlreadyGroup(baseInfo);
        }
      },
      open(message) {
        console.log(message,'open');
      },
      close(message) {
        console.log(message,'close');
      },
      notice: (message) => {
        let { instruct } = message;
        if (instruct === 'holdingMic') {
          let tabId = message.media.id;
          let personId = message.data.holder.userId;  
          _this.responseStatus('intercomOptions',
            {type:'holdingMic',status:'success',data: {
              personId,
              tabId
            }}
          );
          let flag = _this.alreadyAddGroupList.some(v => {
            if (v['tabId'] == tabId) {
              v['holdingMicPersonId'] = personId;
              return true;
            }
          })
/*           if (!flag) {
            let base = { holdingMicPersonId: personId, tabId };
          //   此处疑似有问题
            _this.alreadyAddGroupList.push(base);
          } */
          if (_this.isOwnPressTallBackBtn) {
            if (message.data.holder.userId==this.userId) {
              _this.responseStatus('speOrLisRightStatus',
                {type:'speakRight',status:'success',data: message}
              );
              console.log('恭喜你抢麦成功~~~');
            } else {
              _this.isOwnPressTallBackBtn = false;
              _this.responseStatus('speOrLisRightStatus',
                {type:'speakRight',status:'fail',data: message}
              );
              console.log('抱歉,抢麦失败~~~');
            }
          }
        }
        // 有人释放麦
        if (instruct === 'micReleased') {
          let tabId = message.media.id;
          if (_this.isOwnPressTallBackBtn) {
            _this.responseStatus('speOrLisRightStatus',{type:'listenRight',status:'success',data: {}});
            _this.isOwnPressTallBackBtn = false;
            _this.responseStatus('intercomOptions',
            {type:'micReleased',status:'success',data: {
                personId: _this.userId,
                tabId
              }}
            );
            return true;
          }
          let personId = "";
          let releasedPersonInfo = _this.alreadyAddGroupList.find(v => {
            if (v.tabId == tabId) {
              personId = v['holdingMicPersonId'];
            }
            v['holdingMicPersonId'] = "";
            return v.tabId == tabId;
          })
          if (releasedPersonInfo) {
            _this.responseStatus('intercomOptions',
              {type:'micReleased',status:'success',data: {
                personId,
                tabId
              }}
            );
            console.log('释放麦成功哦~~~');
          }
        }
      },
      joinResponse(msg) {
        if (msg&&msg.result&&msg.result.participants.length!==0) {
          _this.responseStatus('joinResponse',
            {
              type:'intercom',status:'success',
              data: {
                tabTitle: msg.result.name,
                tabId: msg.result.id,
                members: msg.result.participants
              }
            }
          )
        }
        console.log(msg,'joinResponse');
      }
    },
    stateChanged (user) {
      console.log(user,135);
      _this.responseStatus('stateChanged', {
        type: 'stateChanged',
        status: 'success',
        data: user
      })
    },
    noticeResponse(msg) {
      let { response, instruct, to } = msg;
      console.log(msg,'noticeResponse');
      if( response == 'rejected' ) {
        let data = _.cloneDeep(_this.dialInfo)
        _this.responseStatus('hangUpCall',{
          type: ( 'rejected' + '-' + instruct ),
          status: "success",
          data
        })
      }
      
    }
  };
  this.domOffFn = function(msg,domOff) {
    return () => {
      console.log('取消接听点击');
      _this.rejectAudioCall(msg.from);
      handleAcceptTheCall(null);
      domOff.removeEventListener('click',_this.domOffFn)
    }
  }
  this.domOnFn = function(msg,resolve,domOn) {
    return () => {
      console.log('接听点击');
      if (_this.isCallOrVideo) {
        message.error('请先结束其他音视频操作')
        return true;
      }
      _this.setDialInfo({
        status: true,
        triggerType: 'acceptTheCall',
        personId: [(msg&&msg.from)]||[],
        newTabPane: {},
      });
      cmtEvents.emit('onEventIncomingCall',{
        callId: 1,
        type: 'audio',  
        from: {
          userId: msg.from
        },
        data: new Date().getTime(),
      })
      _this.comingCallInfo = {};
      domOn.removeEventListener('click',_this.domOnFn)
      resolve(true)
    }
  }
  this.acceptTheCallFeedBackFn = function(msg,resolve) {
    console.log('来电了');
    return (actionType) => {
      console.log('acceptTheCallFeedBack>>>>>>acceptTheCallFeedBack');
      if (actionType === 'answer') {
        // console.log(actionType === 'answer');
        if (_this.isCallOrVideo) {
          message.error('请先结束其他音视频操作')
          return true;
        }
        _this.setDialInfo({
          status: true,
          triggerType: 'acceptTheCall',
          personId: [(msg&&msg.from)]||[],
          newTabPane: {},
        });
        cmtEvents.emit('onEventIncomingCall',{
          callId: 1,
          type: 'audio',  
          from: {
            userId: msg.from
          },
          data: new Date().getTime(),
        })
        _this.comingCallInfo = {};
        resolve(true)
      } else {
        _this.rejectAudioCall(msg.from);
        handleAcceptTheCall(null)
      }
      cmtEvents.removeListener('acceptTheCallFeedBack',_this.acceptTheCallFeedBackFn)
    }
  }
  this.addWaitGroup = function(TabPane={}) {
    _this.waitAddGroupList.push(TabPane);
  }
  this.delWaitGroup = function(tabId="") {
    _this.waitAddGroupList = _this.waitAddGroupList.filter(v => {
      return v.tabId != tabId;
    })
  }
  this.addAlreadyGroup = function(baseGroupInfo={}) {
    _this.alreadyAddGroupList.push(baseGroupInfo);
  }
  this.delAlreadyGroup = function(tabId="") {
    _this.waitAddGroupList = _this.alreadyAddGroupList.filter(v => {
      return v.tabId != tabId;
    })
  }
  this.changeIsCallOrVideo = function(flag) {
    _this.isCallOrVideo = flag;
  }
  this.setSinglePropDialInfo = function(obj) {
    let keys = Object.keys(obj);
    keys.forEach(v => {
      _this.dialInfo[v] = obj[v];
    });
  }
  this.setDialInfo = function (optional={}) {
    this.broadcastNotice = {};
    this.dialInfo.status = optional.status||false;
    this.dialInfo.triggerType = optional.triggerType||"";
    this.dialInfo.personInfo = {
      personId: optional.personId||[],
    };
    this.dialInfo.newTabPane = optional.newTabPane||{};
  }
  this.setArtemis = function({userId="",username="",isPresenter=true}={}) {
    userId = userId||_this.userId;
    username = username||_this.userName;
    if (process.env.NODE_ENV == 'development') {
      if (IscRelationMemberInfo.isZhdd) {
        // 默认=>调度台
        artemis = presenterArtemis(wsUri, {
          ...options,
          presenterId: userId,
          presenterName: username,
          userType: 0,
        });
      } else {
        // 单兵
        artemis = viewerArtemis(wsUri, {
          ...options,
          viewerId: userId,
          viewerName: username,
        });
      }
    } else {
      // 默认=>调度台
      artemis = presenterArtemis(wsUri, {
        ...options,
        presenterId: userId,
        presenterName: username,
      });
    }
  }
  this.responseStatus = function(type1="",{type="", status="success",data=null}={}) {
    cmtEvents.emit(type1, { type, status, data })
  }
  this.responseStatus2 = function(type1="",onlineList) {
    cmtEvents.emit(type1, onlineList)
  }
  //通过设置修改默认的websocket uri
  this.setWsUri = function(uri) {
    wsUri = uri;
  }
  // ~呼叫
  this.makeAudioCallSome = function(newTabPane,members=[],userId="",username="") {
    _this.changeIsCallOrVideo(true);
    userId = this.userId;
    username = this.userName;
    let checked = members;
    artemis.createMeeting(
      {
        checked, 
        video: false,
        roomId: newTabPane.tabId,
        roomName: newTabPane.tabTitle,
        presenterId: userId,
        presenterName: username,
      },
      {
        success(message){
          _this.responseStatus('onEventConnected', {
            type: 'makeAudioCallSome',
            status: 'success',
            data: {
              someoneId: [],
            }
          });
        },
        fail(error){
          console.log(error,'error-makeAudioCallSome');
        },
        constraints: {
          audio: true,
          video: false,
        },
      }
    );
    _this.setDialInfo({
      status: true,
      triggerType: 'makeAudioCallSome',
      personId: members,
      newTabPane
    });
  }
  this.makeAudioCallOne = function(newTabPane,toSomeoneId) {
    _this.changeIsCallOrVideo(true);
    artemis.onSingleCall(toSomeoneId, {
      success (message) {
        _this.responseStatus('onEventConnected', {
          type: 'makeAudioCallOne',
          status: 'success',
          data: {
            someoneId: [toSomeoneId],
            newTabPane
          }
        })
      },
      fail (error) {
        console.log(error,478);
        _this.responseStatus('onEventConnected', {
          type: 'makeAudioCallOne',
          status: 'fail',
          data: {
            someoneId: [toSomeoneId],
            newTabPane
          }
        })
      },
      // extra: {
      //   from: {
      //     userId: this.userId,
      //     username: this.userName,
      //     newTabPane: {
      //       tabId: newTabPane.tabId,
      //       tabTitle: newTabPane.tabTitle
      //     }
      //   }
      // },
      // WebRTC 媒体协商配置
      constraints: {
        audio: true,
        video: false,
      },
    });
    _this.setDialInfo({
      status: true,
      triggerType: 'makeAudioCallOne',
      personId: [toSomeoneId],
      newTabPane
    })
  }
  // ~对讲
  this.tallBack = function(tallBackNewTabPane,members=[],userId="",username="") {
    _this.changeIsCallOrVideo(true);
    userId = this.userId;
    username = this.userName;
    let checked = members;
    artemis.createIntercom(
      {
        id: tallBackNewTabPane.tabId,
        name: tallBackNewTabPane.tabTitle,
        mediaType: 'intercom',
        participants: checked,
        mediaConstraints: { video: false, audio: true }
      },
    );
    _this.addWaitGroup(tallBackNewTabPane);
    _this.setDialInfo({ 
      status: true, triggerType: 'createAudioBroadcast',
      personId: members, newTabPane: tallBackNewTabPane
    });
  }
  // 释放讲话的权利
  this.listenRight = function (optional) {
    artemis.releaseMicrophone(function (holder) {});
  }
  // 申请讲话的权利
  this.speakRight = function (optional) {
    console.log('触发了申请讲话的函数~~~');
    _this.isOwnPressTallBackBtn = true;
    artemis.grabCatchMicrophone(function (holder) {});
  }
  // ~广播
  this.createAudioBroadcast = function(newTabPane,members=[]) {
    _this.changeIsCallOrVideo(true);
    let checked = members;
    artemis.onBroadcast(
      checked, 
      {
        success(message){
          _this.responseStatus('stateChanged', {
            type: 'stateChanged',
            status: 'success',
            data: {
              userState: 'createAudioBroadcast', 
              tabId: newTabPane.tabId,
              userId: _this.userId
            }
          })
          // _this.responseStatus('onEventConnected', {
          //   type: 'createAudioBroadcast',
          //   status: 'success',
          //   data: {
          //     someoneId: members,
          //     newTabPane
          //   }
          // });
        },
        fail(error){
          // _this.responseStatus('onEventConnected', {
          //   type: 'createAudioBroadcast',
          //   status: 'fail',
          //   data: {
          //     someoneId: members,
          //     newTabPane
          //   }
          // });
        },
        constraints: {
          audio: true,
          video: false,
        },
      }
    );
    _this.setDialInfo({
      status: true,
      triggerType: 'createAudioBroadcast',
      personId: members,
      newTabPane
    });
  }
  this.createFileBroadcast = function(newFileTabPane,members=[],file) {
    _this.changeIsCallOrVideo(true);
    let checked = members;
    artemis.onBroadcastFile(file, checked,{
      success(message){
        _this.responseStatus('stateChanged', {
          type: 'stateChanged',
          status: 'success',
          data: {
            userState: 'createFileBroadcast', 
            tabId: newFileTabPane.tabId,
            userId: _this.userId
          }
        })
        // _this.responseStatus('onEventConnected', {
        //   type: 'createFileBroadcast',
        //   status: 'success',
        //   data: {
        //     someoneId: members,
        //     newFileTabPane
        //   }
        // });
      },
      constraints: {
        audio: true,
        video: true,
      },
    });
    _this.setDialInfo({
      status: true,
      triggerType: 'createFileBroadcast',
      personId: members,
      newTabPane: newFileTabPane
    });
  }
  this.createOnlineUrlBroadcast = function(newFileTabPane,members=[],onlineUrl) {
    let cmd = {
      triggerType: "createOnlineUrlBroadcast",
      params: members
    };
    let checked = members;
    artemis.onBroadcastRemoteURL(onlineUrl, checked/*, {
      // WebRTC 媒体协商配置
        constraints: {
            audio: true,
            video: false,
        },
    }*/);
    _this.setDialInfo({
      status: true,
      triggerType: 'createOnlineUrlBroadcast',
      personId: members,
      newTabPane: newFileTabPane
    });
  }
  // ~会议
  this.createAudioMeet = function(newTabPane,members=[],userId="",username="") {
    _this.changeIsCallOrVideo(true);
    userId = this.userId;
    username = this.userName;
    let checked = members;
    artemis.createMeeting(
      {
        checked, 
        video: false,
        roomId: newTabPane.tabId,
        roomName: newTabPane.tabTitle,
        presenterId: userId,
        presenterName: username,
      },
      {
        success(message){
          _this.responseStatus('onEventConnected', {
            type: 'createAudioMeet',
            status: 'success',
            data: {
              someoneId: [],
            }
          });
        },
        fail(error){
          console.log(error,'error-createVideoMeet');
        },
        constraints: {
          audio: true,
          video: false,
        },
      }
    );
    _this.setDialInfo({
      status: true,
      triggerType: 'createAudioMeet',
      personId: members,
      newTabPane
    });
  }
  this.createVideoMeet = function(newTabPane,members=[],userId="",username="") {
    _this.changeIsCallOrVideo(true);
    userId = this.userId;
    username = this.userName;
    let checked = members;
    artemis.createMeeting(
      {
        checked, 
        video: true,
        roomId: newTabPane.tabId,
        roomName: newTabPane.tabTitle,
        presenterId: userId,
        presenterName: username,
      },
      {
        success(message){
          console.log(message,'success-createVideoMeet');
        },
        fail(error){
          console.log(error,'error-createVideoMeet');
        },
        constraints: {
          audio: true,
          video: true,
        },
      }
    );
    _this.setDialInfo({
      status: true,
      triggerType: 'createVideoMeet',
      personId: members,
      newTabPane
    });
  }
  // ~视频
  this.createVideo = function(newTabPane,members=[],userId="",username="") {
    _this.changeIsCallOrVideo(true);
    userId = this.userId;
    username = this.userName;
    let checked = members;
    artemis.createMeeting(
      {
        checked, 
        video: false,
        roomId: newTabPane.tabId,
        roomName: newTabPane.tabTitle,
        presenterId: userId,
        presenterName: username,
      },
      {
        success(message){
          // _this.responseStatus('onEventConnected', {
          //   type: 'createVideo',
          //   status: 'success',
          //   data: {
          //     someoneId: members,
          //     newTabPane
          //   }
          // });
        },
        fail(error){
          // _this.responseStatus('onEventConnected', {
          //   type: 'createVideo',
          //   status: 'fail',
          //   data: {
          //     someoneId: members,
          //     newTabPane
          //   }
          // });
        },
        constraints: {
          audio: true,
          video: true,
        },
      }
    );
    _this.setDialInfo({
      status: true,
      triggerType: 'createVideo',
      personId: members,
      newTabPane
    });
  }
  // ~挂断/结束
  this.hangUpCall = function(tabId,groupType) {
    if(!artemis) {
      return true;
    }
    artemis.destroy();
    _this.changeIsCallOrVideo(false);
    if (_this.dialInfo.triggerType) {
      let data = (_this.dialInfo)
      _this.responseStatus('hangUpCall',{
        type: _this.dialInfo.triggerType,
        status: "success",
        data
      })
    }
    this.setDialInfo();
    if (tabId&&groupType&&(groupType==triggerType.tallBack)) {
      _this.delWaitGroup(tabId);
      _this.delAlreadyGroup(tabId);
    }
  }
  // ~拒接
  this.rejectAudioCall = function(userId) {
    _this.comingCallInfo = {}; //reset
    artemis.connectSendRejected({
      instruct: 'singleCall',
      from: userId
    })
    _this.responseStatus('onEventConnected', {
      type: 'rejectAudioCall',
      status: 'rejectAudioCall',
      data: {
        someoneId: [userId],
      }
    });
    // artemis.connectSendRejected({
    //   instruct: 'groupCall/singleCall',
    //   from: userId
    // })
  }
  // ~下线
  this.connectSocketDestroy = function() {
    if(!artemis) {
      return true;
    }
    this.hangUpCall();
    artemis.destroy();
    artemis.connectSocketDestroy();
    helper = null;
  }
}
let helper = null;
var IscRelationMemberInfo = null;
export default function GetZhddXianHelper() {
  IscRelationMemberInfo = getStateByProp('iscRelationInfo');
  if (helper == null&&IscRelationMemberInfo) {
    helper = new ZhddXianHelper();
  }
  return helper;
}