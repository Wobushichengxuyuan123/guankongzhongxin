/* eslint-disable no-lone-blocks */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { SetAcceptTheCallInfoAction,SetMidTableDataAction,SetMiddleTabDataAction,AddStatusAction, SetMidTabActiveAction } from './redux/dispatch_action';
import { changeMiddleSipStatus,eventConnected,eventDisConnected,handleCommonAppendVideo,handleDeleteAudioVideoDom,handleHangUpCall,renderRightTableByMiddlePane, statusAnyoneBusy, statusAnyoneOffline, statusAnyoneOnline, statusStateChanged } from './redux/redux_utils';
import _ from 'lodash';
import Meet from './components/meet';
import Left from './components/left/left'
import Right from './components/right/right';
import Middle from './components/middle/middle';
import BroadCast from './components/broadCast';
import ShortLetter from './components/shortLetter/shortLetter';
// import PTZControlPage from '@/js/videoMonitoring/newVideo/leftBtn.js';
import { triggerType as triggerTypeSum, limitPersonTypes } from "./trigger";
import './utils/btnPowerControl';
import cmtEvents from './utils/cmtEvents';
import GetZhddXianHelper from './utils/zhdd_xian';
import { createNewTabPane } from './utils/middleData';
import { treeDataHandleFun } from './utils/treeDataFun'
import { updateSipNumCallStatus } from './utils/renderTitleAndStatus';
import { filterNotPerson, createTableDataSource } from './utils/tableFun';
import { Spin, message } from 'antd'
import './style/index.scss';


