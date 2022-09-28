import React from "react";
import { Button, message } from "antd";
import cmtEvents from "@/js/utils/cmtEvents.js";
const CloseEventBox = (props) => {
  const cancel = () => {
    props.controlFun({
      type: 'close'
    })
  }
  const getSuddenInfo = () => {
    let s = window.parent.sessionStorage.getItem('suddenEventInfo')
    let res = (s&&JSON.parse(s))||{};
    return res
  }
  const msgTip = (type,text) => {
    message[type](text);
  };
  const closeSuddenEvent = () => {
    let info = getSuddenInfo();
    let url = window.ZHDD + "/yjzhYjzhBattleSuddenEventInf/closeSuddenEventInf"
    let eventSummingUp = ""
    if (info&&info.eventSummingUp) {
      eventSummingUp = info.eventSummingUp
    }
    let data = {
      actDeskId: info.actDeskId
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify(data)
    }).then(r => r.json()).then(res => {
      if (res.successful) {
        msgTip('success','关闭成功')
        cmtEvents.emit('closeSuddenEvent')
        props.controlFun({
          type: 'close'
        })
      } else {
        msgTip('error','关闭失败')
      }
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
class button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPTZControlPage: false,
      isShowCloseEventBox: false
    };
  }
// ~------------------------------------methods--------------------------------------------
// #region methods
stationsAreaGetAllVideo = () => {
  if (!this.props.suddenEventInfo) {
    return
  }
  window.parent.spdyTemProjectId = this.props.suddenEventInfo.powerStationId;
  window.parent.spdy_location_area_id = this.props.suddenEventInfo.happenArea;
  cmtEvents.emit('isShowPTZControlPage', !this.state.isShowPTZControlPage);
  this.setState((state,props) => {
    return {
      isShowPTZControlPage: !state.isShowPTZControlPage
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
  if (type == 'close') {
    this.setState((state,props) => {
      return {
        isShowCloseEventBox: false
      }
    })
  }
}
componentWillUnmount() {
  window.parent.spdyTemProjectId = undefined;
  window.parent.spdy_location_area_id = undefined;

}
// #endregion
  render() {
    return (
      <div className="react-dispatch-button">
        <Button className="jixibtn" onClick={this.stationsAreaGetAllVideo} >视频联动</Button>
        <CloseEventBox
        controlFun={this.controlFun}
        isShowCloseEventBox={this.state.isShowCloseEventBox}
        ></CloseEventBox>
        <Button className="jixibtn" onClick={this.closeEvent} >关闭事件</Button>
      </div>
    );
  }
}

export default button;