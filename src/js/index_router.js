/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { store, persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import Header from './controlCenter/header/header.js';
import Leftname from './controlCenter/header/leftmenu'
import centerSecond from './LargeScreen/js/index'
import Alert from './alert/alert';
import Home from './controlCenter/container/index.js'
import Project from "./controlCenter/project/index";
import Point from './controlCenter/point/index'
import SearchInfo from './controlCenter/search/indexcopy';
import AreaInfo from './controlCenter/area/index';
import AlarmInfo from './controlCenter/alarm';
import Person from "./controlCenter/container/person";
import Video from "./controlCenter/container/video";
import Broadcast from "./controlCenter/container/broadcast1";
import EntranceGuard from "./controlCenter/container/entranceGuard1";
import Zhiliang from "./controlCenter/container/zhiliangGuard1";
import Jijing from "./controlCenter/container/jijingGuard1";
import JinDu from "./controlCenter/container/JinDuGuard1";
import HuanShuibao from "./controlCenter/container/HuanshuibaoGuard1";
import Config from "./controlCenter/container/config";
import Equipment from "./controlCenter/container/components/equipment";
import Realtime from "./controlCenter/locationdingwei/realtime/realtime"
import History from './controlCenter/locationdingwei/history/index'
import Playindex from "./controlCenter/locationdingwei/playback/playindex";
import Historicalreplay from "./controlCenter/locationdingwei/Historyplay/index";
import Rymj from "./controlCenter/Access/renyuanmenjin/index"
import Cardaozha from "./controlCenter/Access/carRoadgate/index"
import Carcesu from "./controlCenter/Access/carmeasurement/index"
import Rytj from './controlCenter/Access/renyuanmenjin/index2'
import Cartj from './controlCenter/Access/carRoadgate/index2'
import VideoMonitoring from './controlCenter/video/index'
import Videoplayback from './controlCenter/videoplayback/VideoPlayback'
import CVR from './controlCenter/videoplayback/cvr';
import Riskinfo from './controlCenter/risk/riskinfo'
import Huaban from "./controlCenter/Access/huaban/index"
import StatisticalAnalysis from './controlCenter/statisticalAnalysis/statisticalAnalysis'

import Root from '../routers/router';
import BaseLayout from '../layout';
import './index.scss';
class IndexRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerSecond: false,
      playAudioInfo: {},
      menuData: [],
      menuData1: [],
      routes: {
        Project: perms => <Project {...perms} />, // 项目
        Point: perms => <Point {...perms} />, // 点位
        SearchInfo: perms => <SearchInfo {...perms} />, // 搜索
        AreaInfo: perms => <AreaInfo {...perms} />, // 区域
        AlarmInfo: perms => <AlarmInfo {...perms} alarmCount={this.state.alarmCount} />, // 报警

        Equipment: perms => <Equipment {...perms} />,// 设备
        VideoMonitoring: perms => <VideoMonitoring {...perms} />,  // 视频调阅
        Videoplayback: perms => <Videoplayback {...perms} />,  // 录像回放
        Rymj: perms => <Rymj {...perms} />, // 人员门禁
        Cardaozha: perms => <Cardaozha {...perms} />, // 车辆道闸
        Carcesu: perms => <Carcesu {...perms} />, // 车辆超速
        Zhihuidiaodu: perms => <Zhihuidiaodu {...perms} />, // 指挥调度
        Person: perms => <Person {...perms} />,  // 人员车辆
        Realtime: perms => <Realtime {...perms} />, // 实时定位
        Playindex: perms => <Playindex {...perms} />, //轨迹回放
        History: perms => <History {...perms} />,  // 历史回放
        Video: perms => <Video {...perms} />,
        Broadcast: perms => <Broadcast {...perms} />,
        EntranceGuard: perms => <EntranceGuard {...perms} />,
        Zhiliang: perms => <Zhiliang {...perms} />,
        Jijing: perms => <Jijing {...perms} />,
        JinDu: perms => <JinDu {...perms} />,
        HuanShuibao: perms => <HuanShuibao {...perms} />,
        Historicalreplay: perms => <Historicalreplay {...perms} />,
        Riskinfo: perms => <Riskinfo {...perms} />,
        Huaban: perms => <Huaban {...perms} />,
        Rytj: perms => <Rytj {...perms} />,
        Cartj: perms => <Cartj {...perms} />,
        StatisticalAnalysis: perms => <StatisticalAnalysis {...perms} />,
        CVR: perms => <CVR {...perms} />,
      },
      openType: true,
      infoVisiable: false,
      infoVideo: false,
      infowaring: false,
      isShow: true,
      infoXA: false,
    };


  }
  componentWillMount() {
    if (window.Gisinit) { window.Gisinit.TimelineContainer() }
    if (window.location.href.includes('centerSecond')) this.setState({ centerSecond: true }, () => { })
  }
  componentDidMount() {

    this.getmenu()
    this.getPersonPosition()
    this.xiangmu()
    this.threeInteractionHander()
    this.jwt()
  }
  getmenu() {
    fetch(window.SYSTEM_CONFIG_APPLICATIONAPI + "/systemUser/userFuncRights", {
      method: "post",
      body: JSON.stringify({ systemCode: 12000 })
    })
      .then(r => r.json())
      .then(b => {
        this.setState({
          menuData: b.data,
          menuData1: b.data[0].children
        })
      })

  }

  getAlarmCount() {
    let projectId = window.sessionStorage.getItem("projectId")
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmCount?projectId=" + projectId)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          if (b.data[0]) {
            this.setState({ alarmCount: b.data[0].count });
          }
        }
      })
  }

  jwt() {
    setInterval(() => {
      fetch(window.SYSTEM_CONFIG_APPLICATIONAUTH + "/jwt/verify?token=" + sessionStorage.getItem('token'))
        .then(r => r.json())
        .then(b => {
          if (b.code != '0') {
            window.location.href = LOGINPATH
          }
        })
    }, 1000 * 60);
  }
  xiangmu() {
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubProject/pagination", {
      method: "post",
      body: JSON.stringify({ pageNo: 1, pageSize: 10 })
    })
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          let data = b.data.list || []
          if (data.length == 1) {
            let item = data[0].id
            if (window.PushData) {
              window.PushData("AreaJump" + "@" + encodeURI(JSON.stringify(item)));
            } else {
              if (window.GisMap) {
                window.GisMap.AreaJump(item);
              }
            }
          }
        }
      })
  }

  getPersonPosition() {
    window.PushData && window.PushData("GisDataAll" + "@" + JSON.stringify({
      url: '/nelda-smcc/public/pubCurrentLocation/getPersonPosition',
      params: {}
    }))
  }
  //三维调用前端的事件
  threeInteractionHander() {
    //门禁
    window.handerDoor = (data) => {
      console.log(data, '门禁')
      let { type, id } = JSON.parse(data);
      fetch(window.SYSTEM_NELDA_OUTAPI + "event/doControl?doorIndexCodes=" + id + "&controlType=" + type)
        .then(r => r.json())
        .then(b => {
          if (b.msg === "success") {
            message.success("操作成功！")
          } else {
            message.error("操作失败！")
          }
        })
    };
    //道闸
    window.chedaoDoor = data => {
      let { type, sourceEquipmentId } = JSON.parse(data);
      fetch(window.SYSTEM_NELDA_OUTAPI + "event/deviceControl?roadwaySyscode=" + sourceEquipmentId + "&command=" + type)
        .then(r => r.json())
        .then(b => {
          if (b.msg === "success") {
            message.success("操作成功！")
          } else {
            message.error("操作失败！")
          }
        })
    }
    //广播
    window.radio = data => {
      let { id, equipmentNumber, equipmentActionId, cycleTimes, voiceUrl, type } = JSON.parse(data);
      if (type == 1) {
        //呼叫
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/xCall?number=${equipmentNumber}`, {
          method: "GET",
        })
          .then(r => r.json())
          .then(b => {
            if (b.code === 0) {
              message.success('操作成功')
            } else {
              message.error('操作失败')
            }
          })
      } else if (type == 2) {
        //喊话
        const data = {
          locationAreaId: id,
          numbers: equipmentNumber
        }
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/areaCall`, {
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(r => r.json())
          .then(b => {
            if (b.code === 0) {
              message.success('操作成功')
            } else {
              message.error('操作失败')
            }
          })
      } else if (type == 3) {
        this.setState({
          playAudioInfo: {
            location_area_id: id,
            equipment_number: equipmentNumber
          }
        })
        this.playAudioRef.yinPinHander()
      }
    }
  }
  playAudioHandler = ref => {
    this.playAudioRef = ref
  }
  menuChange(data) {
    this.setState({
      menuData1: data,
      infoVisiable: false
    })
  }
  openHander() {
    let width = 0
    this.setState({ openType: true, isShow: true });
    if (this.props.isAoTuAlter) {
      width = document.documentElement.clientWidth - 16 - 56 - 330;
    } else {
      width = document.documentElement.clientWidth - 16 - 56;
    }
  }
  infoCanelHander() {
    let width = 0
    this.setState({ infoVisiable: false, selectMenu: "" });
    if (this.props.isAoTuAlter) {
      width = document.documentElement.clientWidth - 16 - 56 - 330
    } else {
      width = document.documentElement.clientWidth - 16 - 56
    }
  }
  closeHander() {
    let width = 0
    this.setState({ openType: false, isShow: false });
    if (this.props.isAoTuAlter) {
      width = document.documentElement.clientWidth - 16 - 330;
    } else {
      width = document.documentElement.clientWidth - 16
    }
  }
  pathUrl(data) {
    let pathurl = data.replace("/", "")
    if (pathurl.indexOf('$') > -1) {
      this.setState({
        infoVideo: false,
        infoVisiable: false,
        infoXA: true
      })
    } else if (pathurl == 'VideoMonitoring' || pathurl == 'Videoplayback' || pathurl == 'CVR') {
      this.setState({
        infoVideo: true,
        infoVisiable: false
      })
    } else {
      this.setState({ infoVisiable: true, infoVideo: false });
    }
  }
  render() {
    let routes = (list = this.state.menuData) => {
      return list ? list.map((item, i) => {
        item.key = "item" + i;
        if (item.isFinalnode == 1) {
          let component = item.url ? item.url.replace("/", "") : null;
          if (component) {
            return (
              <Switch key={item.key}>
                <Route key={item.key} path={item.url} component={this.state.routes[component]} />
              </Switch>
            );
          }
        }
        if (item.children) {
          return routes(item.children);
        }
      })
        : null;
    };
    const old = () => {
      const { openType, infoXA } = this.state
      return <Provider store={store} id="cesiumContainer">
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <>
              <div className='headerBox'>
                <Header
                  data={this.state.menuData}
                  change={this.menuChange.bind(this)} />
              </div>
              <div className='home' >
                <div className='container' >
                  <div></div>
                  <div className='menu' ref="mapContainer" parent={this} >
                    <div key="menu-container" className='menu-container' style={{ display: this.state.isShow == true ? 'block' : 'none' }}>
                      <Leftname data={this.state.menuData1} parent={this} alarmCount={this.state.alarmCount} />
                    </div>
                    <div className={openType ? 'closeBtn' : 'openBtn'} onClick={openType ? this.closeHander.bind(this) : this.openHander.bind(this)}>
                      {openType ? <LeftOutlined /> : <RightOutlined />}
                    </div>
                    <div key="menu-info" className="menu-xian" style={{
                      height: window.document.documentElement.clientHeight - 64,
                      overflow: "hidden"
                    }}>
                      <div id="app">

                      </div>
                    </div>
                    {openType ? <div>
                      {this.state.infoVisiable ? <div key="menu-info" className={"menu-info" + (this.state.selectMenu == "指挥调度" ? " x-zhdd-menu-info yixian" : "")} style={{
                        height: window.document.documentElement.clientHeight - 64,
                        overflow: "hidden"
                      }}>
                        <div className="cbtn" onClick={this.infoCanelHander.bind(this)}>
                          <CloseOutlined />
                        </div>
                        {routes()}
                      </div> : null}
                      {this.state.infoVideo ? <div key="menu-info" className="menu-infovideo" style={{
                        height: window.document.documentElement.clientHeight - 64,
                        overflow: "hidden"
                      }}>
                        {routes()}
                      </div> : null}
                      {this.state.configVisiable ? <Config parent={this} /> : null}
                    </div>
                      : null}
                  </div>
                </div>
              </div>
              <Home />
              <Alert />
            </>
          </Router>
        </PersistGate>
      </Provider>
    }
    const newCenter = () => {
      return <BaseLayout>
        <Root />
      </BaseLayout>
    };
    return this.state.centerSecond == true ? newCenter() : old();
  }
};
export default IndexRouter;
/* eslint-enable */