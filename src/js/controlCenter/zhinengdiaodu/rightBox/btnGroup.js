import React from "react";
import PropTypes from 'prop-types'
import { Button, message } from "antd";
import '../css/index.scss'
import cmtEvents from "@/js/utils/cmtEvents.js";
const CloseEventBox = (props) => {
  const cancel = () => {
    console.log(7);
    props.controlFun({
      type: 'cancel'
    })
  }
  const msgTip = (type,text) => {
    message[type](text);
  };
  const closeSuddenEvent = () => {
    let info = props.suddenEventInfo
    let url = "http://192.168.1.136:8098/yjzhYjzhBattleSuddenEventInf/closeSuddenEventInf"
    let eventSummingUp = ""
    if (info.eventSummingUp) {
      eventSummingUp = info.eventSummingUp
    }
    let data = {
      actDeskId: info.actDeskId,
      createDate: "",
      creater: "",
      drillBeginDatetime: "",
      drillEndDatetime: "",
      drillJionPerson: "",
      eventDisposalMeasure: "",
      eventLatitude: "",
      eventLevel: 0,
      eventLevelName: "",
      eventLongitude: "",
      eventProcessDesc: "",
      eventStateDesc: "",
      eventStatus: 0,
      eventSummingUp: eventSummingUp,
      eventType: 0,
      eventTypeName: "",
      happenArea: "",
      happenLocalPos: "",
      isEventFlag: 0,
      planId: 0,
      planName: 0,
      powerStationId: 0,
      powerStationName: "",
      recordStatus: 0,
      suddenEventNo: "",
      suddenEventSample: ""
    }
    fetch(url,{
      method: 'POST',
      data: JSON.stringify(data)
    }).then(r => r.json()).then(res => {
      console.log(res);
      msgTip('success','关闭成功')
      cmtEvents.emit('closeSuddenEvent')
    },(err) => {
      console.log(err);
      msgTip('error','关闭失败')
    })
  }
  if (!props.isShowCloseEventBox) {
    return null
  } else {
    return (
      <div className="close-event-box">
        <p>确定关闭本条突发事件吗？</p>
        <div className="btn-group">
          <div className="current-btn" onClick={closeSuddenEvent} >确定</div>
          <div className="cancel-btn" onClick={cancel}>取消</div>
        </div>
      </div>
    )
  }
}
class BtnGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCloseEventBox: false
    };
  }
// ~------------------------------------methods--------------------------------------------
// #region methods
stationsAreaGetAllVideo = () => {
  let reg = new RegExp("绩溪上水库")
  let fetchUrl = '/nelda-basics/pubLocationArea/listQuery';
  let body = {
    projectId: "854378009595531264" || this.props.suddenEventInfo.powerStationId,
    fuzzySearch:true,  
    locationAreaName: "绩溪上水库" || this.props.suddenEventInfo.happenArea
  }
  fetch(fetchUrl,{
    method: 'POST',
    body: JSON.stringify(body)
  }).then(r => r.json())
  .then(res => {
    let res2 = res.data.filter(item => {
      if (reg.test(item.locationAreaName)) {
        return item
      }
    })
    res2[0].equipmentList = res2[0].equipmentList.filter(item => {
      return (item.typeName == '摄像机')
    })
    let equipmentList = []
    equipmentList = res2[0].equipmentList;
    for (let index = 0; index < equipmentList.length; index++) {
      const element = equipmentList[index];
      let data = JSON.stringify({
        cameraId: element.equipmentId,
        title: element.equipmentname,
        serial: element.channel_num,
        code: element.equimentCode
      })
      console.log(data);
      window.controlVideoCon && window.controlVideoCon(data)
    }
  })
}
closeEvent = (parameter) => {
  this.setState((state,props) => {
    return {
      isShowCloseEventBox: true
    }
  })
}
controlFun = (params) => {
  console.log('45');
  let {type} = params
  console.log(type);
  if (type == 'cancel') {
    this.setState((state,props) => {
      return {
        isShowCloseEventBox: false
      }
    })
  }
}
// #endregion
  render() {
    return (
      <div className="btn-group">
        <Button
        onClick={this.stationsAreaGetAllVideo}
        >视频联动</Button>
        <CloseEventBox 
        suddenEventInfo={this.props.suddenEventInfo}
        controlFun={this.controlFun}
        isShowCloseEventBox={this.state.isShowCloseEventBox}
        ></CloseEventBox>
        <Button
        onClick={this.closeEvent}
        >关闭事件</Button>
      </div>
    );
  }
}

export default BtnGroup;