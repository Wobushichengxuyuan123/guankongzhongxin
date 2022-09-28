/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import {connect} from 'react-redux'
import cmtEvents from '../../utils/cmtEvents';
import Buttons from "./components/buttons";
import TabTree from "./components/tree";
import Search from "./components/search";
import TelSudoku from "./components/telSudoku";
import { Tabs, message } from "antd";
import { treeDataHandleFun } from '../../utils/treeDataFun'
import GetZhddXianHelper from'../../utils/zhdd_xian'
import { initSipNumOffline,updateSipNumStatus } from '../../utils/renderTitleAndStatus'
import {lastTreeData, orgTreeData, communicationTreeData, accountTreeData} from './testTree'
import { setIscRelationMemberInfo } from "../../redux/redux_utils";
import { AddStatusAction } from "../../redux/dispatch_action";
const { TabPane } = Tabs;
class left extends Component {
  constructor(props) {
    super(props);
    this.cmt = null;
    this.timerArr = [];
    this.onSearchFlag = false;


    this.tabsRef = React.createRef();
    this.buttonsRef = null;
    this.setButtonsRef = (e) => {
      this.buttonsRef = e;
    };
    this.state = {
      cmtEventNameArr: ['cleanTreeChecked','deleteOfflineCheck','updateSingleSipNumStatus'],
      tabsKey: "organization",
      treeData: [],
      checkedNodes: [],
      checkedKeys: [],
      tabPaneList: [
        { tab: '组织机构', key: 'organization', placeholder: "请输入人员名称" },
        { tab: '通信组', key: 'communication', placeholder: "请输入人员名称" },
        { tab: '应急队伍', key: 'troop', placeholder: "请输入人员名称" },
        { tab: '通讯设备', key: 'callDevice', placeholder: "请输入人员名称" },
      ],
    };
  }
  timerHandle = ({type='add',timerId=''}={}) => {
    switch (type) {
      case 'add':
        {
          this.timerArr.push(timerId);
        }
        break;
      case 'delete':
        {
          timerId&&window.clearTimeout(timerId)
          this.timerArr = this.timerArr.filter(v => v!=timerId);
        }
        break;
      case 'componentWillUnmount':
        {
          this.timerArr.some(v => {
            v&&window.clearTimeout(v);
          });
          this.timerArr = [];
        }
        break;
    
      default:
        break;
    }
  }
  onSearch = (val) => {
    var timeOnSearch = null;
    if (this.onSearchFlag) {
      timeOnSearch&&clearTimeout(timeOnSearch);
      timeOnSearch = setTimeout(() => {
        this.onSearchFlag = false;
        this.timerHandle({type:'delete',timerId: timeOnSearch});
        timeOnSearch = null;
      },5000);
      this.timerHandle({type:'add',timerId: timeOnSearch});
      return 
    }
    let { tabsKey } = this.state;
    this.onSearchFlag = true;
    this.getTreeData(tabsKey,val);
  }
  deleteOfflineCheck = (offlinePersonId=[]) => {
    let { checkedNodes, checkedKeys } = this.state;
    offlinePersonId.some(personId => {
      checkedKeys = checkedKeys.filter(v => {
        return v != personId
      })
      checkedNodes = checkedNodes.filter(v => {
        return v != personId
      })
      return false;
    });
    this.setState({checkedNodes, checkedKeys});
  }
  onTabClick = (tabsKey) => {
    if (this.state.checkedKeys.length) {
      message.error('请先取消当前勾选人');
      return true;
    }
    this.setState({ tabsKey, treeData: [], checkedNodes: [], checkedKeys: [], });
    this.getTreeData(tabsKey);
  }  
  // treeTrigger
  treeTrigger = (dataObj) => {
    let { leftTrigger } = this.props
    let { triggerType, data } = dataObj
    switch(triggerType) {
      case "onCheck": 
        leftTrigger({ triggerType, data: data.e })
        this.setState({
          checkedNodes: data.e.checkedNodes,
          checkedKeys: data.checkedKeys
        });
        break;
      default:
        break;
    }
  }
  // telSudokuTrigger
  telSudokuTrigger = (config={}) => {
    let { leftTrigger } = this.props
    let { triggerType, data } = config
    switch(triggerType) {
      case "hideTelSudoku":
        leftTrigger({ triggerType, data })
      break;
      case "audioDial":
        leftTrigger({ triggerType, data })
      break;
      case "videoDial":
        leftTrigger({ triggerType, data })
      break;
      default:
        break;
    }
  }
  // sonButtonsTrigger
  buttonsTrigger = (v) => {
    let { checkedNodes } = this.state
    let { leftTrigger } = this.props
    leftTrigger({
      triggerType: v.triggerType,
      data: { triggerInfo:v, checkedNodes }
    })
  }
  // treeHandler
  searchUpdateSingleSipNumStatus = (treeData) => {
    let { 
      redux_sumSipNumStatus,
    } = this.props;
    let treeData1 = updateSipNumStatus(treeData,redux_sumSipNumStatus);
    this.setState({ treeData:treeData1});
    this.submitPersonList(treeData1);
  }
  updateSingleSipNumStatus = (sip, isSingle=true, online="", dynamicOnline=false) => {
    console.log('updateSingleSipNumStatus');
    let info = [];
    if (isSingle) {
      info.push({
        online,sip
      })
    } else {
      if (sip.length==0) {
        return true
      }
      if (!dynamicOnline) {        
        info = sip.map(v => {
          v = { online, sip:v };
          return v
        })
      } else {
        info = sip;
      }
    }
    let mixinNewArr = this.state.treeData;
    let treeData1 = updateSipNumStatus(mixinNewArr,info);
    this.setState({treeData:treeData1});
  }
  getSipNumStatus = async(sipNumArr=["8802003"],mixinNewArr) => {
    let { leftTrigger } = this.props;
    let initOfflineInfo = initSipNumOffline(sipNumArr);
    let data = [];
    data.forEach(v => {
      for (let i = 0; i < initOfflineInfo.length; i++) {
        const e = initOfflineInfo[i];
        if (v.sip == e.sip) {
          e.online = v.online
          break;
        }
      }
    });
    let treeData1 = updateSipNumStatus(mixinNewArr,initOfflineInfo)
    this.setState({treeData:treeData1})
    this.setSumSipNumStatus(initOfflineInfo)
  }
  initSetPersonStatus = (mixinNewArr=[]) => {
    if (mixinNewArr.length==0) {
      mixinNewArr = this.state.treeData;
    }
    let arr = []
    treeDataHandleFun.createSinglePersonArray(mixinNewArr,arr)
    let sipNumArr = []
    arr.forEach(v => {
      sipNumArr.push(v.personId)
    })
    this.getSipNumStatus(sipNumArr,mixinNewArr)
  }
  cleanTreeChecked = () => {
    this.setState({
      checkedKeys: [],
      checkedNodes: []
    })
  }
  setSumSipNumStatus = (arr=[]) => {
    let { redux_sumSipNumStatus,AddStatusAction } = this.props;
    if (redux_sumSipNumStatus.length!==0) {          
      redux_sumSipNumStatus.forEach(v => {
        arr = arr.filter(v2 => {
          return v2.id !== v.id
        });
      });
    }
    redux_sumSipNumStatus = redux_sumSipNumStatus.concat(arr);
    AddStatusAction({redux_sumSipNumStatus})

  }
  // TreeData
  submitPersonList = (treeData=[]) => {
    let { redux_isOnlineAlready } = this.props;
    if (treeData.length==0) {
      treeData = this.state.treeData;
    }
    let arr = [];
    let lastArr = [];
    // treeDataHandleFun.createSinglePersonArray(testTree,arr);
    treeDataHandleFun.createSinglePersonArray(treeData,arr);
    arr.some(v => {
      lastArr.push({
        sipType: v.sipType,
        online: v.status,
        sip: v.personId,
        personId: v.personId,
        personName: v.personName,
      })
    })
    this.setSumSipNumStatus(lastArr)
    // !error
    if (!redux_isOnlineAlready) {
      this.cmt&&this.cmt.setArtemis();
    }
  }
  getOrganizationTreeData = (name = "") => {
    /* 
      @baseInfo = { online="",sip="",personId="",personName="" };
    */
    // let treeData1 = orgTreeData; 
    // let sourceKeyProps = ["account", "deptName"];
    // let sourceTitleProps = ["personName", "deptName"];
    // treeDataHandleFun.mixinChildrenProps(treeData1,0,['personList'])
    // let mixinNewArr = treeDataHandleFun.mixinNewProps(treeData1, sourceKeyProps, sourceTitleProps);        
    // console.log(mixinNewArr,'mixinNewArr1');
    // this.searchUpdateSingleSipNumStatus(mixinNewArr);
    // return true
    let reqUrl;
    let id = window.parent&&window.parent.sessionStorage.getItem('organizationId') || "";
    if (name) {
      reqUrl = window.SYSTEM_CONFIG_China + `/pubCommunicationAccount/getOrgList?orgId=${id}&name=` + name;
    } else {
      reqUrl = window.SYSTEM_CONFIG_China + `/pubCommunicationAccount/getOrgList?orgId=${id}`;
    }
    fetch(reqUrl, {
      // method: "POST",
      // signal
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (r) => {
          let { code, msg, data } = r;
          if (code == -1 || msg == "数据请求异常" || data == null) {
            return;
          }
          let treeData1  = data; 
          if (treeData1.length!==0) {
            let sourceKeyProps = ["account", "deptName"];
            let sourceTitleProps = ["personName", "deptName"];
            treeDataHandleFun.mixinChildrenProps(treeData1,0,['personList'])
            let mixinNewArr = treeDataHandleFun.mixinNewProps(treeData1, sourceKeyProps, sourceTitleProps);        
            console.log(mixinNewArr,'mixinNewArr1');
            this.searchUpdateSingleSipNumStatus(mixinNewArr);
          }
        }
      ).catch(err=> {
      })
  }
  getCommunicationTreeData = (name = "") => {
    // let tre = communicationTreeData;  
    // treeDataHandleFun.specialCreatePersonList(tre)
    // let sourceKeyProps = ["account", "distributionGroupName"];
    // let sourceTitleProps = ["personName", "distributionGroupName"];
    // treeDataHandleFun.mixinChildrenProps(tre,0,['personList'])
    // let mixinNewArr = treeDataHandleFun.mixinNewProps(tre, sourceKeyProps, sourceTitleProps);     
    // console.log(mixinNewArr,'mixinNewArr2');
    // this.searchUpdateSingleSipNumStatus(mixinNewArr);
    // return true
    let reqUrl;
    if (name) {
      reqUrl = window.SYSTEM_CONFIG_China + '/pubCommunicationAccount/getGroupList?name=' + name
    } else {
      reqUrl = window.SYSTEM_CONFIG_China + '/pubCommunicationAccount/getGroupList'
    }
    fetch(reqUrl).then((res) => {return res.json()})
    .then(r => {
      if (r.code ==="0"&&r.data.length!==0) {      
        let tre = r.data;  
        treeDataHandleFun.specialCreatePersonList(tre)
        let sourceKeyProps = ["account", "distributionGroupName"];
        let sourceTitleProps = ["personName", "distributionGroupName"];
        treeDataHandleFun.mixinChildrenProps(tre,0,['personList'])
        let mixinNewArr = treeDataHandleFun.mixinNewProps(tre, sourceKeyProps, sourceTitleProps);     
        console.log(mixinNewArr,'mixinNewArr2');
        this.searchUpdateSingleSipNumStatus(mixinNewArr);
      }
    }).catch(err=> {
    })
  }
  getTroopTreeData = (name = "") => {
    let suddenEventInfo = this.getSuddenInfo();
    let params = `eventId=${suddenEventInfo.actDeskId}&personName=${name}`
    fetch(window.ZHDD + '/yjzhYjzhSuddenEventResourceDispatch/getTroopPersonData?' + params,{
      method: 'POST',
    }).then(res => res.json())
    .then(r => {
      if (!r.successful) {
        return true;
      }
      let list = r.resultValue;
      let arr = treeDataHandleFun.mixinChildrenProps(list,0,['personList'])
      let sourceKeyProps = ['personId','troopId'];
      let sourceTitleProps = ['troopName','personName']
      arr = treeDataHandleFun.mixinNewProps(arr, sourceKeyProps, sourceTitleProps)
      this.searchUpdateSingleSipNumStatus(arr);
    }).catch(err=> {
    })
  }
  getCallDeviceData = (name = "") => {
    /* 
      @baseInfo = { online="",sip="",personId="",personName="" };
    */
    // let treeData1 = accountTreeData;
    // let arr = treeDataHandleFun.specialMergePersonList(treeData1)
    // let sourceKeyProps = ["communicationAccount", "orgId"];
    // let sourceTitleProps = ["personName", "orgName"];
    // treeDataHandleFun.mixinChildrenProps(arr,0,['accountList'])
    // let mixinNewArr = treeDataHandleFun.mixinNewProps(arr, sourceKeyProps, sourceTitleProps);           
    // this.searchUpdateSingleSipNumStatus(mixinNewArr);
    // return true
    let id = window.parent&&window.parent.sessionStorage.getItem('organizationId') || "";
    let body = {
      orgId: id
    }
    if (name) {
      body['personName'] = name;
    }
    fetch(window.SYSTEM_CONFIG_China + `/pubCommunicationAccount/list`, {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (r) => {
          let { code, msg, data } = r;
          if (code == -1 || msg == "数据请求异常" || data == null) {
            return;
          }
          let treeData1  = r.data; 
          if (treeData1) {
            let arr = treeDataHandleFun.specialMergePersonList(treeData1)
            let sourceKeyProps = ["communicationAccount", "orgId"];
            let sourceTitleProps = ["personName", "orgName"];
            treeDataHandleFun.mixinChildrenProps(arr,0,['accountList'])
            let mixinNewArr = treeDataHandleFun.mixinNewProps(arr, sourceKeyProps, sourceTitleProps);           
            this.searchUpdateSingleSipNumStatus(mixinNewArr);
          }
        }
      ).catch(err=> {
      })
  }
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  initTabPaneList = (tabPaneList=this.state.tabPaneList) => {
    let suddenEventInfo = this.getSuddenInfo();
    if (!suddenEventInfo) {
      tabPaneList = tabPaneList.filter(v => v.key !== 'troop')
      return tabPaneList;
    } else {
      return tabPaneList;
    }
  }
  getTreeData = (tabsKey = "organization", searchVal="") => {
    switch (tabsKey) {
      case "organization":
        this.getOrganizationTreeData(searchVal);
        break;
      case "communication":
        this.getCommunicationTreeData(searchVal);
        break;
      case "troop":
        this.getTroopTreeData(searchVal);
        break;
      case "callDevice":
        this.getCallDeviceData(searchVal);
        break;
      default:
        break;
    }
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
  // React
  componentDidMount() {
    this.cmtEventIsListen(true);
    if (process.env.NODE_ENV == 'development') {
      setIscRelationMemberInfo()
    }
    this.cmt = GetZhddXianHelper();
    this.getTreeData();
  }  
  componentWillUnmount() {
    this.cmtEventIsListen(false)
    this.timerHandle({type: 'componentWillUnmount'})
  }

  render() {
    console.log('left-render');
    let { 
      tabPaneList, tabsKey, treeData, checkedKeys } = this.state;
    let { isShowPressSpeak, isShowPressTallBackBtn, isShowTelSudokuBox,
    } = this.props;
    tabPaneList = this.initTabPaneList(tabPaneList);
    return (
      <div id="react-dispatch-left" className="yixian">
        <div ref={this.tabsRef} className="tabs">
          <Tabs activeKey={tabsKey} onTabClick={this.onTabClick}>
            {
              tabPaneList.map(v => {
                return (
                  <TabPane tab={v.tab} key={v.key}>
                    <Search onSearch={this.onSearch} className="searchInput" placeholder={v.placeholder} />
                    <TabTree treeTrigger={this.treeTrigger} checkedKeys={checkedKeys} treeData={treeData} ></TabTree>
                  </TabPane>
                )
              })
            }
          </Tabs>
        </div>
        {isShowTelSudokuBox?<TelSudoku telSudokuTrigger={this.telSudokuTrigger}></TelSudoku>:null}
        <Buttons
          isShowPressTallBackBtn={isShowPressTallBackBtn} 
          isShowPressSpeak={isShowPressSpeak}
          buttonsRef={this.setButtonsRef} buttonsTrigger={this.buttonsTrigger} 
        ></Buttons>
      </div>
    );
  }
}
export default connect(
  state => ({
    redux_isOnlineAlready: state.dispatchReducer.isOnlineAlready,
    redux_onlineAlready: state.dispatchReducer.onlineAlready,
    redux_sumSipNumStatus: state.dispatchReducer.sumSipNumStatus,
  }),
  {AddStatusAction}
)(left)
