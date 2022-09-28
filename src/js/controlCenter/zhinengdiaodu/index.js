// ~ --------------------------------------------------import-------------------
import _ from 'lodash'
import { v4 as uuid4 } from 'uuid'
import { Modal, Radio, message, Tree, Tabs, Input, Spin, Icon, Button } from "antd";
// ! 目前没用到
import { Scrollbars } from "react-custom-scrollbars";
import { CarryOutOutlined } from '@ant-design/icons';
import React from "react";
import Right from "./rightBox/rightcontent";
import Buttons from "./button";
import Groups from "./groups";
import "../container/css/person.scss";
import "./css/index.scss";
import GetCmtWsClientHelper from "@/js/utils/cmtWsClientHelper.js";
import { ztConfig, companyConfig } from "@/js/utils/cmt-config.js";
// ~ --------------------------------------------------img-------------------
import OffLineBracelet from './img/OffLineBracelet.svg'
import OffLineHat from './img/OffLineHat.svg'
import OffLineMobile from './img/OffLineMobile.svg'
import OffLineComputer from './img/OffLineComputer.svg'

import OnLineBracelet from './img/OnLineBracelet.svg'
import OnLineHat from './img/OnLineHat.svg'
import OnLineMobile from './img/OnLineMobile.svg'
import OnLineComputer from './img/OnLineComputer.svg'

import OnLineBraceletJixi from './img/OnLineBraceletJixi.svg'
import OnLineHatJixi from './img/OnLineHatJixi.svg'
import OnLineMobileJixi from './img/OnLineMobileJixi.svg'
import OnLineComputerJixi from './img/OnLineComputerJixi.svg'

import CallBracelet from './img/CallBracelet.svg'
import CallHat from './img/CallHat.svg'
import CallMobile from './img/CallMobile.svg'
import CallComputer from './img/CallComputer.svg'
// ~ --------------------------------------------------plug-in-------------------
const iconfontUrl = '//at.alicdn.com/t/font_2668405_7jmhxfyrwqj.js'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconfontUrl,
});
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const { confirm } = Modal;
/* eslint-disable */
// ~ --------------------------------------------------events-------------------
import cmtEvents from "@/js/utils/cmtEvents.js";

