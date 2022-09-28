import React from 'react';
import { message, Input, Tooltip } from 'antd';
import { connect } from "react-redux";
import AlarmAlter from './alarmAlter'
import { actionCreators } from './store'
import './css/alarmItem.scss'
// import './css/alter.css'

/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ddldList: [],
      fadzList: [],
      isFadz: false,
      result: "",
      ljclType: false,
      serverDate: null,
      timer: null,
      isAlter: false,
      alterId: '',
      z: 0,
    }
    window.AlertFunction = this;
  }
  componentDidMount() {
    this.getServerDate();
    this.setState({ result: this.props.data.result });
  }
  getServerDate() {
    const { time } = this.props
    let time1 = time
    let time2 = new Date().getTime()
    this.setState({ serverDate: time2 + (time2 - time1) });
    let timer = setInterval((() => {
      this.setState({ serverDate: this.state.serverDate + 1000 });
    }).bind(this), 1000);
    this.setState({ "timer": timer });
  }
  ddldHander(e) {
    e.stopPropagation();
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/planList?alarmId=" + this.props.data.alarm_info_id)
      .then(r => r.json())
      .then(b => {
        if (b.data.list && b.data.list.length !== 0) {
          this.setState({ ddldList: b.data.list, ljclType: false });
        } else {
          message.error("未设置对应的多点联动方案！", 3);
        }
      })
  }
  actionHanderClick(id, e) {
    e.stopPropagation();
    if (id) {
      fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/panlExeParams?planId=" + id)
        .then(r => r.json())
        .then(b => {
          if (b.data) {
            b.data.list.map(item => {
              if (item.equipmentCategoriesCode == "9004") {
                window.WinContainer.addWinInfo({
                  locationAreaId: item.locationAreaId,
                  name: item.equipmentName,
                  type: "video",
                  isalarm: true,
                  id: item.sourceEquipmentId,
                  area_name: item.locationAreaName,
                  equipment_location: item.equipmentLocation
                });
              }
              if (item.equipmentCategoriesCode == "9005") {
                window.WinContainer.addWinInfo({
                  locationAreaId: item.locationAreaId,
                  name: item.equipmentName,
                  type: "radio",
                  id: item.equipmentId,
                  area_name: item.locationAreaName,
                  equipment_location: item.equipmentLocation
                });
              }
              if (item.equipmentCategoriesCode == "9006") {
                window.WinContainer.addWinInfo({
                  locationAreaId: item.locationAreaId,
                  name: item.equipmentName,
                  type: "entrance",
                  id: item.equipmentId,
                  area_name: item.locationAreaName,
                  equipment_location: item.equipmentLocation
                });
              }
              if (item.equipmentCategoriesCode == "9007") {
                window.WinContainer.addWinInfo({
                  locationAreaId: item.locationAreaId,
                  name: item.equipmentName,
                  type: "lane",
                  id: item.equipmentId,
                  area_name: item.locationAreaName,
                  equipment_location: item.equipmentLocation,
                  sourceEquipmentId: item.sourceEquipmentId,
                });
              }
              if (item.equipmentCategoriesCode == "S1010") {
                let data = JSON.stringify({
                  cameraId: item.equipmentId,
                  loginname: item.equipmentLoginName,
                  password: item.equipmentPassword,
                  ip: item.equipmentIp,
                  port: item.equipmentPort,
                })
                console.log(data);
                window.controlVideoCon && window.controlVideoCon(data)
              }
            })
          }
        })
    }
  }
  showFaItem(list) {
    this.setState({ isFadz: true });
  }
  hideFaItem(e) {
    e.stopPropagation();
    this.setState({ isFadz: false });
  }

  bclHander(id) {
    // e.stopPropagation();
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/updateDefaultStatus", {
      method: "post",
      body: JSON.stringify({ id: id })
    })
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("更改状态成功！");
          this.props.parent.getAlarmInfo(this.props.parent.state.type, this.props.parent.state.alarm_type);
        } else {
          message.error("更改状态失败！");
        }
      })
  }

  jcbj() {
    this.props.parent.getAlarmInfo(this.props.parent.state.type, this.props.parent.state.alarm_type);
  }

  changeTextArea(e) {
    e.stopPropagation();
    this.setState({ result: e.target.value });
  }

  saveBtnHander(e) {
    e.stopPropagation();
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/updateHandleResult", {
      method: "post",
      body: JSON.stringify({ id: this.props.data.alarm_info_id, result: this.state.result })
    })
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("保存成功！");
        } else {
          message.error("保存失败！");
        }
      })
  }

  jcbjBtnHander(e) {
    e.stopPropagation();
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/releaseWarnStatus", {
      method: "post",
      body: JSON.stringify({ id: this.props.data.alarm_info_id })
    })
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("解除成功！");
          this.props.parent.getAlarmInfo(this.props.parent.state.type, this.props.parent.state.alarm_type);
        } else {
          message.error("解除失败！");
        }
      })
  }

  ljclHander(e) {
    e.stopPropagation();
    this.setState({ ljclType: true });
  }

  closeHander(e) {
    e.stopPropagation();
    this.setState({ ljclType: false });
  }

  dwHander(data) {
    let param = {
      X: this.props.data.x_coordinate,
      Y: this.props.data.y_coordinate,
      Z: this.props.data.z_coordinate,
      alarmTitle: this.props.data.alarm_title,
      id: this.props.data.alarm_categories_id
    }
    // window.PushData && window.PushData("PoliceCall" + "@" + JSON.stringify(param));
    if (window.PushData) {
      window.PushData("PoliceCall" + "@" + JSON.stringify(param));
    } else {
      window.GisMap.PoliceCall((param));
    }
  }

  openAlert(data) {

    this.setState({ isAlter: true, alterId: data.id })
    if (this.props.isAoTuAlter) {
      this.props.changeInfo(0)
    } else {
      this.props.changeInfo(this.props.info + 1)
    }
    this.props.changeZ(data.id)
    this.props.openReducer(data)
    document.getElementById('centerVideoCon').style.width = 'calc(100% - 712px)';
    document.getElementById('centerVideoCon').style.right = '330px';
  }

  getIsShow(e) {
    if (!e) {
      this.setState({ isAlter: false })
    }
  }

  handerDoor(type, id) {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/entranceguard/synControl?doorUuid=" + id + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("操作成功！")

        } else {
          message.error("操作失败！")
        }
      })
  }

  chedaoDoor(type, sourceEquipmentId) {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/entranceguard/controlBarrierByRoadwayUuid?roadwayUuid=" + sourceEquipmentId + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("操作成功！")
        } else {
          message.error("操作失败！")
        }
      })
  }

  guangBoHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
    fetch(`${window.SYSTEM_NELDA_OUTAPI}/broadcast/broadcast?prePlanningActionId=${id}&command=${type}&numbers=${equipmentNumber}&equipmentActionId=${equipmentActionId}&cycleTimes=${cycleTimes}&voiceUrl=${voiceUrl}`, {
      method: "GET",
    })
      .then(r => r.json())
      .then(b => {
        if (b.code == 0) {
          message.success('操作成功')
        } else {
          message.error('操作失败')
        }
      })
  }

  jianKHander(SourceEquipmentId) {
    // MapContainer.changeMapwin(SourceEquipmentId);
    let winInfo = {
      name: this.state.alterData.EquipmentName,
      type: "video",
      isalarm: false,
      id: SourceEquipmentId,
      area_name: this.state.alterData.EquipmentLocation,
      equipment_location: this.state.alterData.LocationAreaName
    }
    window.WinContainer.addWinInfo(winInfo);
    if (SourceEquipmentId !== undefined || SourceEquipmentId !== '') {
      this.putXml2Player(SourceEquipmentId)
    }
  }

  putXml2Player(id) {
    var that = this;
    fetch(window.SYSTEM_NELDA_OUTAPI + '/videomonitoring/getPreviewParamByCameraUuid?cameraUuid=' + id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          let ocxObj = document.getElementById("mpv");
          let num = ocxObj.MPV_StartPreview(b.data);
          if (num = -1) {
            console.log(num, ocxObj.MPV_GetLastError());
          }
        } else {
          alert("读取摄像头信息失败！");
        }
      })
  }

  render() {
    let format = this.props.search ? "yyyy/MM/dd hh:mm" : "yyyy/MM/dd hh:mm:ss";
    let ldfa = this.state.ddldList.map((item, index) => {
      let key = index + 1;
      let fadzList = item.actionList.map((item, index) => {
        return <tr>
          <td style={{ width: '25px' }}>{index + 1}</td>
          <td style={{ width: '80px' }}>{item.equipmentId_Name}</td>
          <td>{item.equipmentActionId_Name}</td>
          {item.equipmentCategoriesCode == '9007' ? <td> {/*道闸*/}
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 0, item.sourceEquipmentId)}>开门</span>
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 1, item.sourceEquipmentId)}>关门</span>
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 2, item.sourceEquipmentId)}>常开</span>
          </td> : null}
          {item.equipmentCategoriesCode == '9006' ? <td> {/*门禁*/}
            <span className="sBtn" onClick={this.handerDoor.bind(this, 2, item.id)}>开门</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 1, item.id)}>关门</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 0, item.id)}>长开</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 3, item.id)}>长关</span>
          </td> : null}
          {item.equipmentCategoriesCode == '9005' ? <td>
            <span className="sBtn"
              onClick={this.guangBoHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 1, item.cycleTimes, item.voiceUrl)}>呼叫</span>
            <span className="sBtn"
              onClick={this.guangBoHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 2, item.cycleTimes, item.voiceUrl)}>喊话</span>
            <span className="sBtn"
              onClick={this.guangBoHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 3, item.cycleTimes, item.voiceUrl)}>广播放音</span>
          </td> : null}
          {item.equipmentCategoriesCode == '9004' ? <td>
            <span className="sBtn" onClick={this.jianKHander.bind(this, item.SourceEquipmentId)}>监控</span>
          </td> : null}
        </tr>
      })
      return <div key={"ldfaItem" + key} className="ldfaItem" onMouseEnter={this.showFaItem.bind(this, item.actionList)}
        onMouseLeave={this.hideFaItem.bind(this)}><span>方案{key}</span>:{item.prePlanningName}
        <div className="zxBtn" onClick={this.actionHanderClick.bind(this, item.id)}>执行</div>
        {this.state.isFadz ?
          <div className="fadzList">
            <table style={{ width: '270px' }}>
              <tr>
                <td style={{ width: '40px' }}>次序</td>
                <td>设备名称</td>
                {/*<td>位置</td>*/}
                <td>设备动作</td>
              </tr>
              {fadzList}
            </table>
          </div> : null}
      </div>
    })
    return (<div className="alarmItem" onClick={this.dwHander.bind(this, this.props.data)}>
      <div className="alarmIcon"></div>
      {this.props.data.index ? <div className="alarmNo">{this.props.data.index}.</div> : null}
      <div className="alarmTitle">
        <div className="alarmText" title={this.props.data.alarm_title}>{this.props.data.alarm_title}</div>
        <div className="alarm1"><Tooltip placement="bottomRight" title={this.props.data.levenname}><img
          style={{ width: "13px" }} src={this.props.data.levenicon} /></Tooltip></div>
        <div className="alarmFire"><Tooltip placement="bottomRight" title={this.props.data.categoriesname}><img
          style={{ width: "13px" }} src={this.props.data.categoriesicon} /></Tooltip></div>
      </div>
      {this.props.parent.state.historySearch ?
        <div className="alarmTime">报警时间：{new Date(this.props.data.alarm_time).Format(format)} </div> : <div
          className="alarmTime">时间：{new Date(this.props.data.alarm_time).Format(format)} 时长：{window.TimeDifference(this.state.serverDate - new Date(this.props.data.alarm_time).getTime())}</div>}
      <div className="alarmItemOperation" style={{ margin: (this.props.search ? "0 -13px" : "") }}>
        {/* {this.props.data.alarm_comfrom == 'environ' || this.props.data.alarm_comfrom == 'violation' || this.props.data.alarm_comfrom == 'F'? null :
          <div className="liandong" onClick={this.ddldHander.bind(this)}>多点联动</div>}  */}
        {/* {this.props.data.alarm_comfrom == 'environ' || this.props.data.alarm_comfrom == 'violation' || this.props.data.alarm_comfrom == 'F'? */}
        <div className="ljcl" onClick={this.openAlert.bind(this, this.props.data)}>详情</div>
        {/* <div className="ljcl" onClick={this.ljclHander.bind(this)}>立即处理</div>} */}
        {/* {this.props.data.alarm_comfrom == 'environ' || this.props.data.alarm_comfrom == 'violation' || this.props.data.alarm_comfrom == 'F'? null :
          <Popconfirm placement="bottomRight" title="确定不处理该报警吗?"
            onConfirm={this.bclHander.bind(this, this.props.data.alarm_info_id)} okText="是"
            cancelText="否">
            <div className="bcl">不处理</div>
          </Popconfirm>} */}
        {!this.state.ljclType ?
          <div className="ldfaList">
            {ldfa}
          </div>
          : null}
        {this.state.ljclType ?
          <div className="ljclDiv">处理过程:<Input.TextArea disabled={this.props.parent.state.historySearch}
            onChange={this.changeTextArea.bind(this)}
            value={this.state.result}></Input.TextArea>
            <div className="oper">
              {!this.props.parent.state.historySearch ?
                [<div key="saveBtnHander" onClick={this.saveBtnHander.bind(this)}>保存</div>,
                <div key="jcbjBtnHander" onClick={(e) => this.jcbjBtnHander(e)}>解除报警</div>] : null}
            </div>
          </div> : null}
      </div>
      {this.props.infoZ == this.props.data.id && this.state.isAlter ?
        <AlarmAlter pfn={this.getIsShow.bind(this)} alterId={this.state.alterId} parent={this} /> : null}
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.alter.info,
    infoZ: state.alter.infoZ,
    isAoTuAlter: state.alter.isAoTuAlter
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    openReducer: (data) => {
      dispatch(actionCreators.test(data.id))
    },
    changeInfo: (data) => {
      dispatch(actionCreators.info(data))
    },
    changeZ: (data) => {
      dispatch(actionCreators.infoZ(data))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
/* eslint-enable */