class index extends Component {
  constructor(props) {
    super(props);
    this.isCallOrVideo = false; //正在进行视频或者通话
    this.nowTabIndex = 0;
    this.state = {
      btnKey: null,
      isShowPTZControlPage: false,
      nowTabIndex: 0,
      nowCallPersons: [], // 当前呼出去的人们
      loading: false,
      pttGroupArr: [],
      allMsgContent: [],
/*       allMsgContent: [
        {
          theOtherSipNum: "88802001",  //谁收
          // sipNum：谁发
          content: [
            { sipNum: "88802001",name:"test",content:"111111",date: new Date().toLocaleString() },
            { sipNum: "88802010",name:"own",content:"111111",date: new Date().toLocaleString() }
          ]
        }
      ], */
      currentPersonInfo: null,

      isShowPressSpeak: true,  //默认显示按下讲话
      isShowPressTallBackBtn: false,
      isShowTelSudokuBox: false,
      isShowShortLetterBox: false,

      createAudioMeet: null,
      isShowMeetBox: false,

      isShowBroadCastBox: false,
      cmtTriggerInfo: null,

      treeCheckedNodes: [],
      treeTableDataSource: [],

      swiperSlideClickInfo: null,
      cmtEventNameArr: ['anyoneOnline','anyoneOffline','isShowPTZControlPage','stateChanged','speOrLisRightStatus','hangUpCall','singleOptions','groupOptions','one2ManyOptions','intercomOptions','onEventRecvSMS','sendSMS','createAudioMeet','onEventIncomingCall','makeAudioCall','onEventDisconnected','onEventConnected']
    }
  }
  changeIsCallOrVideo = (flag) => {
    this.cmt&&(this.cmt.isCallOrVideo = flag);
  }
  testIsCallOrVideo = () => {
    if (this.cmt&&this.cmt.isCallOrVideo) {
      message.error('请先关闭其他音视频操作')
      return true
    }
  }
  toggleLoading = value => {
    this.setState({ loading: value });
  }
  stateChanged = (config) => {
    statusStateChanged(config)
  }
  anyoneBusy = (sipArr=[]) => {
    statusAnyoneBusy(sipArr)
  }
  anyoneOffline = (sip="") => {
    statusAnyoneOffline(sip,this.onCheck([],true,[sip]))
  }
  anyoneOnline = (sip="") => {
    statusAnyoneOnline(sip)
  }
  // 申请话权成功/失败
  speOrLisRightStatus = (config) => {
    let { type,status } = config;
    if ( type == 'speakRight' ) {
      if (status == 'success') {
        this.speOrLisBtn(true,false);
        message.success('获取话语权成功');
      } else {
        message.error('获取话语权失败')
        this.speOrLisBtn(false,true);
      }
    } else {
      if (status == 'success') {
        message.success('释放话语权成功')
        this.speOrLisBtn(false,true);
      } else {
        
      }
    }
  }
  // 讲话/听讲权利
  speOrLisRight = (speak=false, listen=true) => {
    let { isShowPressSpeak } = this.state;
    if (listen) {
      if (!isShowPressSpeak) {
        this.cmt&&this.cmt.listenRight&&this.cmt.listenRight();
      }
    } else {
      this.cmt&&this.cmt.listenRight&&this.cmt.speakRight();
    }
  }
  // 显示/隐藏对讲按钮
  hideOrShowTallBackBtn = (hideBtn=true, showBtn=false) => {
    if (showBtn) {
      this.setState({ isShowPressTallBackBtn: true });
    } else {
      this.setState({ isShowPressTallBackBtn: false });
    }
  }
  // 显示按下讲话还是显示按下听讲
  speOrLisBtn = (speak=false, listen=true) => {
    if (listen) {
      this.setState({ isShowPressSpeak: true });
    } else {
      this.setState({ isShowPressSpeak: false });
    }
  }
  isShowPTZControlPage = (flag) => {
    this.setState({ isShowPTZControlPage: flag })
  }
  hangUpCall = (config) => {
    handleHangUpCall(config)
  }
  deleteAudioVideoDom = (delDomId=[],newTabPane=[]) => {
    handleDeleteAudioVideoDom(delDomId,newTabPane)
  }
  commonAppendVideo = (videoDom, params={}) => {
    handleCommonAppendVideo(videoDom, params,this.nowTabIndex)
  }
  singleOptions = (config) => {
    let {type,status,data} = config;
    switch (type) {
      case 'stopCommunication':
        {
          this.hangUpCall({
            type: 'makeAudioCallOne',
            data
          })
        }
        break;
      case 'stopCommunication-business':
        {
          this.hangUpCall({
            type: 'makeAudioCallOne',
            isCleanViewerId: true,
            data
          })
        }
        break;
      default:
        break;
    }
  }
  groupOptions = (config) => {
    let {type,status,data} = config;
    switch (type) {
      case 'appendVideo':
        {
          if (status == 'success') {
            let { videoDom, params } = data;
            setTimeout(() => {
              this.commonAppendVideo(videoDom, params);
            })
          }
        }
        break;
        
      default:
        break;
    }
  }
  one2ManyOptions = (config) => {
    let {type,status,data} = config;
    switch (type) {
      case 'appendVideo':
        {
          if (status == 'success') {
            let { videoDom, params } = data;
            setTimeout(() => {
              this.commonAppendVideo(videoDom, params);
            })
          }
        }
        break;
        
      default:
        break;
    }
  }
  intercomOptions = (config) => {
    let {type,status,data} = config;
    switch (type) {
      case 'createResponse':
        {
          this.setMiddleData(data);
        }
        break;
      case 'holdingMic':
        {
          console.log(data,'抢麦的信息');
          let sipArr = [data.personId];
          let tabPane = { tabId: data.tabId };
          let midArr = [{ sip: data.personId, callStatus: "6", status: "2" }];
          this.anyoneBusy(sipArr);
          changeMiddleSipStatus(false,tabPane,midArr);
        }
        break;
      case 'micReleased':
        {
          console.log(data,'释放麦的信息');
          let sipArr = [data.personId];
          let tabPane = { tabId: data.tabId };
          let midArr = [{ sip: data.personId, callStatus: "7", status: "1" }];
          this.anyoneOnline(sipArr);
          changeMiddleSipStatus(false,tabPane,midArr);
        }
        break;
      default:
        break;
    }
  }
  onEventRecvSMS = (eventText) => {
    let { groupMemSip,content } = eventText
    let sipNum = groupMemSip
    let theOtherSipNum = groupMemSip
    let newAllMsgContent = this.addNewSms(theOtherSipNum,sipNum,"",content)
    let { currentMsgContent } = this.findCurrentMsgContent(newAllMsgContent,{theOtherSipNum})
    this.setState({currentMsgContent,allMsgContent:newAllMsgContent})
  }
  sendSMS = (eventText) => {
/*     let { cmdParam } = eventText
    let sipNum = ztConfig.loginSinglePawn
    let theOtherSipNum = cmdParam[0] 
    let content = cmdParam[1]
    let newAllMsgContent = this.addNewSms(theOtherSipNum,sipNum,"",content)
    let { currentMsgContent } = this.findCurrentMsgContent(newAllMsgContent,{theOtherSipNum})
    this.setState({currentMsgContent,allMsgContent:newAllMsgContent}) */
  }
  createAudioMeet = (eventText) => {
    if (eventText.triggerType=='createVideoMeet') {
      this.setState({createAudioMeet: eventText});
    } else {
      this.setState({createAudioMeet:eventText});
    }
  }
  onEventIncomingCall = (fromObj) => {
    let { redux_sumSipNumStatus } = this.props;
    let username = '未知用户';
    let comingCallInfo = redux_sumSipNumStatus.find(v => {
      return v.sip == fromObj.from.userId;
    });
    if (comingCallInfo) {
      username = comingCallInfo.personName;
    }
    fromObj['cmtEventId'] = fromObj.callId
    let triggerInfo = { txt: '', triggerType: '' }
    if (fromObj.type == 'audio') {
      triggerInfo.txt = '呼叫'
      triggerInfo.triggerType = triggerTypeSum.goToPhone
    } else {
      triggerInfo.txt = '视频'
      triggerInfo.triggerType = triggerTypeSum.video
    }
    let info = { personId: fromObj.from.userId, sipNum: fromObj.from.userId, 
      cmtEventId: fromObj.cmtEventId, status: "2", callStatus: "2", 
      key: fromObj.from.userId, title: username, 
      name: username, sipType: comingCallInfo&&comingCallInfo.sipType||""
    }
    let baseInfo = treeDataHandleFun.createBasePersonInfo(info)
    let checkedNodes = []
    checkedNodes.push(baseInfo)
    let newTabPane = createNewTabPane(checkedNodes,triggerInfo)
    let setObj = { newTabPane: { tabId: newTabPane.tabId } }
    this.cmt.setSinglePropDialInfo(setObj)
    this.setMiddleData(newTabPane)
    this.anyoneBusy([fromObj.from.userId,this.props.redux_iscRelationInfo.personId]);
  }
  makeAudioCall = (obj) => {
    obj['sipNum'] = obj['cmdParam'][0];
    obj['cmtEventId'] = obj.result;
    let {redux_midTabActive,redux_middleTabData} = this.props;
    let newMiddleTabData = updateSipNumCallStatus(redux_midTabActive, redux_middleTabData,obj,"makeAudioCall");
    this.props.SetMiddleTabDataAction(newMiddleTabData)
  }
  onEventConnected = (configObj) => {
    eventConnected(configObj)
  }
  onEventDisconnected = (obj) => {
    eventDisConnected(obj)
  }
  cmtEventIsListen = (isListen=true) => {
    let {cmtEventNameArr} = this.state;
    if (isListen) {
      cmtEventNameArr.forEach(v => {
        cmtEvents.on(v, this[v])
      })
    } else {
      cmtEventNameArr.forEach(v => {
        cmtEvents.removeListener(v, this[v])
      })
    }
  }
  shortLetterTrigger = (config={}) => {
    let { triggerType,data } = config
    let {currentPersonInfo,allMsgContent} = this.state
    switch (triggerType) {
      case "close":
        this.setState({isShowShortLetterBox: false})
        break;
      case "setCurrentContent":
        let { currentMsgContent } = this.findCurrentMsgContent(allMsgContent,data)
        currentPersonInfo = {theOtherSipNum: data.theOtherSipNum}
        this.setState({currentPersonInfo,currentMsgContent})
        break;
      default:
        break;
    }
  }
  addNewSms = (theOtherSipNum,sipNum,name,content) => {
    let {allMsgContent} = this.state;
    let baseCon = { sipNum, name:"", content, date: new Date().toLocaleString() }
    let findRes = allMsgContent.findIndex(v => v.theOtherSipNum==theOtherSipNum)
    if (findRes !== -1) {
      allMsgContent[findRes].content.push(baseCon)
    } else {
      let obj = {
        theOtherSipNum,
        content: [baseCon]
      }
      allMsgContent.push(obj)
    }
    return allMsgContent
  }
  findCurrentMsgContent = (allContent=[],currentSelectPersonInfo=null) => {
    let baseInfo = {mobile_phone: "",name:""}
    if (currentSelectPersonInfo) {
      baseInfo.mobile_phone = currentSelectPersonInfo.theOtherSipNum||(currentSelectPersonInfo.props&&currentSelectPersonInfo.props.mobile_phone)||currentSelectPersonInfo.mobile_phone||""
    }
    let currentMsgContent = null
    let findRes = allContent.find(v => {
      return v.theOtherSipNum == (currentSelectPersonInfo&&baseInfo.mobile_phone||"000")
    })
    if (findRes) {
      currentMsgContent = findRes
    } else {
      currentMsgContent = {theOtherSipNum:"",content: []}
    }
    return {currentMsgContent}
  }
  meetTrigger = (configObj={}) => {
    let { triggerType, data } = configObj;
    let { treeCheckedNodes } = this.state;
    let checkPersons = filterNotPerson(treeCheckedNodes);
    if ((triggerType=='audio'||triggerType=='video')&&(checkPersons.length==0)) {
      message.error('请选择人员');
      return true
    }
    switch (triggerType) {
      case 'audio':
        if (!treeCheckedNodes.length) {
          return true
        }
        let newTabPane = createNewTabPane(treeCheckedNodes,data.triggerInfo)
        this.setMiddleData(newTabPane);
        let members = [];
        newTabPane.content.map((item) => {
          members.push(item.personId)
        });
        this.cmt&&this.cmt.createAudioMeet(newTabPane,members, 0);
        this.setState({isShowMeetBox: false});
        break;
      case 'video':
        if (!treeCheckedNodes.length) {
          return true
        }
        let videoNewTabPane = createNewTabPane(treeCheckedNodes,data.triggerInfo)
        this.setMiddleData(videoNewTabPane)
        let videoMembers = []
        videoNewTabPane.content.map((item) => {
          videoMembers.push(item.personId)
        });
        this.cmt&&this.cmt.createVideoMeet(videoNewTabPane,videoMembers, 0);
        this.setState({isShowMeetBox: false});
        break;
      case 'end':
        this.cmt&&this.cmt.hangUpCall();
        this.setState({isShowMeetBox: false,createAudioMeet:null});
        break;
      case 'stopaudio':
        this.cmt&&this.cmt.hangUpCall();
        this.setState({isShowMeetBox: false,createAudioMeet:null});
        break;
      case 'stopvideo':
        this.cmt&&this.cmt.hangUpCall();
        this.setState({isShowMeetBox: false,createAudioMeet:null});
        break;
      default:
        break;
    }
  }
  broadCastTrigger = (configObj={}) => {
    let { triggerType, data } = configObj;
    let { treeCheckedNodes } = this.state;
    let checkPersons = filterNotPerson(treeCheckedNodes);
    if ((triggerType=='file'||triggerType=='audio')&&(checkPersons.length==0)) {
      message.error('请选择人员');
      return true
    }
    switch (triggerType) {
      case 'file':
        let newFileTabPane = createNewTabPane(treeCheckedNodes,data.triggerInfo)
        this.setMiddleData(newFileTabPane)
        let fileMembers = []
        newFileTabPane.content.map((item) => {
          fileMembers.push(item.personId)
        });
        if (data.file) {
          this.cmt&&this.cmt.createFileBroadcast(newFileTabPane,fileMembers,data.file);
        } else {
          this.cmt&&this.cmt.createOnlineUrlBroadcast(newFileTabPane,fileMembers,data.onlineUrl);
        }
        this.changeIsCallOrVideo(true);
        this.setState({isShowBroadCastBox: false});
        break;
      case 'audio':
        this.testIsCallOrVideo();
        let newTabPane = createNewTabPane(treeCheckedNodes,data.triggerInfo)
        this.setMiddleData(newTabPane)
        let members = []
        newTabPane.content.map((item) => {
          members.push(item.personId)
        });
        this.cmt&&this.cmt.createAudioBroadcast(newTabPane,members);
        this.changeIsCallOrVideo(true);
        this.setState({isShowBroadCastBox: false});
        break;
      case 'end':
        this.setState({isShowBroadCastBox: false});
        this.changeIsCallOrVideo(false);
        break;
      default:
        break;
    }
  }
  leftTrigger = (dataObj) => {
    let { swiperSlideClickInfo, treeCheckedNodes } = this.state
    let {SetAcceptTheCallInfoAction,redux_acceptTheCallInfo,redux_sumSipNumStatus,redux_midTabActive,redux_middleTabData} = this.props;
    let checkPersons = filterNotPerson(treeCheckedNodes);
    let { triggerType,data } = dataObj;
    let limitPerson = limitPersonTypes.join();
    if (limitPerson.includes(triggerType)) {
      if ((checkPersons.length==0)) {
        message.error('请选择人员');
        return true
      }
    }
    if (triggerTypeSum.hasOwnProperty(triggerType)) {
      this.setState({cmtTriggerInfo:data.triggerInfo})
    }
    switch(triggerType) {
      case "audioDial":
        let audioDialTriggerInfo = { txt: '', triggerType: '' }
        audioDialTriggerInfo.txt = '呼叫'
        audioDialTriggerInfo.triggerType = triggerTypeSum.goToPhone
        let info = {sipNum: data.sipNum}
        let audioDialBaseInfo = treeDataHandleFun.createBasePersonInfo(info)
        let checkedNodes = []
        checkedNodes.push(audioDialBaseInfo)
        let audioDialNewTabPane = createNewTabPane(checkedNodes,audioDialTriggerInfo)
        this.setMiddleData(audioDialNewTabPane)
        this.cmt&&this.cmt.makeAudioCall(data.sipNum, 0);
        break;
      case "videoDial":
        let videoDialTriggerInfo = { txt: '', triggerType: '' }
        videoDialTriggerInfo.txt = '视频'
        videoDialTriggerInfo.triggerType = triggerTypeSum.video
        let videoDialInfo = {sipNum: data.sipNum}
        let videoDialBaseInfo = treeDataHandleFun.createBasePersonInfo(videoDialInfo)
        let videoDialCheckedNodes = []
        videoDialCheckedNodes.push(videoDialBaseInfo)
        let videoDialNewTabPane = createNewTabPane(videoDialCheckedNodes,videoDialTriggerInfo)
        this.setMiddleData(videoDialNewTabPane)
        this.cmt&&this.cmt.makeVideoCall(data.sipNum, 0, 0);
        break;
      case "hideTelSudoku":
        this.setState({isShowTelSudokuBox:false})
        break;
      case "onCheck":
        this.onCheck(data.checkedNodes||[])
        break;
      case triggerTypeSum.goToPhone:
        let newTabPane = createNewTabPane(data.checkedNodes,data.triggerInfo)
        let nowCallPersons = newTabPane.content;
        this.setMiddleData(newTabPane,nowCallPersons);
        // return true
        let members = [];
        newTabPane.content.map(v => {
          members.push(v.personId)
        })
        if (members.length==1) {
          // *一对一
          this.cmt&&this.cmt.makeAudioCallOne(newTabPane,members.join(','));
        } else {
          // *一对多
          this.cmt&&this.cmt.makeAudioCallSome(newTabPane,members, 0);
        }
        break;
      case triggerTypeSum.video:
        let newTabPane1 = createNewTabPane(data.checkedNodes,data.triggerInfo)
        this.setMiddleData(newTabPane1)
        let videoMembers = [];
        newTabPane1.content.map(v => {
          videoMembers.push(v.personId);
        })
        this.cmt&&this.cmt.createVideo(newTabPane1,videoMembers, 0)
        break;
      // case triggerTypeSum.handUp:
      //   if (redux_acceptTheCallInfo) {
      //     this.cmt&&this.cmt.rejectAudioCall(redux_acceptTheCallInfo.from);
      //     SetAcceptTheCallInfoAction(null);
      //   }
      //   break;
      case triggerTypeSum.answer:
        SetAcceptTheCallInfoAction(null);
        return true
        // if(!swiperSlideClickInfo.cmtEventId) {
        //   return true
        // }
        break;
      case triggerTypeSum.audioBroadCast:
      case triggerTypeSum.broadCast:
        this.setState((state,props) => {
          return {
            isShowBroadCastBox: !state.isShowBroadCastBox,
            btnKey: data.triggerInfo.key
          }
        })
        break;
      case triggerTypeSum.conference:
        this.setState((state,props) => {
          return {
            isShowMeetBox: !state.isShowMeetBox
          }
        })
        break;
      case triggerTypeSum.msg:
        let {currentPersonInfo,allMsgContent} = this.state;
        let checkArr = filterNotPerson(treeCheckedNodes);
        checkArr.length==0?currentPersonInfo=null:currentPersonInfo=checkArr[0];
        let { currentMsgContent } = this.findCurrentMsgContent(allMsgContent,currentPersonInfo);
        if (currentPersonInfo&&currentPersonInfo.props) {
          currentPersonInfo=Object.assign({},currentPersonInfo.props);
          currentPersonInfo.theOtherSipNum = currentPersonInfo.mobile_phone;
        };
        this.setState({currentPersonInfo,currentMsgContent,isShowShortLetterBox: true});
        break;
      case triggerTypeSum.dial:
        this.setState({isShowTelSudokuBox: true})
        break;
      case triggerTypeSum.gpsSipNum:
        let checkPersonList = filterNotPerson(treeCheckedNodes)
        this.gpsPerson(checkPersonList)
        break;
      case triggerTypeSum.end:
        let midData = redux_middleTabData.find(v => {
          return v.tabId == redux_midTabActive;
        })
        this.cmt&&this.cmt.hangUpCall(midData.tabId,midData.triggerType);
        if (midData.triggerType == 'audioBroadCast') {
          this.broadCastTrigger({triggerType: 'end'})
        }
        let {newPaneKey,newMiddleTabData} = this.endHandle(redux_midTabActive,redux_middleTabData);
        this.props.SetMidTabActiveAction(newPaneKey)
        this.props.SetMiddleTabDataAction(newMiddleTabData)
        renderRightTableByMiddlePane(newPaneKey,newMiddleTabData);
        break;
      case triggerTypeSum.tallBack:
        if (!treeCheckedNodes.length) {
          return true
        }
        let tallBackNewTabPane = createNewTabPane(data.checkedNodes,data.triggerInfo);
        // this.setMiddleData(tallBackNewTabPane);
        let tallBackMembers = [];
        tallBackNewTabPane.content.map((item) => {
          let base = { userId:item.personId, userName: item.name}
          tallBackMembers.push(base);
        });
        // let userId2 = (this.props.redux_iscRelationInfo&&this.props.redux_iscRelationInfo.personId)||''
        // let userName2 = (this.props.redux_iscRelationInfo&&this.props.redux_iscRelationInfo.personName)||''
        // tallBackMembers.push({userId: userId2, userName: userName2})
        this.cmt&&this.cmt.tallBack(tallBackNewTabPane,tallBackMembers, 0);
        return
        break;
      case triggerTypeSum.tallBackPressSpeak:
        this.speOrLisRight(true,false);
        break;
      case triggerTypeSum.tallBackPressListen:
        this.speOrLisRight(false,true);
        break;
        default:
        break;
    }
  }
  endHandle = (delPaneKey="",paneArray=[]) => {
    let length = paneArray.length
    let newPaneKey = ""
    let newPaneIndex = 0
    let curPaneindex = paneArray.findIndex(v => {
      return v.tabId == delPaneKey
    })
    if (length==1) {
      newPaneKey = ""
    } else if(curPaneindex==0) {
      newPaneIndex = curPaneindex + 1
    } else {
      newPaneIndex = curPaneindex - 1
    }
    let newPane = paneArray[newPaneIndex];
    newPaneKey = newPane['tabId'];
    let newMiddleTabData = paneArray.filter(v => {
      return v.tabId !== delPaneKey
    })
    this.speOrLisRight(false,true);
    this.speOrLisBtn(false,true);
    if (newMiddleTabData.length==0) {
      this.hideOrShowTallBackBtn(true,false);
      newPaneKey = "";
    } else {
      if (newPane.triggerType === triggerTypeSum.tallBack) {
        this.hideOrShowTallBackBtn(false,true);
      } else {
        this.hideOrShowTallBackBtn(true,false);
      }
    }
    return {newPaneKey,newMiddleTabData}
  }
  gpsPerson = (sipNumArray=[]) => {
    let firstPerson = sipNumArray[0];
    let sipNum = firstPerson.props.sipNum
    let url = '/zhddzt-zhddzt/api/userapi/gps?action=api&sipnum=' + sipNum;
    let reqConfig = { method: 'POST' }
    fetch(url,reqConfig).then(r => r.json())
    .then(res => {
      if (res.length == 0) {
        alert('最近无定位信息')
        return true
      }
      let findVal = res.find(item => {
        return item.user == sipNum
      })
      if (findVal) {
        let gisData = { sipNum, longitude: findVal.lon, latitude: findVal.lat, height: findVal.hig }
        if(window.PushData) {
          window.PushData("peopleGPS" + "@" + JSON.stringify(gisData))
        } else if(window.parent.PushData) {
          window.PushData("peopleGPS" + "@" + JSON.stringify(gisData))
        }
      }
    }, err => {})
  }
  cleanTreeChecked = () => {
    this.setState((state,props) => {
      return {
        treeCheckedNodes: [],
        treeTableDataSource: [],
      }
    })
  }
  onCheck = (array=[],isDelOffline=false,delPersonId=[]) =>{
    if (isDelOffline) {
      array = this.state.treeCheckedNodes;
      delPersonId.some(personId => {
        array = array.filter(v => {
          return v.key != personId
        })
        return false;
      });
      cmtEvents.emit('deleteOfflineCheck',delPersonId);
    }
    let arr = createTableDataSource(array)
    this.setState({ treeCheckedNodes: array,treeTableDataSource: arr })
  }
  middleTrigger = (configObj) => {
    let { triggerType, data } = configObj;
    switch (triggerType) {
      case "onTabClick":
        this.speOrLisRight(false,true);
        this.speOrLisBtn(false,true);
        let res = this.findGroupByProps('tabId',data);
        if (res&&res.triggerType==triggerTypeSum.tallBack) {
          this.hideOrShowTallBackBtn(false,true);
        } else {
          this.hideOrShowTallBackBtn(true,false);
        }
        renderRightTableByMiddlePane(data)
        this.props.SetMidTabActiveAction(data)
        break;
      case "onSwiperSlideClick":
        this.setState({swiperSlideClickInfo: data})
        break;
      default:
        break;
    }
  }
  findGroupByProps = (matchProp,propVal) => {
    return this.props.redux_middleTabData.find(v => {
      return v[matchProp] == propVal;
    });
  }
  setMiddleData = (newTabPane,nowCallPersons=[]) => {
    this.speOrLisRight(false,true);
    this.speOrLisBtn(false,true);
    if (newTabPane.triggerType === triggerTypeSum.tallBack) {
      this.hideOrShowTallBackBtn(false,true);
    } else {
      this.hideOrShowTallBackBtn(true,false);
    }
    let redux_middleTabData = this.props.redux_middleTabData;
    let middleTabPaneActiveKey = newTabPane.tabId;
    redux_middleTabData.push(newTabPane);
    cmtEvents.emit('cleanTreeChecked');
    this.cleanTreeChecked();
    this.nowTabIndex = redux_middleTabData.length;
    this.setState({ nowCallPersons });
    this.props.SetMiddleTabDataAction(redux_middleTabData)
    this.props.SetMidTabActiveAction(middleTabPaneActiveKey)
    renderRightTableByMiddlePane(middleTabPaneActiveKey);
  }
  componentDidMount() {
    this.cmtEventIsListen(true);
    this.cmt = GetZhddXianHelper();
  }
  componentWillUnmount(){
    this.cmtEventIsListen(false)
    this.cmt&&this.cmt.connectSocketDestroy();
  }
  render() {
    console.log('index-render');
    let { 
      isShowPTZControlPage,
      isShowPressSpeak,loading,
      currentPersonInfo, allMsgContent,currentMsgContent, isShowPressTallBackBtn, 
      isShowTelSudokuBox, isShowShortLetterBox, createAudioMeet, isShowMeetBox, 
      isShowBroadCastBox, treeCheckedNodes,
      treeTableDataSource
    } = this.state;
    let {
      redux_middleTabData
    } = this.props;
    return (
      <div id="react-dispatch" className="yixian" style={{
        // height: window.document.documentElement.clientHeight - 64
      }}>
        <Spin tip="loading..." size="large" spinning={loading}>
          {/* {
            isShowPTZControlPage
              ? <div className='PTZControlPage-Box'> <PTZControlPage></PTZControlPage></div>
              : null
          } */}
          { isShowShortLetterBox ? <ShortLetter currentPersonInfo={currentPersonInfo} allMsgContent={allMsgContent} currentMsgContent={currentMsgContent} shortLetterTrigger={this.shortLetterTrigger}></ShortLetter> : null }
          { isShowBroadCastBox ? <BroadCast btnKey={this.state.btnKey} broadCastTrigger={this.broadCastTrigger}></BroadCast> : null }
          { isShowMeetBox ? <Meet createAudioMeet={createAudioMeet} meetTrigger={this.meetTrigger}></Meet> : null }
          <Left isShowPressSpeak={isShowPressSpeak} isShowPressTallBackBtn={isShowPressTallBackBtn} isShowTelSudokuBox={isShowTelSudokuBox} leftTrigger={this.leftTrigger}></Left>
          {
            redux_middleTabData.length
            ? <Middle middleTrigger={this.middleTrigger} ></Middle>
            : null
          }
          <Right treeCheckedNodes={treeCheckedNodes} treeTableDataSource={treeTableDataSource}></Right>
        </Spin>
      </div>
    )
  }
}
export default connect(
  state => ({
    redux_acceptTheCallInfo: state.dispatchReducer.acceptTheCallInfo,
    redux_iscRelationInfo: state.dispatchReducer.iscRelationInfo,
    redux_midTableData: state.dispatchReducer.middleTableDataSource,
    redux_midTabActive: state.dispatchReducer.middleTabPaneActiveKey,
    redux_middleTabData: state.dispatchReducer.middleTabData,
    redux_sumSipNumStatus: state.dispatchReducer.sumSipNumStatus,
  }),
  {SetAcceptTheCallInfoAction,SetMidTableDataAction,SetMidTabActiveAction,SetMiddleTabDataAction,AddStatusAction}
)(index)