import { MyUpload } from './MyUpload.js'
import AlertDxBox from './alertDxBox.js'
import { act } from "@testing-library/react";
import { update } from "js-md5";
import AlertVueInfo from './AlertVueInfo';
import CommonTable from './CommonTable';
import TelSudoku from './TelSudoku';
class Zhihuidiaodu extends React.Component {
  // ?-------------------------------------------------constructor---------------------------
  //#region 
  constructor(props) {
    super(props);
    this.state = {
      temSaveGroupInfo: {
        groupName:"",
        strGroup: "" // 成员以下划线隔开
      },// 创建组时，临时存储的组相关数据，创建完成删除
      isBh: false,
      isHideTelSudoku: true,
      newAddressee: [],
      sendSMSInfo: {},
      temDxBoxLeftList: [],
      dxBoxLeftList: [],
      planId: null,
      modalTitle: '应急预案',
      isShowAlertVueBoxFlag: false,
      hangupInfo: [],
      comingCallInfo: [],
      disConnectedInfo:[],
      zhinengjianceloadingTip: '加载中...',
      zhinengjianceloading: true,
      comingCallingFlag: false,
      comingCallTableData: [],
      isOpenBh: false,
      bHTableData: [],
      comingCallDataSource: [],
      treeGrandSonData: [],
      callGroupCurrentSlideSipnum: '',
      isShowAxjhBtnFlag: false,
      allMakeAudioCallInfo: [],
      onEventConnectedFlag: false,
      isShowHandDownBtn: false,
      emitTypeArr:[],
      newCreateGroupIdArr: [],
      axjhFlag: 'call',
      willDeletePersonFromGroupInfo: {
        key: '',
        groupID: ''
      },
      isOpenOnOnEventPttGroup: false,
      alreadySendMsgPersons: [
        // {
        //   addressee: '8880002',
        //   addresser: '88802010',
        //   currentDxAllContent: []
        // }
      ],
      stageSelectPersonInfo: {
        sipNum: '',
        name: ''
      },
      currentExchangeMsgPerson: {
        // 收件人
        addressee: [
          {
            name: '',
            sipNum: '',
          }
        ],
        // 发件人
        addresser: [
          {
            name: '',
            sipNum: ''
          }
        ]
      },
      isCreate: false,
      currentDxAllContent:[
        // {
        //   sipNum: ztConfig.loginSinglePawn,
        //   name: '王璐德',
        //   content: '1',
        //   date: '2021/7/6上午10:42:54'
        // }
      ],
      isShowDxAlertBox: false,
      isShowHyAlertRadioBox: false,
      HyRadioValue: "audio",
      // Mso: "",
      Mso: GetCmtWsClientHelper(),
      isShowGbAlertRadioBox: false,
      radioValue: "audio",
      temporaryGroupIDArray: [],
      zzjgTabIsDisabledFlag: false,
      txzTabIsDisabledFlag: false,
      yjdwTabIsDisabledFlag: false,
      // *监听是否来电
      comingCall: false,
      loading: false,
      middleTreeData: [],
      // *后期button组的所有存储数据放置在这里
      buttonAllData:[
        {
          emitType: 'call',
          groupsInfoObj: {
            newTabIndex: 0,
            activeKey: '1',
            panes: []
          }
        }
        // ......
      ],
      stageNewCreateGroupInfoArray:[],
      newCreateGroupInfo: {
        nIDGroup: '',
        name: '',
        members: [],
        status: 'fail',
        type: ''
      },
      currentGroupInfo: {},

      groupsInfoObj: {
        newTabIndex: 0,
        activeKey: '1',
        panes: []
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'personName',
          key: 'personName',
          align: 'center',
          width: 91
        },
        {
          title: '状态',
          dataIndex: 'personStatus',
          key: 'personStatus',
          align: 'center',
          width: 76
        },
        {
          title: '类型',
          dataIndex: 'personType',
          key: 'personType',
          align: 'center',
          width: 76
        },
        // {
        //   title: '禁言',
        //   dataIndex: 'personDumb',
        //   key: 'personDumb',
        //   align: 'center',
        //   width: 56
        // },
        {
          title: '请出',
          dataIndex: 'personLogout',
          key: 'personLogout',
          align: 'center',
          width: 76
        }
      ],
      temDataSource: [],
      dataSource: [
        // {
        //   key: item.key,
        //   personName: item.props.personName,
        //   personStatus: '',
        //   personType: '',
        //   personDumb: '',
        //   personLogout: ''
        // }
      ],
      emitType: '',
      isShowMiddleGroups: false,

      zzjgController: null,
      txzController: null,
      yjdwController: null,
      
      zzjgSignal: null,
      txzSignal: null,
      yjdwSignal: null,

      zzjgExpandedKeys: [],
      txzExpandedKeys: [],
      yjdwExpandedKeys: [],

      zzjgCheckedKeys: [],
      txzCheckedKeys: [],
      yjdwCheckedKeys: [],

      expandedKeys: [],
      checkedKeys: [],
      // suddenEventInfo: {
      //   actDeskId:50
      //   ,createDate:1628524800000
      //   ,creater:"旁华村"
      //   ,drillBeginDatetime:1628524800000
      //   ,drillEndDatetime:1628956800000
      //   ,drillJionPerson:null
      //   ,eventDisposalMeasure:null
      //   ,eventHeight:null
      //   ,eventLatitude:"30.15262632638300100000"
      //   ,eventLevel:3
      //   ,eventLevelName:"三级"
      //   ,eventLongitude:"118.75502295119601000000"
      //   ,eventProcessDesc:null
      //   ,eventStateDesc:"2021-08-10上午10时，一场台风，将下水库三合屯7户人家房屋倒塌，有3人受伤，1人失踪。"
      //   ,eventStatus:1
      //   ,eventSummingUp:null
      //   ,eventType:2
      //   ,eventTypeName:"台风灾害事件"
      //   ,happenArea:"下库大坝下三合屯村庄入口7户人家"
      //   ,happenLocalPos:null
      //   ,isEventFlag:1
      //   ,planId:1
      //   ,planName:null
      //   ,powerStationId:2
      //   ,powerStationName:"绩溪电站"
      //   ,recordStatus:0
      //   ,suddenEventNo:"TFSJ-2021-01-05"
      //   ,suddenEventSample:"台风灾害引发房屋破损、倒塌"
      //   ,suddenEventSource:null
      // },
      suddenEventInfo: (JSON.parse(window.parent.sessionStorage.getItem('suddenEventInfo')) || null),
      selectedKeys: [''],
      selectList: [],
      treeTeamTroopIdArray: [],
      currentTabPane: "zzjg",
      personCount: 0,
      treeData: [],
      treeTeamList: [],
      isLoding: true,
      tabActiveKey: '1',
      tabSelected: "area",
    };
  }
  //#endregion
  // ?---------------------------------------------------componentDidMount--componentWillUnmount---------------------------
  async componentDidMount() {
    // this.setState({})
    await this.getZzjg()
    // !important
    // window.open("CmtClientService://");
    // window.location = "CmtClientService://";
    cmtEvents.on('closeSuddenEvent',this.closeSuddenEvent)
    cmtEvents.on('setMso',this.setMso)
    cmtEvents.on('createVideoMeet',this.createVideoMeet)
    cmtEvents.on('createAudioMeet',this.createAudioMeet)
    cmtEvents.on('onclose',this.onclose)
    cmtEvents.on('calcLoadAchieve',this.calcLoadAchieve)
    cmtEvents.on('onEventSwitchGroup',this.onEventSwitchGroup)
    cmtEvents.on('onEventDisconnected',this.onEventDisconnected)
    cmtEvents.on('makeAudioCall', this.makeAudioCall)
    cmtEvents.on('onEventPttGroup', this.onEventPttGroup)
    cmtEvents.on('onEventUserStatusUpdate', this.onEventUserStatusUpdate)
    cmtEvents.on('comingCall', this.comingCall)
    cmtEvents.on('hangUpCall', this.hangUpCall)
    cmtEvents.on('onEventRecvSMS', this.onEventRecvSMS)
    cmtEvents.on('sendSMS', this.sendSMS)
    cmtEvents.on('createAudioBroadcast', this.createAudioBroadcast)
    cmtEvents.on('onEventURLPttGroupNotify',this.onEventURLPttGroupNotify)
    cmtEvents.on('getPttGroupMemberState', this.getPttGroupMemberState)
    cmtEvents.on('setMuteEx', this.setMuteEx)
    cmtEvents.on('onEventConnected',this.onEventConnected)
    this.gisCallAudioAndVideoFun()
    this.detectionIsLogin()
  }
  componentWillUnmount() {
    cmtEvents.removeListener('closeSuddenEvent', this.closeSuddenEvent)
    cmtEvents.removeListener('setMso', this.setMso)
    cmtEvents.removeListener('createVideoMeet', this.createVideoMeet)
    cmtEvents.removeListener('createAudioMeet', this.createAudioMeet)
    cmtEvents.removeListener('onclose', this.onclose)
    cmtEvents.removeListener('calcLoadAchieve', this.calcLoadAchieve)
    cmtEvents.removeListener('onEventDisconnected', this.onEventDisconnected)
    cmtEvents.removeListener('onEventSwitchGroup', this.onEventSwitchGroup)
    cmtEvents.removeListener('makeAudioCall', this.makeAudioCall)
    cmtEvents.removeListener('onEventPttGroup', this.onEventPttGroup)
    cmtEvents.removeListener('onEventUserStatusUpdate', this.onEventUserStatusUpdate)
    cmtEvents.removeListener('comingCall', this.comingCall)
    cmtEvents.removeListener('hangUpCall', this.hangUpCall)
    cmtEvents.removeListener('onEventRecvSMS', this.onEventRecvSMS)
    cmtEvents.removeListener('sendSMS', this.sendSMS)
    cmtEvents.removeListener('createAudioBroadcast', this.createAudioBroadcast)
    cmtEvents.removeListener('onEventURLPttGroupNotify',this.onEventURLPttGroupNotify)
    cmtEvents.removeListener('getPttGroupMemberState', this.getPttGroupMemberState)
    cmtEvents.removeListener('setMuteEx', this.setMuteEx)
    cmtEvents.removeListener('onEventConnected', this.onEventConnected)
  }
  // ~------------------------------------新版本--------------------------------------------
  // #region 新版本方法（暂定为前缀，second的sec）
  setMso = (Mso) => {
    this.setState((state,props) => {
      return {
        Mso
      }
    })
  }
  saveBhTableData = async (parameter) => {
    let {eventText} = parameter;
    let {
      bHTableData
    } = _.cloneDeep(this.state)
    let key = eventText['sipNum']
    let obj = {
      dumbStatus:"normal"
      ,key
      ,personDumb:this.dumbTip({status:"normal",key})
      ,personLogout:<Icon style={{cursor: 'pointer'}} type="close" />
      ,personName:key
      ,personStatus:"未知"
      ,personType:"未知"
      ,typeCode:""
    }
    bHTableData.push(obj)
    await this.setState((state,props) => {
      return {
        bHTableData
      }
    })
  }
  secBh = async (parameter) => {
    let  {
      emitType,
      eventText
    } = parameter
    await this.setState((state,props) => {
      return {
        isOpenBh: true
      }
    })
    await this.saveBhTableData({
      eventText
    })
    switch(emitType) {
      case 'call':
        this.watchFun({
          emitType: 'call',
          buttonMso: this.state.Mso
        })
        break;
      case 'sp':
        this.watchFun({
          emitType: 'sp',
          buttonMso: this.state.Mso
        })
        break;
    }
  }
  secCreateNewGroupItem = async (parameter) => {
    await this.switchZhinengjianceloading({
      zhinengjianceloadingTip: '创建组中...',
    })
    let {
      emitType,
      dataSource,
      comingCallingFlag,
      isOpenBh,
      bHTableData
    } = _.cloneDeep(this.state)
    let {
      members=[],
      dataSource2='',
      tem_groupName='',
      eventType='',
      eventText=''
    } = parameter;
    let lastMembers = [];
    console.log(isOpenBh,427);
    if(!isOpenBh) {
      lastMembers = dataSource2 || dataSource
    } else {
      lastMembers = bHTableData
    }
    lastMembers.filter((item) => {
      return item.key != ztConfig.loginSinglePawn
    })    
    if (/(call|comingCallaudio|comingCallvideo)/ig.test(emitType)) {
      lastMembers.some((item) => {
        item['callStatus'] = '连接中...';
      })
    }
    let newPanesItem = {
      nIDGroup: uuid4(),
      tem_groupName,
      name: tem_groupName,
      members: lastMembers,
      type: '',
      status: 'success',
      eventText
    };
    if (comingCallingFlag) {
      newPanesItem['isCalledOrCalling'] = 'Called'
    }
    this.secUpdateGroupInfoObj({
      newPanesItem
    })
    // this.clearCurrentSelectListAndKeys()
  }
  secUpdateGroupInfoObj = (parameter) => {
    let { newPanesItem } = parameter;
    let {
      groupsInfoObj,
      stageNewCreateGroupInfoArray
    } = _.cloneDeep(this.state);
    stageNewCreateGroupInfoArray.push(newPanesItem);
    groupsInfoObj.activeKey = newPanesItem.nIDGroup;
    groupsInfoObj.panes.push(newPanesItem)
    this.setState((state,props) => {
      return {
        stageNewCreateGroupInfoArray,
        groupsInfoObj,
        comingCallingFlag: false,
        zhinengjianceloading: false,
        isShowMiddleGroups: true,
        isBh: false
      }
    })
    if (newPanesItem['name'].includes('视频通话')) {
      this.setState((state,props) => {
        return {
          comingCall: true
        }
      })
    }
    this.showHandDownBtnOrDjBtn({strIDGroup:newPanesItem.nIDGroup})
    this.setState((state,props) => {
      return {
        isOpenBh: false
      }
    })
  }
  // #endregion
  // ~------------------------------------events function--------------------------------------------
  // #region events function
  closeSuddenEvent = (parameter) => {
    this.setState((state,props) => {
      return {
        suddenEventInfo: null
      }
    })
    window.parent&&window.parent.sessionStorage.removeItem('suddenEventInfo')
  }
  createAudioMeet = (eventText) => {
    this.setState((state,props) => {
      return {
        emitType: 'callHy'
      }
    })
    this.secCreateNewGroupItem(
      {
        tem_groupName:'语音会议组',eventText
      }
    )
  }
  createVideoMeet = (eventText) => {
    this.setState((state,props) => {
      return {
        emitType: 'videoHy'
      }
    })
    this.secCreateNewGroupItem(
      {
        tem_groupName:'视频会议组',eventText
      }
    )
  }
  onclose = (parameter) => {
    this.showConfirm({
      title: '严重警告！',
      content: 'cmt服务已关闭，请刷新重试 .'
    })
  }
  calcLoadAchieve = () => {
    let tip5 = (this.calcLoadAchieveTimer5 || '')
    let tip4 = (this.calcLoadAchieveTimer4 || '')
    let tip3 = (this.calcLoadAchieveTimer3 || '')
    if (flag) {
      return
    }
    this.switchZhinengjianceloading({
      zhinengjianceloadingTip: `后台${tip5 + tip4 + tip3}推送数据中...`,
    })
    var flag = false;
    if (this.calcLoadAchieveTimer3) {
      clearTimeout(this.calcLoadAchieveTimer3)
    }
    if (this.calcLoadAchieveTimer4) {
      clearTimeout(this.calcLoadAchieveTimer4)
    }
    if (this.calcLoadAchieveTimer5) {
      clearTimeout(this.calcLoadAchieveTimer5)
    }
    this.calcLoadAchieveTimer3 = setTimeout(() => {
      this.switchZhinengjianceloading({
        zhinengjianceloadingTip: '推送数据进入倒计时,请稍后。',
      })
    },3000)
    this.calcLoadAchieveTimer4 = setTimeout(() => {
      this.switchZhinengjianceloading({
        zhinengjianceloadingTip: '推送数据完成。',
      })
    },4000)
    this.calcLoadAchieveTimer5 = setTimeout(() => {
      flag = true;
      this.switchZhinengjianceloading({
        zhinengjianceloadingTip: '推送数据完成。',
        flag: false
      })
      if (this.calcLoadAchieveTimer3) {
        clearTimeout(this.calcLoadAchieveTimer3)
      }
      if (this.calcLoadAchieveTimer4) {
        clearTimeout(this.calcLoadAchieveTimer4)
      }
      if (this.calcLoadAchieveTimer5) {
        clearTimeout(this.calcLoadAchieveTimer5)
      }
      cmtEvents.removeListener('calcLoadAchieve', this.calcLoadAchieve)
    },5000)
  }
  onEventDisconnected = (eventText) => {
    let {
      hangupInfo,
      comingCallInfo,
      comingCallDataSource,
      allMakeAudioCallInfo,
      groupsInfoObj,
      callGroupCurrentSlideSipnum
    } = _.cloneDeep(this.state)
    let {callId} = eventText;
    let item;
    item = allMakeAudioCallInfo.find((item) => {
      return item.result == callId
    })
    if(!item) {
      item = comingCallDataSource.find((item) => {
        return item.callId == callId
      })
    }
    if (item) {
      for (let index = 0; index < groupsInfoObj.panes.length; index++) {
        const element = groupsInfoObj.panes[index];
        if (/(呼叫|视频通话)/ig.test(element.name)) {
          console.error('原来是筛选挂断的人，然后删除掉');
          element.members.forEach((item2) => {
            if(item2.key == item.sipNum) {
              item2['callStatus'] = '已挂断...'
            }
          })
        }
      }
      console.error('注释，可能会出现错误，请查此函数。',groupsInfoObj);
      this.filterAllMakeAudioCallInfoAndComingCallDataSource(item.sipNum)
      this.filterBhComingCallTableData(item.sipNum)
      this.setState((state,props) => {
        return {
          groupsInfoObj
        }
      })
      // this.changeRightTableData()
    }
    item && (item['disConnectTime'] = + new Date());
    item && hangupInfo.push(item)

    comingCallInfo = comingCallInfo.filter((item) => {
      return (item.callId != eventText.callId)
    })
    this.setState((state,props) => {
      return {
        comingCallInfo,
        hangupInfo
      }
    })
  }
  onEventSwitchGroup = (eventText) => {
    let {bSuccess,strIDGroup} = eventText
    if (bSuccess) {
      // *判断显示对讲按钮还是挂断按钮，结束按钮始终显示
      this.showHandDownBtnOrDjBtn({
        strIDGroup
      })
    }
  }
  makeAudioCall = (eventText) => {
    // *存储当前拨打的信息
    let {
      selectList,
      allMakeAudioCallInfo
    } = _.cloneDeep(this.state);
    eventText['sipNum'] = eventText.cmdParam[0];
    allMakeAudioCallInfo.push(eventText)
    this.setState((state,props) => {
      return {
        allMakeAudioCallInfo
      }
    });
    if (this.makeAudioCallCount >= selectList.length) {
      this.makeAudioCallCount = 0;
      this.secCreateNewGroupItem(
        {
          tem_groupName: '呼叫组',
        }
      )
      // this.groupsTabsOnAdd({
      //   emitType: '呼叫',
      // })
    }
  }
  onEventConnected = (eventText) => {
    let {
      allMakeAudioCallInfo,
      comingCallInfo
    } = _.cloneDeep(this.state);
    let {callId,type} = eventText;
    if(allMakeAudioCallInfo.length) {
      for (let i = 0; i < allMakeAudioCallInfo.length; i++) {
        let item = allMakeAudioCallInfo[i];
        if (item.result == callId) {
          this.updateCallingTextTip(item.sipNum)
          break;
        }
      }
    }
    if (comingCallInfo.length) {
      for (let i = 0; i < comingCallInfo.length; i++) {
        let item = comingCallInfo[i];
        if (item.callId == callId) {
          this.updateCallingTextTip(item.sipNum)
          break;
        }
      }
    }

  }
  setMuteEx = (eventText) => {
    let {cmdParam,result} = eventText
    if (result == 0) {
      this.changeRightTablePersonStatus({sipNum:cmdParam[0],changeDumb:true})
      this.changeGroupPersonStatus({sipNum:cmdParam[0],changeDumb:true})
    } else {
      
    }
  }
  newOnEventPttGroup = ({nEvent="",nIDGroup="",strGroup="",bDel="false"}) => {
    console.group('699');
　　console.log(nEvent);
　　console.log(nIDGroup);
　　console.log(strGroup);
　　console.log(bDel);
　　console.groupEnd();
    let {
      isOpenOnOnEventPttGroup,
      dataSource
    } = _.cloneDeep(this.state)
    if (!isOpenOnOnEventPttGroup) {
      return
    }
    if (bDel == "false") {
      let dataSource2 = '';
      dataSource2 = dataSource
      this.createNewGroup({
        nEvent,
        nIDGroup,
        strGroup,
        dataSource: dataSource2
      })
    }
  }
  onEventPttGroup = (eventText) => {
    let {
      nEvent,
      nIDGroup,
      strGroup,
      bDel
    } = eventText
    let {
      isOpenOnOnEventPttGroup,
      dataSource,
      comingCallDataSource,
      comingCallTableData
    } = _.cloneDeep(this.state)
    if (!isOpenOnOnEventPttGroup) {
      return
    }
    if (bDel == "false") {
      console.warn('临时注释');
      // let flag = comingCallDataSource.length;
      let dataSource2 = '';
      // if (flag != 0) {
      //   dataSource2 = comingCallTableData
      // }  else {
      // }
      dataSource2 = dataSource
      this.createNewGroup({
        nEvent,
        nIDGroup,
        strGroup,
        dataSource: dataSource2
      })
    }
  }
  onEventUserStatusUpdate = async (eventText) => {
    let { sipNum, status } = eventText
    switch (this.state.currentTabPane) {
      case 'zzjg':
        let imgStyle = {
          marginLeft: '8px',
          width: '20px',
          height: '20px'
        }
        this.changeSipStatusZzjg({sipNum, status, imgStyle})
        this.changeRightTablePersonStatus({sipNum, status})
        this.changeGroupPersonStatus({sipNum, status})
        break;
      case 'txz':
        let imgStyle2 = {
          marginLeft: '8px',
          width: '20px',
          height: '20px'
        }
        this.changeSipStatus({sipNum, status, imgStyle2})
        this.changeRightTablePersonStatus({sipNum, status})
        this.changeGroupPersonStatus({sipNum, status})
        break;
      default:
        break;
    }
  }
  saveComingCallInfo = async(parameter) => {
    let {eventText} = parameter;
    let {
      comingCallInfo
    } = _.cloneDeep(this.state);
    comingCallInfo.push(eventText);
    await this.setState((state,props) => {
      return {
        comingCallInfo
      }
    })
  }
  saveComingCallEventText = async (parameter) => {
    let {eventText} = parameter;
    let {
      comingCallDataSource
    } = _.cloneDeep(this.state)
    comingCallDataSource.push(eventText)
    await this.setState((state,props) => {
      return {
        isOpenOnOnEventPttGroup: true,
        comingCallDataSource,
        comingCallingFlag: true
      }
    })
  }
  saveComingCallTableData = async(parameter) => {
    let {eventText} = parameter;
    let {
      comingCallTableData,
    } = _.cloneDeep(this.state)
    let key = eventText['sipNum']
    let obj = {
      dumbStatus:"normal"
      ,key
      ,personDumb:this.dumbTip({status:"normal",key})
      ,personLogout:<Icon style={{cursor: 'pointer'}} type="close" />
      ,personName:key
      ,personStatus:"在线"
      ,personType:"未知"
      ,typeCode:""
    }
    comingCallTableData.push(obj)
    await this.setState((state,props) => {
      return {
        comingCallTableData
      }
    })
  }
  comingCall = async (eventText) => {
    let {type,sipNum} = eventText;
    let {
      hangupInfo
    } = _.cloneDeep(this.state);
    let findResult = '';
    if(type == 'video') {
      findResult = hangupInfo.find((item) => {
        return item['sipNum'] == sipNum
      })
    }
    if(findResult) {
      let differTime = ((+ new Date()) - findResult['disConnectTime']) / 1000;
      if(differTime < 1) {
        console.warn('挂断与来电时间小于1s,禁止创建');
        hangupInfo = hangupInfo.filter(item => {
          return item.sipNum != sipNum;
        })
        this.setState((state,props) => {
          return {
            hangupInfo
          }
        })
        return true
      }
    }
    this.setState((state,props) => {
      return {
        emitType: 'comingCall' + type
      }
    })
    await this.saveComingCallInfo({
      eventText
    })
    await this.saveComingCallTableData({
      eventText
    })
    await this.saveComingCallEventText({
      eventText,
    })
    switch(type) {
      case "sosA":
        this.secCreateNewGroupItem({
          tem_groupName:'紧急呼叫组',
          eventText,
          dataSource2: this.state.comingCallTableData
        })
        this.setState((state,props) => {
          return {
            comingCallTableData: []
          }
        })
        break;
      case "audio":
        this.secCreateNewGroupItem({
          tem_groupName:'呼叫组',
          eventText,
          dataSource2: this.state.comingCallTableData
        })
        this.setState((state,props) => {
          return {
            comingCallTableData: []
          }
        })
        break;
      case "video":
        this.secCreateNewGroupItem({
          tem_groupName:'视频通话组',
          eventText,
          dataSource2: this.state.comingCallTableData
        })
        this.setState((state,props) => {
          return {
            comingCallTableData: []
          }
        })
        break;
    }
  }
  hangUpCall = (eventText) => {
    if (!eventText) {
      return
    }
    this.filterAllMakeAudioCallInfoAndComingCallDataSource(eventText.cmdParam[0])
    if (eventText.result) {
      this.setState((state, props) => {
        return {
          comingCall: false,
          isShowHandDownBtn: false,
          callGroupCurrentSlideSipnum: ''
        }
      })
    }
  }
  onEventRecvSMS = (eventText) => {
    if(eventText.type != 'text'){
      return true;
    }
    let {
      alreadySendMsgPersons,
      currentDxAllContent,
      currentExchangeMsgPerson:cemps,
      stageSelectPersonInfo,
      sendSMSInfo,
      dxBoxLeftList
    } = _.cloneDeep(this.state)
    let position = 'person'
    const { from, groupMemSip, content } = eventText
    position = from == groupMemSip ? 'person' : 'group';
    let config = {
      name : '',
      sipNum: '',
      nIDGroup: '',
      members: []
    }
    let alreadyConfig = {
      nIDGroup: from,
      addressee: from,
      addresser: ztConfig.loginSinglePawn,
      currentDxAllContent: []
    }
    let fromObj = {
      nIDGroup: from,
      position,
      sipNum: groupMemSip,
      content: content,
      date: new Date().toLocaleString()
    }
    if (fromObj.position == 'group') {
      config.name = "组" + fromObj.nIDGroup;
      config.nIDGroup = fromObj.nIDGroup
      config.sipNum = ''
      config.members = [fromObj.nIDGroup]
      let res = dxBoxLeftList.findIndex(item => {
        return config.nIDGroup == item.nIDGroup
      })
      if (res == -1) {
        dxBoxLeftList.unshift(config)
      }
    } else {
      config.name = fromObj.sipNum;
      config.sipNum = fromObj.sipNum
      config.nIDGroup = ''
      config.members = []
      let res = dxBoxLeftList.findIndex(item => {
        return config.sipNum == item.sipNum
      })
      if (res == -1) {
        dxBoxLeftList.unshift(config)
      }
    }

    cemps.addressee.some((item) => {
      if (item.sipNum == fromObj.sipNum) {
        fromObj['name'] = item.name
        return true
      }
    })

    let sjr = ''
    if (sendSMSInfo['nIDGroup']) {
      sjr = sendSMSInfo['nIDGroup']
    } else {
      sjr = sendSMSInfo.sipNum
    }
    console.error('此处暂时注释');
    if (fromObj.nIDGroup == sjr) {
      currentDxAllContent.push(fromObj)
    }
    if (alreadySendMsgPersons.length == 0) {
      alreadyConfig.currentDxAllContent.push(fromObj)
      alreadySendMsgPersons.push(alreadyConfig)
    } else {
      let res = alreadySendMsgPersons.find((item) => {
        return item.addressee == from
      })
      if (res) {
        res.currentDxAllContent.push(fromObj)
      } else {
        alreadyConfig.currentDxAllContent.push(fromObj)
        alreadySendMsgPersons.push(alreadyConfig)
      }
    }
    this.setState((state, props) => {
      return {
        currentDxAllContent,
        alreadySendMsgPersons,
        dxBoxLeftList
      }
    })
  }
  sendSMS = (eventText) => {
    /* 
    ~ 发送的消息
    */
    let currentDxAllContent = this.state.currentDxAllContent.slice()
    let alreadySendMsgPersons = this.state.alreadySendMsgPersons.slice()
    let alreadyConfig = {
      addressee: '',
      addresser: ztConfig.loginSinglePawn,
      currentDxAllContent: []
    }
    let currentExchangeMsgPerson = Object.assign({},this.state.currentExchangeMsgPerson)
    const { result, cmdParam } = eventText
    if (result == 0) {
      let sipNum = cmdParam[0]
      let content = cmdParam[1]
      currentExchangeMsgPerson.addressee[0].name = this.state.stageSelectPersonInfo.name
      currentExchangeMsgPerson.addressee[0].sipNum = this.state.stageSelectPersonInfo.sipNum
      console.warn('请及时修改静态数据');
      let fromObj = {
        sipNum: ztConfig.loginSinglePawn,
        to: sipNum,
        content: content,
        date: new Date().toLocaleString()
      }
      currentExchangeMsgPerson.addressee.some((item) => {
        if (item.sipNum == fromObj.sipNum) {
          fromObj['name'] = item.name
          return true
        }
      })
      currentDxAllContent.push(fromObj)
      if (alreadySendMsgPersons.length == 0) {
        alreadyConfig.addressee = sipNum
        alreadyConfig.addresser = ztConfig.loginSinglePawn
        alreadyConfig.currentDxAllContent = currentDxAllContent
        alreadySendMsgPersons.push(alreadyConfig)
      } else {
          let res = alreadySendMsgPersons.find((item) => {
            return item.addressee == sipNum
          })
          if (res) {
            res.currentDxAllContent.push(fromObj)
          } else {
            alreadyConfig.addressee = sipNum
            alreadyConfig.currentDxAllContent.push(fromObj)
            alreadySendMsgPersons.push(alreadyConfig)
          }
      }
      this.setState((state, props) => {
        return {
          currentDxAllContent,
          alreadySendMsgPersons,
          currentExchangeMsgPerson
        }
      })
    }
  }
  createAudioBroadcast =  async(eventText) => {
    await this.secCreateNewGroupItem({tem_groupName:'广播组',eventText:eventText['eventText']})
    // this.groupsTabsOnAdd({
    //   emitType: '广播'
    // })

    this.setState((state, props) => {
      return {
        isCreate: eventText.isCreate
      }
    })
  }
  onEventURLPttGroupNotify = async(eventText) => {
    let {temSaveGroupInfo} = _.cloneDeep(this.state)
    let { msg } = eventText
    if (msg == 'create;group;success') {
      let { newCreateGroupId } = eventText
      // 储存新创建的组id
      console.log(temSaveGroupInfo,1093);
      await this.newOnEventPttGroup({
        nEvent:49,
        nIDGroup:newCreateGroupId,
        strGroup:temSaveGroupInfo.fullName, //组名称
        bDel: "false"
      })
      await this.newOnEventPttGroup({
        nEvent:48,
        nIDGroup:newCreateGroupId,
        strGroup:temSaveGroupInfo.strGroup, //组成员
        bDel: "false"
      })
      await this.changeNewCreateGroupIdArr({
        single: newCreateGroupId,
        push: true
      })
      this.lastCreateNewGroup({
        newCreateGroupId
      })
    } else if(msg == 'drop;group;success') {
      let { deleteGroupId } = eventText
      console.error('此处传参的时候，应注意');
      this.deleteGroup({
        deleteGroupId
      })
      this.checkIsDeleteDxGroup({
        groupID:deleteGroupId
      })
    } else if(msg == 'update;group;success') {
      let { updateGroupId } = eventText
      this.updateGroup({updateGroupId})
    }
    if (msg == 'error') {
      console.error('组消息出现错误.');
    }
    this.detectionGroupPanesAndHideBtn()
  }
  getPttGroupMemberState = (eventText) => {
    let freeTime = '1024'
    let { result } = eventText
    this.axjh()
    // if (result == freeTime) {
    //   this.axjh()
    // } else {
    //   this.applyRights(true)
    // }
    this.setState((state,props) => {
      return {
        axjhFlag: 'cancel'
      }
    })
  }
  // #endregion
  // ?-----------------------------------------------------methods---------------------------
  //#region 
  watchTelSudokuFun = (parameter) => {
    let {
      emitType
    } = parameter;
    switch(emitType) {
      case 'hideTelSudoku':
        console.log(1026,parameter);
        this.setState((state,props) => {
          return {
            isHideTelSudoku: true,
            isOpenBh: false
          }
        })
    }
  }
  checkIsDeleteDxGroup = (parameter) => {
    let {
      groupID
    } = parameter
    let {
      sendSMSInfo,
      dxBoxLeftList,
      temDxBoxLeftList,
      alreadySendMsgPersons,
      currentDxAllContent,
      newAddressee
    } = _.cloneDeep(this.state)
    if(groupID == sendSMSInfo['nIDGroup']) {
      sendSMSInfo = {}
      newAddressee = []
      temDxBoxLeftList = temDxBoxLeftList.filter(item => {
        return item.nIDGroup != groupID
      })
      dxBoxLeftList = dxBoxLeftList.filter(item => {
        return item.nIDGroup != groupID
      })
      alreadySendMsgPersons = alreadySendMsgPersons.filter(item => {
        return item.addressee != groupID
      })
      currentDxAllContent = []
      this.setState((state,props) => {
        return {
          sendSMSInfo,
          dxBoxLeftList,
          temDxBoxLeftList,
          alreadySendMsgPersons,
          currentDxAllContent,
          newAddressee
        }
      })
    }
  }
  clickSearch = (parameter) => {
    let {
      v
    } = parameter;
    let  {
      dxBoxLeftList,
      temDxBoxLeftList
    } = _.cloneDeep(this.state)
    temDxBoxLeftList = []
    if (!v) {
      temDxBoxLeftList = dxBoxLeftList
    } else {
      dxBoxLeftList.forEach(item => {
        let reg = new RegExp(v);
        if (reg.test(item.name)) {
          temDxBoxLeftList.push(item)
        }
      })
    }
    this.setState((state,props) => {
      return {
        temDxBoxLeftList
      }
    })
  }
  clickHead = (parameter) => {
    console.log(parameter,75);
    let {
      sipNum,
      sendSMSInfo
    } = parameter;
    let {
      alreadySendMsgPersons,
      currentDxAllContent
    } = this.state;

    let sjr = ''
    if (sendSMSInfo['nIDGroup']) {
      sjr = sendSMSInfo['nIDGroup']
    } else {
      sjr = sendSMSInfo.sipNum
    }
    this.setState((state,props) => {
      return {
        newAddressee: [sjr],
        sendSMSInfo
      }
    })
    let res = alreadySendMsgPersons.find((item) => {
      return item.addressee == sjr
    })
    if (res) {
      currentDxAllContent = res.currentDxAllContent
    } else {
      currentDxAllContent = []
    }
    this.setState((state,props) => {
      return {
        currentDxAllContent
      }
    })
  }
  sonDxFun = (parameter) => {
    let {type,arg} = parameter;
    switch (type) {
      case 'click-head':
        this.clickHead(arg)
        break;
      case 'click-search':
        this.clickSearch(arg)
        break;
      default:
        break;
    }
  }
  changeModalTitle = (configObj) => {
    console.log(976);
    let {
      modalTitle,
      planId
    } = configObj;
    this.setState({
      modalTitle,
      planId
    })
  }
  updateCallingTextTip = (sipNum) => {
    let {
      groupsInfoObj
    } = _.cloneDeep(this.state)
    console.warn('目前只更新的当前通话组的状态');
    let currentPane = groupsInfoObj.panes.find((item) => {
      return (item.nIDGroup == groupsInfoObj.activeKey && item.name.includes('呼叫'))
    })
    if (currentPane) {
      for (let i = 0; i < currentPane.members.length; i++) {
        const item = currentPane.members[i];
        if (item.key == sipNum) {
          item.callStatus = '通话中...';
          break;
        }
      }
      this.setState((state,props) => {
        return {
          groupsInfoObj
        }
      })
    }
  }
  showConfirm  = (props) => {
    let {
      callbackParams='',
      type=null,
      title="您正在进行一些更新操作。",
      content="请确认您的操作无误.",
      callback=null
    } = props;
    confirm({
      keyboard: false,
      centered: true,
      title,
      content,
      okText:"确认",
      cancelText:"取消",
      className: 'zhdd-index-confirm',
      onOk:() => {
        if (type != null && type == 'dumb') {
          this.state.Mso.setMute(callbackParams.key,callbackParams.flag)
          return
        }
        callback ? callback(callbackParams) : ''
      },
      onCancel:() => {
        console.log('Cancel');
      },
    });
  }
  filterGroupsInfoObjEmptyElement = () => {
    let {
      isShowHandDownBtn,
      groupsInfoObj:{panes}
    } = _.cloneDeep(this.state)
    panes = panes.filter((item) => {
      return (
        item.members.length != 0
      )
    })
    this.setState((state,props) => {
      return {
        isShowHandDownBtn:false,
        groupsInfoObj: Object.assign(state.groupsInfoObj,{panes})
      }
    })
  }
  detectionIsLogin = async (parameter) => {
    let value = window.localStorage.getItem('zhinengjianceloading')
    let zhinengjianceloading;
    if (!value) {
      zhinengjianceloading = true
    } else if(value == 'login-success') {
      zhinengjianceloading = false
    }
    await this.setState((state,props) => {
      return {
        zhinengjianceloading
      }
    })
  }
  switchZhinengjianceloading = (parameter) => {
    let { flag, zhinengjianceloadingTip="加载中"} = parameter;
    this.setState((state,props) => {
      return {
        zhinengjianceloadingTip,
        zhinengjianceloading: flag
      }
    })
  }
  filterBhComingCallTableData = (parameter) => {
    let {
      bHTableData
    } = _.cloneDeep(this.state)
    bHTableData = bHTableData.filter((item) => {
      return item.key != parameter
    })
    this.setState((state,props) => {
      return {
        bHTableData
      }
    })
  }
  filterAllMakeAudioCallInfoAndComingCallDataSource = (parameter) => {
    let {
      comingCallTableData,
      comingCallDataSource,
      allMakeAudioCallInfo
    } = _.cloneDeep(this.state)
    allMakeAudioCallInfo = allMakeAudioCallInfo.filter((item) => {
      return item.sipNum != parameter
    })
    comingCallDataSource = comingCallDataSource.filter((item) => {
      return item.sipNum != parameter
    })
    comingCallTableData = comingCallTableData.filter((item) => {
      return item.key != parameter
    })
    this.setState((state,props) => {
      return {
        comingCallTableData,
        comingCallDataSource,
        allMakeAudioCallInfo
      }
    })
  }        
  detectionGroupPanesAndHideBtn = (parameter) => {
    let {
      groupsInfoObj
    } = _.cloneDeep(this.state)
    if (groupsInfoObj.panes.length == 0) {
      this.setState((state,props) => {
        return {
          isShowAxjhBtnFlag: false,
          isShowHandDownBtn: false,
        }
      })
    }
    this.setState((state,props) => {
      return {
        isOpenBh: false
      }
    })
  }
  showHandDownBtnOrDjBtn = (parameter) => {
    let {strIDGroup} = parameter
    let {
      newCreateGroupInfo,
      groupsInfoObj
    } = _.cloneDeep(this.state)
    if (strIDGroup == groupsInfoObj.activeKey) {
      let current = groupsInfoObj.panes.find((item) => {
        return item.nIDGroup == strIDGroup
      })
      if (current) {
        this.setState((state,props) => {
          return {
            isShowAxjhBtnFlag: false,
            isShowHandDownBtn: false,
          }
        })
        if (/对讲/ig.test(current.name)) {
          this.setState((state,props) => {
            return {
              isShowAxjhBtnFlag: true
            }
          })
        } else if (/呼叫/ig.test(current.name)) {
          let result = current.members.filter(item => {
            return item.callStatus.includes('挂断')
          })
          if(result.length == current.members.length) {
            this.setState((state,props) => {
              return {
                isShowHandDownBtn: false
              }
            })
          }
        } else if(/语音会议/ig.test(current.name)) {
          this.setState((state,props) => {
            return {
              isShowHandDownBtn: true
            }
          })
        }
      }
    }
  }
  filtrationGroupsInfoObj = (parameter) => {
    let {
      newCreateGroupIdArr,
      groupsInfoObj:{panes}
    } = Object.assign({},this.state)
    let newPanes = []
    newCreateGroupIdArr = Array.from(new Set(newCreateGroupIdArr))
    newCreateGroupIdArr.map((item) => {
      panes.find((item2) => {
        if (item == item2.nIDGroup) {
          newPanes.push(item2)
          return item == item2.nIDGroup
        }
      })
    })
    panes = newPanes
    this.setState((state,props) => {
      return {
        groupsInfoObj: Object.assign(this.state.groupsInfoObj,panes)
      }
    })

    this.filterGroupsInfoObjEmptyElement()
  }
  changeNewCreateGroupIdArr = async(parameter) => {
    let {array=[],single="",push=false,remove=false} = parameter
    let {newCreateGroupIdArr} = _.cloneDeep(this.state)
    if (push) {
      newCreateGroupIdArr.push(single)
    } else if(remove) {
      newCreateGroupIdArr = newCreateGroupIdArr.filter((item) => {
        return item != single
      })
    } else {
      if (single) {
        // 改变单个
        newCreateGroupIdArr = newCreateGroupIdArr.filter((item) => {
          return item != single
        })
      } else {
        // 重新赋值
      }
    }
    await this.setState((state, props) => {
      return {
        newCreateGroupIdArr
      }
    })
  }
  applyRights = (parameter) => {
    this.state.Mso.requestPtt(parameter)
  }
  isResetRightTable = () => {
    let {groupsInfoObj, isShowMiddleGroups, checkedKeys } = Object.assign({},this.state)
    if (!isShowMiddleGroups && groupsInfoObj.panes.length == 0 && checkedKeys.length == 0) {
      this.setState((state, props) => {
        return {
          dataSource: []
        }
      })
    }
  }
  updateGroup = async (parameter) => {
    let {updateGroupId} = parameter
    let { willDeletePersonFromGroupInfo:{key,groupID},groupsInfoObj} = Object.assign({},this.state)
    if (updateGroupId == groupID && updateGroupId == groupsInfoObj.activeKey) {
      groupsInfoObj.panes.forEach((item) => {
        if (item.nIDGroup == updateGroupId) {
          item.members = item.members.filter((item2) => {
            return item2.key != key
          })
        }
      })
    } else {
      return
    }
    this.setState((state, props) => {
      return {
        groupsInfoObj,
        willDeletePersonFromGroupInfo: {key:'', groupID: ''},
        callGroupCurrentSlideSipnum: ''
      }
    })
    this.changeRightTableData()
    this.isResetRightTable()
    await this.switchZhinengjianceloading({
      flag: false,
    })
  }
  changeGroupPersonStatus = (parameter) => {
    let { sipNum='',status='',changeDumb=false } = parameter
    let { groupsInfoObj } = Object.assign({},this.state)
    groupsInfoObj.panes.forEach((item => {
      item.members.forEach((item2) => {
        if (item2.key == sipNum) {
          if (changeDumb) {
            let dumbStatus = item2.dumbStatus == 'normal' ? 'dumb' : 'normal'
            item2.dumbStatus = dumbStatus
            item2.personDumb = this.dumbTip({status:dumbStatus,key:item2.key})
          } else {
            item2.personStatus = this.changePersonStatus(status,false)
            // item2.personType = this.changePersonType(item2.typeCode,status,false)
          }
        }
      })
    }))
    this.setState((state,props) =>{
      return {
        groupsInfoObj
      }
    })
  }
  changeRightTablePersonStatus = (parameter) => {
    let { sipNum='',status='',changeDumb=false } = parameter
    let { dataSource } = Object.assign({},this.state)
    if (dataSource.length != 0) {
      for (let index = 0; index < dataSource.length; index++) {
        const item = dataSource[index];
        if (item.key == sipNum) {
          if (changeDumb) {
            let dumbStatus = item.dumbStatus == 'normal' ? 'dumb' : 'normal'
            item.dumbStatus = dumbStatus
            item.personDumb = this.dumbTip({status:dumbStatus,key:item.key})
          } else {
            item.personStatus = this.changePersonStatus(status,false)
            // item.personType = this.changePersonType(item.typeCode,status,false)
          }
        }
      }
      this.setState((state,props) =>{
        return {
          dataSource
        }
      })
    }
  }
  changeRightTableData = async () => {
    let {
      stageNewCreateGroupInfoArray,
      checkedKeys,
      selectList, 
      groupsInfoObj,
    } = _.cloneDeep(this.state)
    if (checkedKeys.length == 0 && selectList.length == 0 && groupsInfoObj.panes.length != 0) {
      let activeKey = groupsInfoObj.activeKey;
      let current;
      current = groupsInfoObj.panes.find((item) => {
        return item.nIDGroup == activeKey 
      })
      if (!current) {
        if (stageNewCreateGroupInfoArray.length) {
          current = stageNewCreateGroupInfoArray.find((item) => {
            if (item.nIDGroup == activeKey) {
              item.status == 'success'
            }
            return item.nIDGroup == activeKey
          })
          groupsInfoObj.panes.push(current)
        }
      }
      if (!current) {
        return
      }
      let dataSource = _.cloneDeep(current).members
      await this.setState((state, props) => {
        return {
          groupsInfoObj,
          dataSource,
        } 
      })
      this.filtrationGroupsInfoObj()
    }
  }
  clearCurrentSelectListAndKeys = () => {
    let currentKeyName = this.state.currentTabPane + 'CheckedKeys'
    this.setState((state,props) => {
      return {
        [currentKeyName]: [],
        checkedKeys: [],
        selectList: []
      }
    })
  }
  startDeleteGroup = async(parameter) => {
    await this.switchZhinengjianceloading({
      zhinengjianceloadingTip: '更新组中...',
      flag: true,
    })
    let groupID = this.state.groupsInfoObj.activeKey
    console.warn('此处不规范，请及时修改');
    if (groupID.length > 15) {
      this.deleteGroup({
        deleteGroupId: groupID
      })
    } else {
      if (groupID) {
        this.state.Mso.deletePttGroupURL(
          ztConfig.ip,
          ztConfig.nPort,
          groupID,
          ztConfig.loginSinglePawn
        )
        this.checkIsDeleteDxGroup({
          groupID
        })
      }
    }
  }
  deleteGroup = async (parameter) => {
    let {deleteGroupId} = parameter
    console.error('此处判断有错误');
    this.state.Mso && this.state.Mso.endPtt(deleteGroupId)
    let groupsInfoObj = {...this.state.groupsInfoObj}
    let deleteGroupIndex = groupsInfoObj.panes.findIndex((item) => {
      return item.nIDGroup == deleteGroupId
    })
    let nextActiveKey;
    if (groupsInfoObj.panes.length > 1) {
      let nextIndex = ((deleteGroupIndex - 1) < 0) ? (deleteGroupIndex - 0 + 1) : (deleteGroupIndex - 1)
      nextActiveKey = groupsInfoObj.panes[nextIndex].nIDGroup
      groupsInfoObj.activeKey = nextActiveKey
    }
    groupsInfoObj.panes = groupsInfoObj.panes.filter((item) => {
      return item.nIDGroup != deleteGroupId
    })
    if (groupsInfoObj.panes.length == 0) {
      groupsInfoObj.newTabIndex = 0
      groupsInfoObj.activeKey = '1'
      this.setState((state, props) =>{
        return {
          groupsInfoObj,
          isShowMiddleGroups: false,
        }
      })
    } else {
      this.setState((state, props) =>{
        return {
          groupsInfoObj,
          isShowMiddleGroups: true,
        }
      })
      this.groupsTabsOnchange(nextActiveKey)
    }
    this.isResetRightTable()
    this.changeNewCreateGroupIdArr({
      single: parameter,
      remove: true
    })
    deleteGroupId
    await this.switchZhinengjianceloading({
      flag: false,
    })
  }
  lastCreateNewGroup = async (parameter) => {
    let {
      groupsInfoObj: gio,
      newCreateGroupInfo: ncgi,
      dxBoxLeftList,
      emitType,
    } = _.cloneDeep(this.state)
    let {newCreateGroupId:nIDGroup} = parameter;
    ncgi.status = 'success';
    console.warn('此处不规范');
    if (emitType == 'call' || emitType == 'comingCall') {
      for (let index = 0; index < ncgi.members.length; index++) {
        const item = ncgi.members[index];
        item['callStatus'] = '连接中...';
      }
    }
    gio.panes.push(ncgi)
    if(ncgi.name.includes('短信')) {
      dxBoxLeftList.unshift(ncgi)
    }
    gio.activeKey = nIDGroup
    await this.setState((state, props) => {
      return {
        isShowMiddleGroups: true,
        groupsInfoObj: {...state.groupsInfoObj,...gio},
        dxBoxLeftList
      }
    })
    this.groupsTabsOnchange(nIDGroup)
    this.clearCurrentSelectListAndKeys()
    this.switchZhinengjianceloading({
      zhinengjianceloadingTip: '创建完成...',
      flag: false,
    })
  }
  createNewGroup = async (parameter) => {
    let {
      comingCallingFlag,
      stageNewCreateGroupInfoArray,
      newCreateGroupInfo: nCGI
    } = _.cloneDeep(this.state)
    let {
      nEvent,
      nIDGroup,
      strGroup,
      dataSource
    } = parameter
    if (nEvent == 49) {
      nCGI['nIDGroup'] = nIDGroup
      nCGI['name'] = strGroup
      if (comingCallingFlag) {
        nCGI['isCalledOrCalling'] = 'Called'
      }
    } else if (nEvent == 48) {
      nCGI['nIDGroup'] = nIDGroup
      nCGI['members'] = []
      for (let index = 0; index < strGroup.split("_").length; index++) {
        const item = strGroup.split("_")[index];
        for (let index2 = 0; index2 < dataSource.length; index2++) {
          const item2 = dataSource[index2];
          if (item == item2.key) {
            nCGI['members'].push(item2)
          }
        }
      }
      stageNewCreateGroupInfoArray.push(nCGI)
    }
    await this.setState((state, props) => {
      return {
        newCreateGroupInfo: nCGI,
        stageNewCreateGroupInfoArray,
        comingCallingFlag: false
      }
    })
  }
  gisCallAudioAndVideoFun = (parameter) => {
    window.callProgram = (configObj) => {
      configObj = JSON.parse(configObj);
      console.log('我是react方法，有人调用了我');
      console.warn('因为暂无定位，且无人员，此处方法暂未编写');
      let { emitType, sipNum } = configObj;
      if (emitType == 'audio') {
        console.log('调用拨打语音电话的函数');
      } else if (emitType == 'video') {
        console.log('调用拨打视频电话的函数');
      }
    }
  }
  stopBroadcast = (configObj) => {
    let {
      groupsInfoObj
    } = _.cloneDeep(this.state)
    let {stopType} = configObj;
    let callId = '';
    let current = groupsInfoObj.panes.find((item) => {
      return item.nIDGroup == groupsInfoObj.activeKey
    })
    if (!current.name.includes('广播')) {
      this.showConfirm({
        content: '请选择广播组'
      })
      return true
    }
    if (stopType == 'audio') {
      callId = current.eventText.result;
      this.state.Mso.hangUpCall(callId);
      this.setState((state,props) => {
        return {
          isCreate: false
        }
      })
    } else {
      
    }
  }
  changeAlertDxBox = (switchFlag) => {
    if (switchFlag == 1) {
      this.setState((state, props) => {
        return {
          isShowDxAlertBox: true
        }
      })
    } else {
      this.setState((state, props) => {
        return {
          isShowDxAlertBox: false
        }
      })
    }
  }
  hyRadioOnChange = e => {
    this.setState((state,props) => {
      return {
        HyRadioValue: e.target.value
      }
    })
  }
  hyHandleUpload = () => {
    let members = "";
    let max = 16;
    let count = 0;
    let siplist = this.state.selectList.slice();
    if (siplist.length > max) {
      //弹出最大支持max人数
    }
    siplist.forEach(element => {
      if (element != "0" && element != ztConfig.loginSinglePawn) {
        //执行功能
        members += "_" + element;
        // members += element;
        count++;
      }
    });

    switch (this.state.HyRadioValue) {
      case 'audio':
        if (count >= 1) {
          this.state.Mso.createAudioMeet(members, 0);
        }
        this.logoutHy()
        break;
      case 'video':
        if (count >= 1) {
          this.state.Mso.createVideoMeet(members, 0);
        }
        this.logoutHy()
      break;
    }
  }
  logoutHy = () => {
    this.setState((state,props) => {
      return {
        isShowHyAlertRadioBox: false
      }
    })
  }
  logoutGb = () => {
    this.setState((state,props) => {
      return {
        isShowGbAlertRadioBox: false
      }
    })
  }
  radioOnChange = e => {
    this.setState((state,props) => {
      return {
        radioValue: e.target.value
      }
    })
  }
  changeSipStatus = (arg) => {
    let { sipNum, status, imgStyle2:imgStyle } = arg
    status -= 0
    let treeData = this.state.treeData.slice()
    for (let index1 = 0; index1 < treeData.length; index1++) {
      let item1 = treeData[index1];
      for (let index2 = 0; index2 < item1.children.length; index2++) {
        let item2 = item1.children[index2];
        if (sipNum == item2.key) {
          item2.status = {status,flag:'update'}
          item2.title = this.statusTip(item2.typeCode,status, item2.personName, item2.key, imgStyle, "", false)
        }
      }
    }
    this.setState((state, props) => {
      return {
        treeData: treeData
      }
    })
  }
  // !deepFor 暂时没有用到
  deepFor = (array,deepForHierarchy,sipNum,status,imgStyle) => {
    !isNaN(this.deepForCount) ? this.deepForCount++ : this.deepForCount = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.children && element.children.length) {
        this.deepFor(element.children,deepForHierarchy);
      } else {
        if (sipNum == element.key && this.deepForCount == deepForHierarchy) {
          element.status = {status,flag:'update'};
          element.title = this.statusTip(element.typeCode,status, element.personName, element.key, imgStyle, "", false);
        }
      }
    }
  }
  changeSipStatusZzjg = (arg) => {
    let { sipNum, status, imgStyle } = arg
    status -= 0
    let treeData = this.state.treeData.slice()
    for (let index1 = 0; index1 < treeData.length; index1++) {
      let item1 = treeData[index1];
      for (let index2 = 0; index2 < item1.children.length; index2++) {
        let item2 = item1.children[index2];
        for (let index3 = 0; index3 < item2.children.length; index3++) {
          let item3 = item2.children[index3];
          if (sipNum == item3.key) {
            item3.status = {status,flag:'update'}
            item3.title = this.statusTip(item3.typeCode,status, item3.personName, item3.key, imgStyle, "", false)
          }
        }
      }
    }
    this.setState((state, props) => {
      return {
        treeData: treeData
      }
    })
  }
  // *groupsFun
  createPttGroupURL = async({emitType,members}) => {
    let strGroupName = `tmp_${emitType}组`
    this.state.Mso.createPttGroupURL(
      ztConfig.ip// strServer,
      ,ztConfig.nPort// nPort,
      ,'0'// *groupID,如果是0,将自动分配组号
      ,strGroupName// strGroupName,
      ,ztConfig.loginSinglePawn// strMySip,
      ,members.join(",")// strMembers
    )
    let temSaveGroupInfo = {
      fullName: strGroupName,
      groupName: `${emitType}组`,
      strGroup: members.join('_')
    }
    await this.setState((state,props) => {
      return {
        temSaveGroupInfo
      }
    })
  }
  groupsTabsOnEdit = (targetKey, action) => {
    switch (action) {
      case 'remove':
        this.groupsTabsOnRemove(targetKey)
        break;
    }
  }
  groupsTabsOnAdd = async (arg) => {
    let { selectList } = _.cloneDeep(this.state)
    if (!selectList.length) {
      return true
    }
    await this.switchZhinengjianceloading({
      zhinengjianceloadingTip: '创建组中...',
      flag: true,
    })
    let { emitType, eventType="",eventText="" } = arg
    let members = [ztConfig.loginSinglePawn];
    if (!eventType) {
      members = [...members,...selectList]
    } else {
      eventText ? (members = [...members,eventText.sipNum]) : ''
    }
    this.createPttGroupURL({emitType,members})
  }
  groupsTabsOnRemove = (targetKey) => {
    let { activeKey } = this.state.groupsInfoObj;
    let lastIndex;
    this.state.groupsInfoObj.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    let panes = this.state.groupsInfoObj.panes.filter(pane => pane.key !== targetKey);  
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState((state, props) => {
      return {
        groupsInfoObj: Object.assign({}, state.groupsInfoObj, { panes, activeKey })
      }
    })
    if (!panes.length) {
      let newTabIndex = 0;
      this.setState((state, props) => {
        return {
          isShowMiddleGroups: false,
          emitType: '',
          groupsInfoObj: Object.assign({}, state.groupsInfoObj, { newTabIndex })
        }
      })
      return
    }
  }
  groupsTabsOnchange = async(activeKey) => {
    let {
      Mso,
      groupsInfoObj
    } = _.cloneDeep(this.state)
    console.warn('此处不规范')
    if (groupsInfoObj.activeKey.length <= 15) {
      Mso.switchGroup(activeKey);
    }
    console.warn('此处判断不规范');
    await this.setState((state, props) => {
      return {
        groupsInfoObj: Object.assign({}, state.groupsInfoObj, { activeKey })
      }
    });
    this.changeRightTableData();
    if (groupsInfoObj.activeKey.length >= 15) {
      this.setState((state,props) => {
        return {
          isShowAxjhBtnFlag: false
        }
      })
    }
  }
  // *upload
  watchFunUpload = async(arg) => {
    let { emitType, gbType } = arg
    let members = ""
    this.state.selectList.map((item) => {
      members += "_" + item
    });
    switch (gbType) {
      case 'audio':
        await this.switchZhinengjianceloading({
          flag: true,
        })
        this.state.Mso.createAudioBroadcast(
          members
          ,0
          ,"audio"
        )
        break;
      case 'file':
      
        break;
    }
  }
  axjh = () => {
    let GroupId = this.state.groupsInfoObj.activeKey
    this.state.Mso.makePttCall(GroupId, 0, 0);
  }
  getGroupStatus = () => {
    let groupID = this.state.groupsInfoObj.activeKey
    this.state.Mso.getPttGroupMemberState(groupID,ztConfig.loginSinglePawn)
  }
  groupWatchFun = (parameter) => {
    if (parameter.item.callStatus && parameter.item.callStatus.includes('连接中')) {
      this.setState((state,props) => {
        return {
          comingCall: true,
        }
      })
    }


    this.setState((state,props) => {
      return {
        callGroupCurrentSlideSipnum: parameter.sipNum,
        isShowHandDownBtn: true
      }
    })
    if (parameter.item.callStatus && parameter.item.callStatus.includes('挂断')) {
      this.setState((state,props) => {
        return {
          isShowHandDownBtn: false
        }
      })
    }
  }
  getSipNumPlace = (parameter) => {
    
  }
  handDownOrUp = (parameter) => {
    let {emitType} = parameter;
    let {
      comingCallDataSource,
      allMakeAudioCallInfo,
      groupsInfoObj,
      callGroupCurrentSlideSipnum
    } = _.cloneDeep(this.state)
    if (!callGroupCurrentSlideSipnum) {
      this.showConfirm({
        content: '请选择人员'
      })
    }
    let callId = '';
    let sipNum = '';
    let current = groupsInfoObj.panes.find((item) => {
      return item.nIDGroup == groupsInfoObj.activeKey
    })
    console.warn('有错误')
    if (current.name.includes('视频通话') || current.name.includes('语音会议')) {
      callId = current.eventText['callId'] || current.eventText['result'];
    } else {
      if (current['isCalledOrCalling'] && (current['isCalledOrCalling']=='Called')) {
        callId = current.eventText['callId'];
      } else {
        allMakeAudioCallInfo.some((item) => {
          if (item.sipNum == callGroupCurrentSlideSipnum) {
            sipNum = item.sipNum;
            callId = item.result
            return true
          }
        })
      }
    }
    if (emitType == 'handUp') {
      this.state.Mso.answerCall(callId,0)
      this.setState((state,props) => {
        return {
          comingCall: false
        }
      })
    } else {
      if (emitType == 'handDown') {
        groupsInfoObj.panes.some(item1 => {
        if (item1.nIDGroup == groupsInfoObj.activeKey) {
            current.members.some((item) => {
              if(item.key == sipNum){
                console.log(1849,sipNum)
                console.log(item)
                item['callStatus'] ? (item['callStatus'] = '已挂断...') : '';
                return true
              }
            })
            return true
          }
        })
        console.error('此处注释挂断');
      }
      this.state.Mso.hangUpCall(callId)
    }
    this.setState((state, props) => {
      return {
        groupsInfoObj,
        onEventConnectedFlag: false
      }
    })
  }
  // *buttons
  watchFun = async (arg) => {
    let {
      isOpenBh,
      bHTableData,
      Mso,
      selectList,
      dataSource
    } = _.cloneDeep(this.state)
    let { emitType, buttonMso, axjhFlag="",tryOpenWs='' } = arg
    let reg = /(call|sp|dj|gb|hy|dw)/;
    if(reg.test(emitType) && (emitType != 'bh' && isOpenBh != true)) {
      if(selectList.length == 0) {
        this.showConfirm({
          content: '请选择人员.'
        })
        return true;
      }
    }
    console.log((reg.test(emitType),2172));
    console.log(emitType,2172);
    console.log(isOpenBh,2172);
    // isBh ? isOpenBh=true: isOpenBh
    await this.setState((state,props) => {
      return {
        Mso: buttonMso
      }
    })
    if (dataSource.length) {
      this.setState((state,props) => {
        return {
          isOpenOnOnEventPttGroup: true
        }
      })
    }
    switch (emitType) {
      case "bh":
        this.setState((state,props) => {
          return {
            isHideTelSudoku: false,
            isOpenBh: true
          }
        })
        break;
      case 'call':
        if (isOpenBh || (this.state.selectList.length && this.state.dataSource.length)) {
          this.setState((state, props) => {
            return {
              emitType: 'call',
              isCalledOrCalling: false
            }
          })
          let siplist = []
          if(bHTableData.length == 0) {
            siplist = this.state.dataSource;
          } else {
            siplist = bHTableData
          }
          this.makeAudioCallCount = 0
          console.log(siplist,this.state.dataSource,'执行2207');
          siplist.map((item) => {
            console.log(item)
            this.makeAudioCallCount++
            let res = this.state.Mso.makeAudioCall(item.key, 0);
            console.log("呼叫res::::", res);
          });
        }
        break;
      case 'sp':
        if (isOpenBh || this.state.dataSource.length) {
          let siplist = []
          if(bHTableData.length == 0) {
            siplist = this.state.dataSource;
          } else {
            siplist = bHTableData
          }
          siplist.map((item) => {
            let res = this.state.Mso.makeVideoCall(item.key, 0, 0);
            console.log("res----", res);
          });
          this.setState((state, props) => {
            return {
              isShowMiddleGroups: true,
              emitType: 'sp'
            }
          })
          await this.secCreateNewGroupItem({tem_groupName:'视频通话组'})
        }
        break;
      case 'dj':
        if (this.state.selectList.length && this.state.dataSource.length) {
          this.setState((state, props) => {
            return {
              emitType: 'dj'
            }
          })
          this.groupsTabsOnAdd({
            emitType: '对讲'
          })
        }
        break;
      case 'gb':
        if (this.state.dataSource.length) {
          this.setState((state, props) => {
            return {
              isShowGbAlertRadioBox: true,
              emitType: 'gb'
            }
          })
        }
        break;
      case 'hy':
        if (this.state.dataSource.length) {
          this.setState((state, props) => {
            return {
              isShowHyAlertRadioBox: true,
              emitType: 'hy'
            }
          })
        }
        break;
      case 'dx':
        let { 
          alreadySendMsgPersons,
          currentExchangeMsgPerson: {addressee}, 
          dataSource,
          currentDxAllContent,
          dxBoxLeftList,
          sendSMSInfo
        } = this.state
        
        if (this.state.dataSource.length) {
          // *多人，先创建组
          if (this.state.dataSource.length > 1) {
            this.setState((state, props) => {
              return {
                emitType: 'dx'
              }
            })
            this.groupsTabsOnAdd({
              emitType: '短信'
            })
          } else {
            // *如果有当前人员，则不再添加
            console.error('2122需要修改');
            let obj = dataSource[0]
            let res = dxBoxLeftList.findIndex(item => {
              return obj.key == item.key
            })
            if (res == -1) {
              dxBoxLeftList.unshift(obj)
            }
          }
          let stageSelectPersonInfo = _.cloneDeep(dataSource)
          await this.setState((state, props) => {
            return {
              stageSelectPersonInfo,
              dxBoxLeftList
            }
          })
          console.error('此处注释，请及时恢复');

          // if (!(addressee[0].sipNum == dataSource[0].key)) {
          //   currentDxAllContent = []
          // }
          let sjr = ''
          if (sendSMSInfo['nIDGroup']) {
            sjr = sendSMSInfo['nIDGroup']
          } else {
            sjr = sendSMSInfo.sipNum
          }
          let res = alreadySendMsgPersons.find((item) => {
            return item.addressee == sjr
          })
          if (res) {
            currentDxAllContent = res.currentDxAllContent
          } else {
            currentDxAllContent = []
          }
        }
        this.setState((state, props) => {
          return {
            currentDxAllContent,
            isShowDxAlertBox: true,
            emitType: 'dx'
          }
        })
        break;
      case 'dw':
        /* 
        * 获取选中人员的电话,单兵号,经纬度
        @名字:name
        @电话:tell,
        @单兵号:sipNum: 88802013
        @经:longitude: xxx
        @纬:latitude: xxx
        @海拔
        */
        /* 
          ~1- 选中人，未选中，给予提示信息
          ~2- 
        */
        let {
          selectList
        } = _.cloneDeep(this.state)
        if (selectList.length == 0) {
          this.showConfirm({
            title: '提示信息：',
            content: '请选择需要定位的人员.',
          })
          return
        }
        let longitude= ''
        let latitude= ''
        let height= ''
        // *暂时，只定位一个人
        // for (let index = 0; index < selectList.length; index++) {
          const sipNum = selectList[0];
          fetch(
          '/zhddzt-zhddzt/api/userapi/gps?action=api&sipnum=' + sipNum,
          {
            method: 'POST'
          }
        ).then((result) => {return result.json()})
        .then(
          (res) => {
            if (res.length == 0) {
              this.showConfirm({
                title: '提示信息：',
                content: `该${sipNum}定位人员无最近定位记录。`,
              })
              return
            }
            let findVal = res.find(item => {
              return item.user == sipNum
            })
            if(findVal) {
              let {
                lon,
                hig,
                lat
              } = findVal
              longitude = lon
              height = hig
              latitude = lat
            } else {
              return true
            }
            if(window.PushData) {
              console.warn('window.PushData');
              let data = {
                sipNum,
                longitude,
                latitude,
                height
              }
              window.PushData("peopleGPS" + "@" + JSON.stringify(data))
            } else if(window.parent.PushData) {
              console.log('window.parent.PushData');
              let data = {
                sipNum,
                longitude,
                latitude,
                height
              }
              window.parent.PushData("peopleGPS" + "@" + JSON.stringify(data))
            }
          },(error) => {
            console.error(error.toString());
            }
          )
        // }
        break;
      case 'js':
        if (this.state.groupsInfoObj.panes.length) {
          this.showConfirm({
            content: '您是要结束当前组吗？',
            callback: this.startDeleteGroup
          })
        }
        break;
      case 'axjh':
        if (this.state.groupsInfoObj.panes.length && this.state.dataSource.length) {
          if (!axjhFlag || axjhFlag == 'cancel') {
            console.warn('此处非法，请及时修改');
            this.applyRights(false)
            // this.axjh()
            this.setState((state,props) => {
              return {
                axjhFlag: 'call'
              }
            })
          } else {
            this.getGroupStatus()
          }
        }
        break;
      case 'handUp':
        this.handDownOrUp({
          emitType: 'handUp'
        })
        break;
      case 'handDown':
        this.handDownOrUp({
          emitType: 'handDown'
        })
        break;
      default:
        this.setState((state, props) => {
          return {
            isShowGbAlertRadioBox: false,
            isShowMiddleGroups: false,
            emitType: ''
          }
        })
        break;
    }

  }
  // * 数组去重
  unique = (array) => {
    return Array.from(new Set(array))
  }
  personType = (typeCode) => {
    switch (typeCode) {
      case 'S8010':
        return '手环'
        break;
      case 'S7010':
        return '安全帽'
      case 'S6010':
        return '单兵'
        break;
      default:
        return '未知'
        break;
    }
  }
  onCheck = async (checkedKeys, info) => {
    let lastSelectList = [];
    let sendSelectList = [];
    let selectList = info.checkedNodes.filter((item) => {
      return ((item.props.children == null || item.props.children.length == 0) == true)
    })
    //#region 
      let personType = function(typeCode) {
        switch (typeCode) {
          case 'S8010':
            return '手环'
            break;
          case 'S7010':
            return '安全帽'
          case 'S6010':
            return '单兵'
            break;
          default:
            return '未知'
            break;
        }
      }
    //#endregion

    // return
    selectList.map((item) => {
      lastSelectList.unshift(item.key)
      sendSelectList.unshift({
        typeCode: item.props.typeCode,
        key: item.key,
        personName: item.props.personName,
        dumbStatus: item.props.isDumb.status,
        personStatus: this.changePersonStatus(item.props.status.status,item.props.status.flag),
        // personType: this.changePersonType(item.props.typeCode,item.props.status.status,item.props.status.flag),
        personType: this.personType(item.props.typeCode),
        personDumb: this.dumbTip({...item.props.isDumb,key:item.key}),
        personLogout: <Icon onClick={this.changePersonPresent.bind(this,'',item.key,'')} style={{cursor: 'pointer'}} type="close" />
      })
    })
    switch (this.state.currentTabPane) {
      case 'zzjg':
        await this.setState((state, props) => {
          return {
            checkedKeys: checkedKeys,
            zzjgCheckedKeys: checkedKeys,
            // zzjgSendSelectLsit: sendSelectList,
            dataSource: sendSelectList,
            temDataSource: sendSelectList,
            selectList: this.unique([...lastSelectList, ...state.txzCheckedKeys, ...state.yjdwCheckedKeys]),
          }
        })
        break;
      case 'txz':
        await this.setState((state, props) => {
          return {
            checkedKeys: checkedKeys,
            txzCheckedKeys: checkedKeys,
            dataSource: sendSelectList,
            temDataSource: sendSelectList,
            selectList: this.unique([...lastSelectList, ...state.zzjgCheckedKeys, ...state.yjdwCheckedKeys]),
          }
        })
        break;
      case 'yjdw':
        await this.setState((state, props) => {
          return {
            checkedKeys: checkedKeys,
            yjdwCheckedKeys: checkedKeys,
            dataSource: sendSelectList,
            temDataSource: sendSelectList,
            selectList: this.unique([...lastSelectList, ...state.zzjgCheckedKeys, ...state.txzCheckedKeys]),
          }
        })
        break;
    }
    if (this.state.checkedKeys.length) {
      switch (this.state.currentTabPane) {
        case 'zzjg':
          await this.setState((state,props) => {
            return {
              zzjgTabIsDisabledFlag: false,
              txzTabIsDisabledFlag: true,
              yjdwTabIsDisabledFlag: true
            }
          })
          break;
        case 'txz':
          await this.setState((state,props) => {
            return {
              zzjgTabIsDisabledFlag: true,
              txzTabIsDisabledFlag: false,
              yjdwTabIsDisabledFlag: true
            }
          })
          break;
        case 'yjdw':
        await this.setState((state,props) => {
            return {
              zzjgTabIsDisabledFlag: true,
              txzTabIsDisabledFlag: true,
              yjdwTabIsDisabledFlag: false
            }
          })
          break;
      }
    } else {
      await this.setState((state,props) => {
        return {
          zzjgTabIsDisabledFlag: false,
          txzTabIsDisabledFlag: false,
          yjdwTabIsDisabledFlag: false
        }
      })
    }
    if (checkedKeys.length == 0 && this.state.groupsInfoObj.panes.length != 0) {
      this.changeRightTableData()
    }
  };
  // *搜索
  async searchFun(event) {
    switch (this.state.currentTabPane) {
      case 'yjdw':
        // *查询队伍
        if (!this.state.expandedKeys.toString().trim()) {
          await this.getTeam()
        } else {
          // *搜索具体某个人
          this.getTeamMember({troopId:this.state.expandedKeys.toString()},event)
        }
        break;
      case 'zzjg':
        await this.getZzjg(event)
        break;
      case 'txz':
        await this.getTxz(event)
        break;
      default:
        console.log('error');
        break;
    }
	}
  // *onExpand
  onExpand = async (expandedKeys) => {
    switch (this.state.currentTabPane) {
      case 'zzjg':
        await this.setState((state, props) => {
          return {
            expandedKeys: expandedKeys,
            zzjgExpandedKeys: expandedKeys
          }
        })
        break;
      case 'txz':
        await this.setState((state, props) => {
          return {
            expandedKeys: expandedKeys,
            txzExpandedKeys: expandedKeys
          }
        })
        break;
      case 'yjdw':
        await this.setState((state, props) => {
          return {
            expandedKeys: expandedKeys,
            yjdwExpandedKeys: expandedKeys
          }
        })
        break;
    }
  }
  statusTipZzjg = (typeCode,status, personName, sipNum, imgStyle, classNames="", isInit=true) => {
    let className = `
    personStatus 
    ${classNames}
    ${this.nameColor(status,isInit)}
    `
    let title = () => {
      return (
        <div>
          <span className={className}>{personName}({sipNum})</span>
          <img style={ imgStyle } src={this.imgSrc(typeCode,status,isInit)} />
        </div>
      )
    }
    return title()
  }
  // *请求组织机构
  getZzjg = async (name='') => {
    // *开启加载动画
    await this.setState((state, props) => {
      return {
        loading: true
      }
    })
    let reqUrl;
    let setExpandedKeys = [];
    if (name) {
      reqUrl = '/nelda-basics/public/pubPersonEquipment/getDataQuery?name=' + name
    } else {
      reqUrl = '/nelda-basics/public/pubPersonEquipment/getDataQuery?'
    }
    fetch(reqUrl,{
      method: 'POST',
    })
    .then((res) => {return res.json()})
    .then(async (result) => {
      let personList = []
      let {code,msg,data} = result
      if (code==-1 || msg=='数据请求异常' || data == null) {
        return
      }
      let imgStyle = {
        marginLeft: '8px',
        width: '20px',
        height: '20px'
      }
      let treeZzjgList = []
      let lastTreeZzjgList = []
      let items = result.data.list
      //~ 如果有数据
      if (items) {
        for (let index1 = 0; index1 < items.length; index1++) {
          const item = items[index1];
          let obj = {
            checkable: true,
            disabled: false,
            title: `${item.name}`,
            key: `${ item.id }`,
            children: []
          }
          // ~ 如果公司有部门
          if (item.deptList) {
            for (let index2 = 0; index2 < item.deptList.length; index2++) {
              const item2 = item.deptList[index2];
              let obj2 = {
                checkable: true,
                disabled: false,
                title: `${item2.deptName}`,
                fatherKey: `${ item.id }`,
                key: `${item2.deptId}`,
                children: []
              }
              if (item2.personList) {
                for (let index3 = 0; index3 < item2.personList.length; index3++) {
                  const item3 = item2.personList[index3];
                  
                  let title = `${item3.personName}`
                  let codeArr = []
                  let typeCode = ''
                  let status
                  if (item3.equipmentList) {
                    for (let index = 0; index < item3.equipmentList.length; index++) {
                      const item = item3.equipmentList[index];
                      codeArr.push(item.equipmentCode)
                      item3['equipmentCode'] = item.equipmentCode
                      typeCode = item.typeCode
                    }
                    personList.push(item3)
                    let fetchUrl = `/zhddzt-zhddzt/smallApps/getUserDevInfo?sips=${codeArr.join()}&type=DevStatus`
                    let res = await fetch(fetchUrl,{
                      method: 'POST'
                    })
                    let response = await res.json()
                    if ((response.data.length == 0) || (response.data[0]['online'] == 0)) {
                      item2.personState = -1
                      status = -1
                    } else {
                      item2.personState = 0
                      status = 0
                    }                  
                  } else {
                    continue;
                  }
                  let obj3 = {
                    typeCode: typeCode,
                    personName: `${item3.personName}`,
                    status: {status,flag:'init'},
                    isDumb: {status: 'normal',flag:'init'},
                    title: this.statusTip(typeCode,status, item3.personName, codeArr.join(),imgStyle),
                    grandFatherKey: `${ item.id }`,
                    fatherKey: `${item2.deptId}`,
                    key: `${codeArr.join()}`
                  }
                  obj2.children.push(obj3)
                }
                this.setState((state,props) => {
                  return {
                    personList
                  }
                })
                obj.children.push(obj2)
              }
            }
            treeZzjgList.push(obj)
            lastTreeZzjgList = treeZzjgList.filter((item) => {
              return item.children.length != 0
            })
          } else {
            continue;
          }
        }
      } else {
        return
      }
      lastTreeZzjgList.forEach((item) => {
        item.children = item.children.filter((item2) => {
          return item2.children.length != 0
        })
      })
      lastTreeZzjgList = lastTreeZzjgList.filter((item) => {
        return item.children.length != 0
      })
      if (name) {
        let regexp = new RegExp(`${name}`,"ig")
        function deepFind(array) {
          array.find((item) => {
            if (item.children && item.children != 0) {
              deepFind(item.children)
            } else {
              if (
                item.personName 
                && item.fatherKey 
                && (
                  regexp.test(item.personName) || regexp.test(item.key)
                )) {
                setExpandedKeys.push(item.fatherKey)
              }
            }
          })
        }
        deepFind(lastTreeZzjgList)
      }
      // *关闭加载动画
      this.setState((state, props) => {
        return {
          loading: false
        }
      })
      this.setState((state, props) => {
        return {
          expandedKeys: setExpandedKeys,
          treeData: lastTreeZzjgList
        }
      })
    }
    ,
    (error) => {
      console.warn(error.name);
    }
    )
  }
  changePersonType = (typeCode,status,flag) => {
    return (
      <img 
      style={{width:18,height:18}} 
      className="personType" 
      src={this.imgSrc(
        typeCode,
        status,
        flag
      )} 
      alt=""/>
    )
  }
  changePersonStatus = (status,isInit) => {
    status = status - 0
    if (isInit == 'init') {
      switch (status) {
        case -1:
          return "离线"
        case 0:
          return "在线"
        case 1:
          return "繁忙"
        case 2:
          return "繁忙"
        case 4:
          return "离线"
        case 8:
          return "繁忙"
        default:
          return "繁忙"
      }
    } else {
      switch (status) {
        case -1:
          return "离线"
        case 0:
          return "离线"
        case 1:
          return "在线"
        case 2:
          return "离线"
        default:
          return "繁忙"
      }
    }
  }
  // *禁言
  changePersonDumb = (obj) => {
    let {status,key} = obj
    let {isShowMiddleGroups,groupsInfoObj} = Object.assign({},this.state)
    if(isShowMiddleGroups && groupsInfoObj.panes.length != 0) {
      switch (status) {
        case 'dumb':
          this.showConfirm({
            content:`您是否要恢复${key}此人员话语权?`,
            type: 'dumb',
            callbackParams: {
              key,
              flag: false
            }
          })
          break;
        case 'normal':
          this.showConfirm({
            content:`您是否要禁言${key}此人员话语权?`,
            type: 'dumb',
            callbackParams: {
              key,
              flag: true
            }
          })
          break;
      }
    }
  }
  kickOut = async(params) => {
    let {members,parameter,groupsInfoObj,groupName} = params;
    await this.switchZhinengjianceloading({
      zhinengjianceloadingTip: '更新组中...',
      flag: true,
    })
    let newMembers = []
    members.forEach((item) => {
      if(item.key != parameter) {
        newMembers.push(item.key)
      }
    })
    console.warn('请及时修改此处。');
    let willDeletePersonFromGroupInfo = {
      key: parameter,
      groupID: groupsInfoObj.activeKey
    }
    await this.setState((state, props) => {
      return {
        willDeletePersonFromGroupInfo,
      }
    })
    if (!newMembers.length) {
      this.startDeleteGroup()
    } else {
      this.state.Mso.modifyPttGroupURL(
        ztConfig.ip,
        ztConfig.nPort,
        groupsInfoObj.activeKey,
        groupName.substr(-3,3),
        ztConfig.loginSinglePawn,
        newMembers.join(",")
      )
    }
  }
  // *请出
  changePersonPresent = async (that,parameter,hangDown="") => {
    let {isShowMiddleGroups,groupsInfoObj} = Object.assign({},this.state)
    if (isShowMiddleGroups && groupsInfoObj.panes.length != 0) {
      let { name:groupName,members } = groupsInfoObj.panes.find((item) => {
        return item.nIDGroup == groupsInfoObj.activeKey
      })
      if (hangDown) {
        await this.kickOut(
          {
            members,
            parameter,
            groupsInfoObj,
            groupName
          }
        )
      } else {
        this.showConfirm(
          {
            content: `您确认踢出号码为${parameter}人员`,
            callback: this.kickOut,
            callbackParams:{
              members,
              parameter,
              groupsInfoObj,
              groupName
            }
          }
        )
      }
    }
  }
  // *表格列表人员类型提示
  typeTip = (parameter) => {
    switch (parameter) {
      case 0:
        return <IconFont type="icon-shebei" />
        break;
      case 1:
        return <IconFont type="icon-danbingshuru" />
        break;
      default:
        break;
    }
  }
  // *表格列表人员是否禁声提示
  dumbTip = (parameter) => {
    let {status,key} = parameter
    switch (status) {
      case 'dumb':
        return  <IconFont onClick={this.changePersonDumb.bind(this,{status,key})} style={{ cursor: 'pointer', fontSize: '16px', color: 'grey' }} type="icon-jinyan-audiostatic" />
        break;
      case 'call':
        return  <IconFont onClick={this.changePersonDumb.bind(this,{status,key})} style={{ cursor: 'pointer', fontSize: '16px', color: 'red' }} type="icon-yuyin" />
        break;
      case 'normal':
        return  <IconFont onClick={this.changePersonDumb.bind(this,{status,key})} style={{ cursor: 'pointer', fontSize: '16px', color: '#1AA094' }} type="icon-yuyin" />
        break;
      default:
        return  <IconFont onClick={this.changePersonDumb.bind(this,{status,key})} style={{ cursor: 'pointer', fontSize: '16px', color: '#1AA094' }} type="icon-yuyin" />
        break;
    }
  }
  imgStatus = (currentStatus,typeCode) => {
    switch (currentStatus) {
      case 'offline':
        switch (typeCode) {
          case 'S8010':
            return OffLineBracelet
            break;
          case 'S7010':
            return OffLineHat
            break;
          case 'S6010':
            return OffLineMobile
            break;
          default:
            return OffLineComputer
            break;
        }
        break;
      case 'online':
        switch (typeCode) {
          case 'S8010':
            return OnLineBracelet
            break;
          case 'S7010':
            return OnLineHat
            break;
          case 'S6010':
            return OnLineMobile
            break;
          default:
            return OnLineComputer
            break;
        }
        break;
      case 'call':
        switch (typeCode) {
          case 'S8010':
            return CallBracelet
            break;
          case 'S7010':
            return CallHat
            break;
          case 'S6010':
            return CallMobile
            break;
          default:
            return CallComputer
            break;
        }
        break;
    }
  }
  // *树形人员状态提示
  imgSrc = (typeCode,status,isInit) => {
    status -= 0;
    let currentStatus = ''
    if (isInit) {
      switch (status) {
        case -1:
          currentStatus = 'offline'
          break;
        case 0:
          currentStatus = 'online'
          break;
        case 1:
          currentStatus = 'call'
          break;
        case 2:
          currentStatus = 'call'
          break;
        case 4:
          currentStatus = 'offline'
          break;
        case 8:
          currentStatus = 'call'
          break;
        default:
          currentStatus = 'call'
          break;
      }
    } else {
      switch (status) {
        case -1:
          currentStatus = 'offline'
          break;
        case 0:
          currentStatus = 'offline'
          break;
        case 1:
          currentStatus = 'online'
          break;
        case 2:
          currentStatus = 'offline'
          break;
        default:
          currentStatus = 'call'
          break;
      }
    }
    return this.imgStatus(currentStatus,typeCode)
  }
  nameColor = (status,isInit) => {
    if (isInit) {
      switch (status) {
        case -1:
          return "offLineGray"
        case 0:
          return "onlineBlue"
        case 1:
          return "callRed"
        case 2:
          return "callRed"
        case 4:
          return "offLineGray"
        case 8:
          return "callRed"
        default:
          return "callRed"
      }
    } else {
      switch (status) {
        case -1:
          return "offLineGray"
        case 0:
          return "offLineGray"
        case 1:
          return "onlineBlue"
        case 2:
          return "offLineGray"
        default:
          return "callRed"
      }
    }
  }
  /* 
  @status: Number
  */
  statusTip = (typeCode,status, personName, sipNum, imgStyle, classNames="", isInit=true) => {
    status = status - 0;
    let className = `
    personStatus 
    ${classNames}
    ${this.nameColor(status,isInit)}
    `
    let title = () => {
      return (
        <div>
          <span key={sipNum} className={className}>{personName}({sipNum})</span>
          <img style={ imgStyle } src={this.imgSrc(typeCode,status,isInit)} />
        </div>
      )
    }
    return title()
  }
  // *请求通讯组
  getTxz = async (name='') => {
    // *开启加载动画
    await this.setState((state, props) => {
      return {
        loading: true
      }
    })
    let reqUrl;
    let setExpandedKeys = [];
    if (name) {
      reqUrl = 'http://192.168.1.136:8098/yjzhYjzhDistributionGroup/getDistributionGroupByPersonName?personName=' + name
    } else {
      reqUrl = 'http://192.168.1.136:8098/yjzhYjzhDistributionGroup/getDistributionGroupTree'
    }
    fetch(reqUrl,{
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then((res) => {return res.json()})
    .then(async (result) => {
      let imgStyle = {
        marginLeft: '8px',
        width: '20px',
        height: '20px'
      }
      let treeTeamList = []
      if (result.status && result.status != 200) {
        return
      }
      for (let index = 0; index < result.length; index++) {
        let item = result[index];
        let obj = {
          checkable: true,
          disabled: false,
          title: `${item.personName}`,
          key: `${item.id}`,
          children: []
        }
        if (item.children) {
          for (let index2 = 0; index2 < item.children.length; index2++) {
            let item2 = item.children[index2];
            let status = -1;
            let fetchUrl = `/zhddzt-zhddzt/smallApps/getUserDevInfo?sips=${item2.individualNumber}&type=DevStatus`
            let res = await fetch(fetchUrl,{
              method: 'POST'
            })
            let response = await res.json()
            if ((response.data.length == 0) || (response.data[0]['online'] == 0)) {
              item2.personState = -1
              status = -1
            } else {
              item2.personState = 0
              status = 0
            }
            let obj2 = {
              typeCode: item2.typeCode,
              personName: `${item2.personName}`,
              status: {status,flag:'init'},
              isDumb: {status: 'normal',flag:'init'},
              title: this.statusTip(item2.typeCode,status, item2.personName, item2.individualNumber,imgStyle),
              fatherKey: `${item.id}`,
              key: `${item2.individualNumber}`
            }      
            obj.children.push(obj2)
          }
          treeTeamList.push(obj)
        }
        
      }
      if (name) {
        let regexp = new RegExp(`${name}`,"ig")
        function deepFind(array) {
          array.find((item) => {
            if (item.children && item.children != 0) {
              deepFind(item.children)
            } else {
              if (
                item.personName 
                && item.fatherKey 
                && (
                  regexp.test(item.personName) || regexp.test(item.key)
                )) {
                setExpandedKeys.push(item.fatherKey)
              }
            }
          })
        }
        deepFind(treeTeamList)
      }
      // *关闭加载动画
      await this.setState((state, props) => {
        return {
          loading: false
        }
      })
      
      this.setState((state, props) => {
        return {
          expandedKeys:setExpandedKeys,
          treeData: treeTeamList
        }
      })
    },(error) => {
      console.log(error, 'error');
    })
  }
  // *请求应急队伍 
  getTeam = async () => {
    // *开启加载动画
    await this.setState((state, props) => {
      return {
        loading: true
      }
    })
    console.error('此处的请求事件ID和电站ID写死状态, 请更改，请更改。');
    let body = {
      keyId: 0,
      pageIndex: 0,
      pageSize: 0,
      powerStationId: this.state.suddenEventInfo.powerStationId,
      suddenEventId: this.state.suddenEventInfo.actDeskId
    }
    let res =  await fetch('/zhdd-zhdd/yjzhYjzhSuddenEventResourceDispatch/getSuddenEventRelaTroopList',{
      method: 'POST',
      body: JSON.stringify(body)
    })
    let res2 = await res.json()
    if (res2.successful) {

      let treeTeamList = []
      let treeTeamTroopIdArray = []
      let items = res2.resultValue.items.slice()
      if (items.length == 0) {
        this.emptyTreeData()
        return true;
      }
      items.map((item) => {
        let obj = {
          checkable: true,
          disabled: false,
          title: `${item.troopName}`,
          key: item.troopId,
          children: []
        }
        treeTeamList.push(obj)
        treeTeamTroopIdArray.push({
          powerStationId:item.powerStationId,
          troopId:item.troopId})
      })
      await this.setState((state, props) => {
        return {
          treeData: treeTeamList,
          treeTeamTroopIdArray: treeTeamTroopIdArray
        }
      })
    }
  }
  emptyTreeData = (parameter) => {
    let treeData = [
      {
        checkable: false,
        disabled: true,
        title: '暂无数据',
        key:'nodata'
      }
    ]
    this.setState((state, props) => {
      return {
        loading: false,
        treeData: treeData,
      }
    })
  }
  // *请求应急队伍人员
  getTeamMember = async (troopObj,personName="",expandAllNode) => {
    let {troopId="",powerStationId=""} = troopObj
    let body = {
      personName: personName,
      pageIndex: 0,
      pageSize: 0,
      powerStationId: powerStationId,
      troopId: troopId,
    }
    let res = await fetch('/zhdd-zhdd/yjzhYjjyEmergencyTroopPerson/getEmergencyTroopPersonList',{
      method: 'POST',
      body: JSON.stringify(body)
    })
    let result = await res.json()
    let {
        treeData
    } = _.cloneDeep(this.state)
    let treeTeamList = []
    let items = result.resultValue.items
    treeData.forEach(item => {
      if(item.key == troopId) {
        item.children = items
      }
    })
    let imgStyle = {
      marginLeft: '8px',
      width: '20px',
      height: '20px'
    }
    for (let index = 0; index < items.length; index++) {
      let item = items[index];
      console.warn('写死的静态数据');
      item['individualNumber'] = item.portableSoldierNo;
      item['typeCode'] = 'S8010';
      let status
      let fetchUrl = `/zhddzt-zhddzt/smallApps/getUserDevInfo?sips=${item.individualNumber}&type=DevStatus`
      let res = await fetch(fetchUrl,{
        method: 'POST'
      })
      let response = await res.json()
      if ((response.data.length == 0) || (response.data[0]['online'] == 0)) {
        item.personState = -1
        status = -1
      } else {
        item.personState = 0
        status = 0
      }
      let obj = {
        typeCode: item['typeCode'],
        title: this.statusTip(
          item['typeCode'],
          status,
          item.personName,
          item.individualNumber,
          imgStyle
        ),
        personName : item.personName,
        status: {status,flag: 'init' },
        isDumb: {status: 'normal',flag:'init'},
        fatherKey: `${item.troopId}`,
        key: item.individualNumber,
      }
      treeTeamList.push(obj)
    }
    // *查找队伍，然后赋予其children
    let teamArray = treeData
    let lastTreeData = []
    teamArray.map((item) => {
      if (item.key == troopId) {
        if (treeTeamList.length && treeTeamList[0].key == "000") {
          item.selectable = false,
          item.disabled = true
        } else {
          item.selectable = true,
          item.disabled = false
        }
        item.children = treeTeamList
      }
      lastTreeData.push(item)
    })
    this.yjdwIndex++
    if (this.yjdwIndex == this.yjdwLength) {
        treeData = treeData.filter((item) => {
          return item.children.length != 0
        })
        
        if (treeData.length == 0) {
          treeData = [
            {
              checkable: false,
              disabled: true,
              title: '暂无数据',
              key:'nodata'
            }
          ]
        }
        await this.setState((state, props) => {
          return {
            loading: false
          }
        })
    }
    await this.setState((state, props) => {
        return {
          treeData: treeData,
        }
    })
  }
  // *tabClick
  onTabClick = async (arg) => {
    if (this.state.checkedKeys.length) {
      message.error("请取消当前所有选中项。")
      return true
    }
    await this.setState((state, props) => {
      return {
        currentTabPane: arg,
        expandedKeys: state[`${arg}ExpandedKeys`],
        checkedKeys: state[`${arg}CheckedKeys`]
      }
    })
    if (arg == 'zzjg') {
      await this.getZzjg()
    }
    if (arg == 'txz') {
      await this.getTxz()
      // await this.changeTxzTree()
    }
    if (arg == 'yjdw') {
      await this.getTeam()
      let {
        treeData,
        treeTeamTroopIdArray
      } = _.cloneDeep(this.state)
      let idArr = treeTeamTroopIdArray
      this.yjdwIndex = 0;
      this.yjdwLength = idArr.length;
      for (let index = 0; index < idArr.length; index++) {
        let item = idArr[index]
        await this.getTeamMember({
          troopId:item.troopId,
          powerStationId:item.powerStationId
        })
      }
    }
    await this.setState((state, props) => {
      return {
        currentTabPane: arg
      }
    })
    
  }
  changeShowAlertVueBoxFlag = flag => {
    this.setState({
      isShowAlertVueBoxFlag: flag
    });
  };
  //#endregion
  // ? ----------------------------------------------------render-------------------------------
  render() {
    let tanPaneHeight = 'calc(95vh - 284px)';
    const hyAlertRadioBox = () => {
      if (this.state.isShowHyAlertRadioBox) {
        return(
          <div className="alertGbBox">
            <Radio.Group onChange={this.hyRadioOnChange} value={this.state.HyRadioValue}>
              <Radio value={"audio"}>语音会议</Radio>
              {/* <Radio value={"video"}>视频会议</Radio> */}
            </Radio.Group>
            <div className="buttonBox">
            <Button
              type="primary"
              onClick={this.hyHandleUpload}
              style={{ marginTop: 16, marginRight: 16 }}
            >
              确定
            </Button>
            <Button
              onClick={this.logoutHy}
              type="primary"
            >
              退出
            </Button>
            </div>
          </div>
        )
      } else {
        return null
      }
    }
    const gbAlertRadioBox = () => {
      if (this.state.isShowGbAlertRadioBox) {
        return(
          <div className="alertGbBox">
            <Radio.Group onChange={this.radioOnChange} value={this.state.radioValue}>
              <Radio value={"audio"}>语音广播</Radio>
              {/* <Radio value={"file"}>文件广播</Radio> */}
            </Radio.Group>
            <div className="fileUrlBox">
              <MyUpload
                stopBroadcast={this.stopBroadcast}
                isCreate={this.state.isCreate}
                watchFunUpload={ this.watchFunUpload } 
                disabledUpload={this.state.radioValue == 'audio'}
                logoutGb={this.logoutGb}
              ></MyUpload>
            </div>
          </div>
        )
      } else {
        return null
      }
    }
    const SearchInput = (props) => {
      return (
        <div className="searchDiv">
					<Search onSearch={this.searchFun.bind(this)} className="searchInput" placeholder={ props.placeholder }/>
				</div>
      )
    }
    const NewTree = () => {
      if (!this.state.loading) {
        return (
          <Tree
            expandedKeys={ this.state.expandedKeys }
            onExpand={ this.onExpand }
            checkedKeys={ this.state.checkedKeys }
            onCheck={ this.onCheck }
            showLine
            checkable
            treeData={ this.state.treeData }
          />
        )
      } else {
        return (
          <Spin tip="信息加载中..." spinning={this.state.loading}></Spin>
        )
      }
    }
    const isShowEmergencyTeam = () => {
      if (this.state.suddenEventInfo) {
        return (
          // <TabPane disabled={this.state.yjdwTabIsDisabledFlag} className="tabs tab-title" tab="应急队伍" key="yjdw">
          <TabPane disabled={this.state.checkedKeys.length != 0} className="tabs tab-title" tab="应急队伍" key="yjdw">
              <div
                className="tabs-content yjdw"
                style={ 
                  {
                    height:  tanPaneHeight
                  }
                }
              >
                <SearchInput
                placeholder="请输入队伍人员名称"
                ></SearchInput>
                <NewTree></NewTree>
              </div>
            </TabPane>
        )
      } else {
        return null
      }
    }
    const isShowMiddleGroups = () => {
      if (this.state.isShowMiddleGroups && this.state.groupsInfoObj.panes.length) {
        return (
          <div className="middle-bottom-box">
            <Groups 
            groupWatchFun={this.groupWatchFun}
            groupsTabsOnEdit={ this.groupsTabsOnEdit }
            groupsTabsOnchange={ this.groupsTabsOnchange }
            panes={ this.state.panes }
            groupsInfoObj={ this.state.groupsInfoObj }>
            </Groups>
          </div>
        )
      } else {
        return (
          null
        )
      }
    }
  // ?----------------------------------------------------return--------------------------------
  return (
      <div className="person equipment x-person-equipment">
        <Spin size="large" tip={this.state.zhinengjianceloadingTip} spinning={this.state.zhinengjianceloading}>
          <div className="title">指挥调度</div>
          <div className="searchPrompt">
            <Tabs 
              defaultActiveKey="1" 
              className="tabs"
              onTabClick={this.onTabClick}
            >
              <TabPane disabled={this.state.checkedKeys.length != 0}  className="tab-title" tab="组织机构" key="zzjg">
                <div
                  className="tabs-content zzjg"
                  style={ 
                    {
                      height: '100%'
                    }
                  }
                >
                  <SearchInput
                  placeholder="请输入人员名称"
                  ></SearchInput>
                  <NewTree></NewTree>
                </div>
              </TabPane>
              <TabPane disabled={this.state.checkedKeys.length != 0}  className="tabs tab-title" tab="通讯组" key="txz">
                <div
                  className="tabs-content"
                  style={ 
                    {
                      height:  tanPaneHeight
                    }
                  }
                >
                  <SearchInput
                  placeholder="请输入人员名称"
                  ></SearchInput>
                  <NewTree></NewTree>
                </div>
              </TabPane>
              { isShowEmergencyTeam() }
            </Tabs>
          </div>
          <div>
            <Buttons 
            comingCallInfo={this.state.comingCallInfo}
            switchZhinengjianceloading={this.switchZhinengjianceloading}
            isShowAxjhBtnFlag={this.state.isShowAxjhBtnFlag}
            onEventConnectedFlag = {this.state.onEventConnectedFlag}
            isShowHandDownBtn={this.state.isShowHandDownBtn}
            axjhFlag={this.state.axjhFlag}
            comingCall={ this.state.comingCall }
            groupsInfoObj={ this.state.groupsInfoObj } 
            // selectList={ this.state.selectList } 
            watchFun={ this.watchFun } 
            />
          </div>
          {
            this.state.isShowDxAlertBox 
            ? <AlertDxBox 
            personList={this.state.personList}
              alreadySendMsgPersons={this.state.alreadySendMsgPersons}
              temDxBoxLeftList={this.state.temDxBoxLeftList}
              sendSMSInfo={this.state.sendSMSInfo}
              newAddressee={this.state.newAddressee}
              sonFun={this.sonDxFun}
              dxBoxLeftList={this.state.dxBoxLeftList}
              currentDxAllContent={ this.state.currentDxAllContent }
              Mso={this.state.Mso}
              addressee={this.state.stageSelectPersonInfo}
              changeAlertDxBox={this.changeAlertDxBox}>
              </AlertDxBox> 
            : null
          }
          <AlertVueInfo
          planId = {this.state.planId}
          modalTitle = {this.state.modalTitle}
          cancelFun={this.changeShowAlertVueBoxFlag}
          visible={this.state.isShowAlertVueBoxFlag}
          ></AlertVueInfo>
          { hyAlertRadioBox() }
          { gbAlertRadioBox() }
          { isShowMiddleGroups() }
          <div className="right_button">
          <Right 
            // changeModalTitle = {this.changeModalTitle}
            // fun={this.changeShowAlertVueBoxFlag}
            suddenEventInfo={ this.state.suddenEventInfo } 
            columns={ this.state.columns }
            dataSource={ this.state.dataSource }
          />
        </div>
        </Spin>
        <TelSudoku secBh={this.secBh} isHideTelSudoku={this.state.isHideTelSudoku} watchTelSudokuFun={this.watchTelSudokuFun}></TelSudoku>
      </div>
    );
  }
}
// ~ --------------------------------------------------export default-------------------
export default Zhihuidiaodu;

