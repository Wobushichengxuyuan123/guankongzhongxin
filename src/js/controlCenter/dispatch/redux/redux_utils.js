/* eslint-disable no-lone-blocks */
import { store } from "../../../../store";
import { 
  SetAcceptTheCallInfoAction,
  AddStatusAction,
  SetMiddleTabDataAction,
  SetMidTableDataAction,
  SetIscRelationMemberInfoAction,
  SetMidTabActiveAction,
} from "./dispatch_action";
import cmtEvents from "../utils/cmtEvents";
import { updateSipNumCallStatus } from "../utils/renderTitleAndStatus";
export function getStateByProp(prop="", reducerName="dispatchReducer") {
  let obj = store.getState();
  if (prop) {
    return obj[reducerName][prop]
  } else {
    return obj[reducerName]
  }
}
export function setIscRelationMemberInfo(info) {
  if (process.env.NODE_ENV == 'development') {
    info = window.parent.sessionStorage.getItem('IscRelationMemberInfo' + window.parent.nowName);
    if (info) {
      info = JSON.parse(info)
    }
  }
  info&&store.dispatch(SetIscRelationMemberInfoAction(info))
}
// status
export function statusDynamicUpdateStatus(sipList=[],isUpdateTree=true,from="") {
  /* 
    @sipList => ["88802010","88802012"]
    @from => 在哪里调用的(例如,点击结束调用: end)
  */
    // let redux_iscRelationInfo = getStateByProp('iscRelationInfo')
    let {
      iscRelationInfo: redux_iscRelationInfo,
      sumSipNumStatus: redux_sumSipNumStatus,
    } = getStateByProp()
    let ownId = (redux_iscRelationInfo&&redux_iscRelationInfo.personId) || "";
    let sipStatusList = [];
    if (sipList.length!==0) {
      sipList.some(v1 => {
        redux_sumSipNumStatus.some(v2 => {
          if ((from=='end')&&(v1==v2.sip)&&(v2.online!="0")) {
            sipStatusList.push({ online: "1", sip: v1 })
            return true;
          }
          if (v1==v2.sip) {
            sipStatusList.push({ online: v2.online, sip: v1 })
            return true;
          }
        })
      })
    }
    if (isUpdateTree) {
      cmtEvents.emit('updateSingleSipNumStatus',sipStatusList, false,'empty',true);
    }
    if (from=='end') {
      statusSetSumSipNumStatus({
        onlineList: [{sip: ownId, online: "1"}]
      });
    }
}
export function statusStateChanged(config) {
  /* 
    @status: 默认都是success
  */
  let { data:{userState, userId, tabId} } = config;
  let busyReg = /(in_singleCall)|(calling)|(in_groupCall)/ig;
  let broadcastReg = /(createFileBroadcast)|(createAudioBroadcast)/ig;
  let onlineReg = /(online)/ig;
  let sipArr = [userId];
  let midArr = [];
  if (busyReg.test(userState)) {
    statusAnyoneBusy(sipArr)
  } else if(onlineReg.test(userState)) {
    midArr = [{ sip:userId, status: "1" }];
    statusAnyoneOnline(userId)
    changeMiddleSipStatus(true,{},midArr);
  } else if (broadcastReg.test(userState)) {
    statusAnyoneBusy(sipArr)
    let tabPane = { tabId }
    midArr = [{ sip:userId, callStatus: "5", status: "2" }];
    changeMiddleSipStatus(false,tabPane,midArr);
  }
}
export function statusAnyoneOffline(sip="",callback=()=>{}) {
  let arr = [{ online: 0, sip }];
  let midArr = [{ sip, callStatus: "3", status: "0" }];
  statusSetSumSipNumStatus({
    onlineList: arr,
    isHangUp: false,
    isSetMiddle: false
  });
  cmtEvents.emit('updateSingleSipNumStatus',sip,true,0);
  changeMiddleSipStatus(true,{},midArr);
  callback&&callback();
}
export function statusAnyoneOnline(sip="") {
  let arr = [{ online: 1, sip }];
  statusSetSumSipNumStatus({
    onlineList: arr,
    isHangUp: false,
    isSetMiddle: false
  });
  cmtEvents.emit('updateSingleSipNumStatus',sip,true,1);
}
export function statusAnyoneBusy(sipArr=[]) {
  let busyList = sipArr;
  sipArr = sipArr.map(v => {
    v = { online: 2, sip: v };
    return v;
  })
  statusSetSumSipNumStatus({
    onlineList: sipArr
  });
  cmtEvents.emit('updateSingleSipNumStatus',busyList,false,2);
}
export function statusSetSumSipNumStatus ({onlineList=[],isHangUp=false,isSetMiddle=true,isOnlineAlready=false}={}) {
  /* 
    @onlineList: [ { sip:1, online:1 } ]
    @baseInfo = { online="", sip="", personId="", personName="", sipType="" };
  */
  let redux_sumSipNumStatus = getStateByProp("sumSipNumStatus"); 
  onlineList.forEach(v => {
    let flag = false;
    flag = redux_sumSipNumStatus.some(v2 => {
      if (v2.sip == v.sip) {
        v2.online = v.online;
        return true;
      }
    });
  })
  store.dispatch(AddStatusAction({isOnlineAlready,redux_sumSipNumStatus}))
}
export function statusOnlineAlready (onlineList=[],isAddOwn=true,isHangUp=false,isLoginSuccess=false) {
  let {
    iscRelationInfo: redux_iscRelationInfo
  } = getStateByProp()
  if (isAddOwn) {
    console.log(149,redux_iscRelationInfo,'redux_iscRelationInfo');
    if (redux_iscRelationInfo) {
      onlineList.push(redux_iscRelationInfo.personId);
    }
  }
  let temArr = onlineList.map(v => {
    v = { online: 1, sip: v };
    return v;
  });
  statusSetSumSipNumStatus({
    isOnlineAlready: isLoginSuccess,
    onlineList: temArr,
    isHangUp,
    isSetMiddle: false
  });
  cmtEvents.emit('updateSingleSipNumStatus',onlineList,false,1);
}
export function eventDisConnected(obj) {
  obj['cmdName'] = obj.event
  obj['cmtEventId'] = obj.callId
  let {
    middleTabPaneActiveKey: redux_midTabActive,
    middleTabData: redux_middleTabData,
  } = getStateByProp()
  if (redux_middleTabData.length == 0) {
    return true
  }
  let newMiddleTabData = updateSipNumCallStatus(redux_midTabActive, redux_middleTabData,obj,"onEventDisconnected")
  store.dispatch(SetMiddleTabDataAction(newMiddleTabData))
  renderRightTableByMiddlePane(redux_midTabActive)
}
export function eventConnected(configObj) {
  let { type, status, data } = configObj;
  let midArr = [];
  let someoneId = [];
  let delOwnIdFlag = false;
  let redux_iscRelationInfo = getStateByProp('iscRelationInfo');
  someoneId = [].concat(data.someoneId);
  let emptyIdReg = /(makeAudioCallSome)|(createFileBroadcast)|(createAudioMeet)/ig;
  if(emptyIdReg.test(type)) {
    someoneId = [];
  }
  let delOwnIdReg = /(rejectAudioCall)|(leave)/ig
  if (delOwnIdReg.test(status)) {
    delOwnIdFlag = true;
  } else {
    delOwnIdFlag = false;
  }
  if (!delOwnIdFlag&&redux_iscRelationInfo) {
    someoneId.push(redux_iscRelationInfo.personId)
  }
  let delId = [].concat(someoneId);
  switch (status) {
    case 'rejectAudioCall':
      {
        statusOnlineAlready(someoneId)
      }
      break;
    case 'leave':
      {
        statusDynamicUpdateStatus(someoneId,true)
        handleDeleteAudioVideoDom(delId,data.newTabPane)
      }
      break;
    case 'success':
      {
        midArr = someoneId.map(v => {
          v = { sip: v, callStatus: "2", status: "2" }
          return v
        })
        statusAnyoneBusy(someoneId)
      }
      break;
    case 'fail':
      {
        midArr = someoneId.map(v => {
          v = { sip: v, callStatus: "3" }
          return v
        })
        statusOnlineAlready(someoneId);
      }
      break;
    default:
      break;
  }
  if (status!='rejectAudioCall') {
    changeMiddleSipStatus(false,data.newTabPane,midArr,delOwnIdFlag,data.someoneId);
  }
}
// middle
export function renderRightTableByMiddlePane(middleTabPaneActiveKey="",configMiddleTabData=null) {
  let { 
    middleTabData: redux_middleTabData,
    middleTabPaneActiveKey: redux_midTabActive 
  } = getStateByProp("","dispatchReducer");
  if (!middleTabPaneActiveKey) {
    middleTabPaneActiveKey=redux_midTabActive
  }
  let middleTabData = [];
  if (configMiddleTabData) {
    middleTabData = configMiddleTabData
  } else {
    middleTabData = redux_middleTabData;
  }
  let res = middleTabData.find(v => v.tabId==middleTabPaneActiveKey);
  let data = (res&&res.content) || [];
  store.dispatch(SetMidTableDataAction(data))
}
export function changeMiddleSipStatus(changeAllTab=true,newTabPane={},toSomeoneId=[{}],isRemovePerson=false,removePersonId=[]) {
  let { 
    middleTabData: redux_middleTabData,
  } = getStateByProp("","dispatchReducer");
  redux_middleTabData.some(v => {
    if (changeAllTab||((!changeAllTab&&v.tabId == newTabPane.tabId)&&(v.content.length!==0))) {
      if (isRemovePerson) {
        removePersonId.some(v2 => {
          v.content = v.content.filter(v4 => {
            return v4.personId != v2
          })
          return false;
        })
      } else {
        toSomeoneId.some(v2 => {
          v.content.some(v3 => {
            if (v3.personId == v2.sip) {
              v2['callStatus']&&(v3.callStatus = v2.callStatus);
              v2['status']&&(v3.status = v2.status);
              return true;
            }
          });
          return false;
        });
      }
      return !changeAllTab;
    }
  });
  store.dispatch(SetMiddleTabDataAction(redux_middleTabData))
  renderRightTableByMiddlePane();
}
// handleVideo/Audio
export function handleDeleteAudioVideoDom(delDomId=[],newTabPane=[]) {
  let {
    middleTabData: redux_middleTabData,
  } = getStateByProp()
  let delDom = null;
  let nowTabIndex = -1;
  nowTabIndex = redux_middleTabData.findIndex(v => {
    return v.tabId == newTabPane.tabId;
  })
  if (nowTabIndex == -1) {
    return true;
  } else {
    nowTabIndex++;
  }
  let swiperContainer = document.querySelector(`#react-dispatch-middle .tabs .ant-tabs-content [role="tabpanel"]:nth-child(${nowTabIndex}) .swiper-container`);
  if (swiperContainer) {
    let lastCon = swiperContainer.querySelector('.swiper-container .swiper-wrapper');
    if (lastCon) {
      delDomId.forEach(v => {
        delDom = lastCon.querySelector(`#userId${v}`);
        lastCon.removeChild(delDom);
      });
      let fDom = swiperContainer&&swiperContainer.swiper;
      fDom&&fDom.updateSlides();
    }
  }
}
export function handleCommonAppendVideo(videoDom, params,nowTabIndex) {
  let { userId, userName } = params;
  let baseClassName = 'swiper-slide participant';
  let swiperContainer = document.querySelector(`#react-dispatch-middle .tabs .ant-tabs-content [role="tabpanel"]:nth-child(${nowTabIndex}) .swiper-container`);
  if (swiperContainer) {
    let lastCon = swiperContainer.querySelector('.swiper-container .swiper-wrapper');
    let spanDom = document.createElement('span');
    spanDom.setAttribute('class', 'name');
    let {
      sumSipNumStatus: redux_sumSipNumStatus
    } = getStateByProp();
    let username = userName;
    let comingCallInfo = redux_sumSipNumStatus.find(v => {
      return v.sip == userId;
    });
    if (comingCallInfo) {
      username = comingCallInfo.personName;
    }
    spanDom.innerHTML = username;
    if (videoDom.tagName == 'DIV') {
      videoDom.setAttribute('id', 'userId' + userId);
      videoDom.setAttribute('class', baseClassName);
      videoDom.appendChild(spanDom);
      lastCon&&lastCon.appendChild(videoDom);
    } else {
      let divDom = document.createElement('div');
      divDom.setAttribute('class', baseClassName);
      divDom.setAttribute('id', 'userId' + userId);
      divDom.appendChild(spanDom);
      divDom.appendChild(videoDom);
      lastCon&&lastCon.appendChild(divDom);
    }
    let fDom = swiperContainer&&swiperContainer.swiper;
    fDom&&fDom.updateSlides();
  }
}
// hangUpCall
export function handleHangUpCall(config) {
  let {
    iscRelationInfo: redux_iscRelationInfo,
    sumSipNumStatus: redux_sumSipNumStatus
  }  = getStateByProp()
  let {isCleanViewerId,type,status,data} = config;
  let reg = /(acceptTheCall)|(makeAudioCallSome)|(createAudioMeet)|(makeAudioCallOne)|(createFileBroadcast)|(createAudioBroadcast)|(createVideo)|(rejected-singleCall)/ig;
  if (!reg.test(type)) {
    return true;
  }
  let { personInfo } = data;
  let sipArr = [].concat(personInfo.personId);
  if (isCleanViewerId || type == 'createFileBroadcast' || type == 'createAudioBroadcast') {
    sipArr = []
  }
  if (redux_iscRelationInfo) {
    sipArr.push(redux_iscRelationInfo.personId)
  }
  statusDynamicUpdateStatus(sipArr,true,'end');
  let midArr = [];
  if(isCleanViewerId){
    sipArr = sipArr.concat(personInfo.personId);
  }
  midArr = sipArr.map(v => {
    let res = redux_sumSipNumStatus.find(v2 => v==v2.sip)
    v = { sip: v, callStatus: "3", status: (res&&res.online)||"1" };
    return v;
  })
  changeMiddleSipStatus(false,data.newTabPane,midArr);
}
// right
export function handleOperate(configObj) {
  let { triggerType, data } = configObj;
  switch (triggerType) {
    case 'operate':
      
      let {middleTabPaneActiveKey,middleTabData} = getStateByProp();

      let endTriggerFlag = false
      middleTabData.some(v => {
        if (v.tabId == middleTabPaneActiveKey) {
          v.content = v.content.filter(v2 => {
            return v2.sipNum !== data.sipNum
          })
          if (v.content.length==0) {
            endTriggerFlag = true
            let {newPaneKey,newMiddleTabData} = this.endHandle(middleTabPaneActiveKey,middleTabData)
            store.dispatch(SetMidTabActiveAction(newPaneKey));
            store.dispatch(SetMiddleTabDataAction(newMiddleTabData));
            renderRightTableByMiddlePane(newPaneKey)
          }
          return true
        }
      })
      if (!endTriggerFlag) {
        store.dispatch(SetMiddleTabDataAction(middleTabData))
        renderRightTableByMiddlePane(middleTabPaneActiveKey)
      }
      break;
    default:
      break;
  }
}
// 来电
export function handleAcceptTheCall(msg={}) {
  store.dispatch(SetAcceptTheCallInfoAction(msg))
}