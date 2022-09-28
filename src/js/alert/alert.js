/* eslint-disable */
import './alert.css';
import { Input, Form, message, Carousel } from 'antd';
import React from 'react';
import VideoPlayer from '../controlCenter/videoplayback/VideoPlayer'
import { connect } from "react-redux";
const { TextArea } = Input;

let ws;
var that = null
var flag = false

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      result: '',
      isFadz: true,
      isImgWrap: false,
      imgUrl: '',
      ddldList: [],
      ljclType: false,
      alterData: {},
      play: true,
      timer: null,
      isplayvideo: false,
    }
    that = this
  }

  componentDidMount() {
    this.webSocket()
    // this.resWebSocket()
    this.getAlterData(this.props.alterId)
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.setState = () => false;
    ws.onclose()
  }
  webSocket() {
    ws = new WebSocket(`${window.SYSTEM_WEBSOCKET}/websocket/${sessionStorage.getItem("loginName")}`);
    ws.onopen = () => {
      console.log("Socket 已打开");
    };
    ws.onoffline = () => {
      message.error("网络已断开,请检查网络");
    };
    ws.ononline = () => {
      if (sessionStorage.getItem("detectionTimesId")) {
        message.success("网络已恢复");
      }
    };
    ws.onclose = function () {
      console.log("Socket已关闭");
    };
    ws.onmessage = (msg) => {
      let parseObj = JSON.parse(msg.data);
      if (!parseObj.MessageType) {
        if (parseObj.RespondType.indexOf('RT0003') !== -1 && parseObj.RespondType) {
          if (this.state.arr.length == 30) {
            this.state.arr.splice(0, 1)
            this.setState({
              arr: this.state.arr,
            })
          }
          if (this.state.arr.length != 30) {
            this.state.arr.push(parseObj)
            this.setState({
              arr: this.state.arr,
            })
          }
        }
      }
      // 判断是否收到心跳
      if (parseObj.MessageType) {
        flag = true
        if (parseObj.MessageType === 'start_line') {

          // 检测心跳包
          if (this.state.timer) {
            clearInterval(this.state.timer)
          }
          let timer = setInterval(() => {
            if (flag) {
              ws.send('{"MessageType":"HeartbeatPackage"}')
              flag = false
            } else {
              this.webSocket()
              flag = true
            }
          }, 1000 * 3)
          this.setState({
            timer: timer
          })
        }
      }
    }
  }
  closeBox(index) {
    let newArr = this.state.arr
    newArr.splice(index, 1)
    this.setState({
      arr: newArr,
      ljclType: true,
    })
  }
  onChange(e) {
    this.setState({ result: e.target.value })
  }
  okBtn(id, index) {
    if (!this.state.result.trim()) {
      message.error('处理过程不能为空')
    } else {
      fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/releaseWarnStatus", {
        method: "POST",
        body: JSON.stringify({
          id,
          result: this.state.result.trim()
        })
      }).then(r => r.json())
        .then(b => {
          if (b.code === "0") {
            message.success("解除成功！");
            window.AlertFunction.jcbj()
            this.closeBox(index)
          } else {
            message.error('解除失败!')
          }
        })
    }
  }
  noBtn(id, index) {
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/updateDefaultStatus", {
      method: "post",
      body: JSON.stringify({ id: id })
    })
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          message.success("处理成功！");
        } else {
          message.error("处理失败！");
        }
      })
    this.closeBox(index)
  }
  getAlterData(id) {
    if (id != 0 && !id) {
      return true
    }
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfoDetailsById?id=" + id, {
      method: "GET",
    }).then(r => r.json())
      .then(b => {
        if (b.code === "0") {
          this.setState({ alterData: b.data })
        } else {
          message.error(b.msg)
        }
      })
  }
  ddldHander(id) {
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/planList?alarmId=" + id)
      .then(r => r.json())
      .then(b => {
        if (b.data.list && b.data.list.length !== 0) {
          this.setState({ ddldList: b.data.list, ljclType: !this.state.ljclType });
        } else {
          message.error("未设置对应的多点联动方案！", 3);
        }
      })
  }

  showFaItem(list) {
    this.setState({ isFadz: true });
  }

  hideFaItem(e) {
    e.stopPropagation();
    this.setState({ isFadz: true });
  }

  yjtz(id, index) {
    fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/sendNoticeMsgByOnly?id=" + id)
      .then(r => r.json())
      .then(b => {
        if (b.code === 0) {
          message.success('通知成功')
          // this.closeBox(index)
        } else {
          message.error('通知失败')
        }
      })
  }

  openImg(url) {
    this.setState({
      isImgWrap: true,
      imgUrl: url
    })
  }

  closeImg() {
    this.setState({
      isImgWrap: false,
    })
  }

  handerDoor(type, id) {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/synControl?doorUuid=" + id + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          message.success("操作成功！")

        } else {
          message.error("操作失败！")
        }
      })
  }

  chedaoDoor(type, sourceEquipmentId) {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/controlBarrierByRoadwayUuid?roadwayUuid=" + sourceEquipmentId + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
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
        if (b.code === 0) {
          message.success('操作成功')
        } else {
          message.error('操作失败')
        }
      })
  }
  huJiaoHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
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
  }
  hanHuaHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
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
  }
  guangBoFangYinHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
    const data = {
      locationAreaId: id,
      numbers: equipmentNumber,
      equipmentActionId: equipmentActionId,
      cycleTimes: cycleTimes,
      filePath: voiceUrl
    }
    fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/areaSoundCall`, {
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
  }
  hfBtn(Video) {
    this.setState({
      isplayvideo: true,
      videoUrl: Video
    }, () => {
      console.log(this.state.isplayvideo, this.state.videoUrl);
    })
  }
  toggleChose() {
    this.setState({
      isplayvideo: false,
    })
  }
  // 监控
  jianKHander(item) {
    document.getElementById('centerVideoCon').style.width = 'calc(100% - 712px)';
    document.getElementById('centerVideoCon').style.right = '330px';
    let data = JSON.stringify({
      cameraId: item.EquipmentId,
      serial: item.channelNum,
      code: item.equipmentCode
    })
    window.controlVideoCon && window.controlVideoCon(data)
  }
  render() {
    const { alterData } = this.state
    let ldfa = this.state.ddldList.map((item, index) => {
      let key = index + 1;
      let fadzList = item.actionList.map((item, index) => {
        return <tr>
          <td style={{ width: '25px' }}>{index + 1}</td>
          <td style={{ width: '80px' }}>{item.equipmentId_Name}</td>
          <td>{item.equipmentActionId_Name}</td>
          {item.equipmentCategoriesCode === '9007' ? <td> {/*道闸*/}
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 0, item.sourceEquipmentId)}>开闸</span>
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 1, item.sourceEquipmentId)}>关闸</span>
            <span className="sBtn" onClick={this.chedaoDoor.bind(this, 2, item.sourceEquipmentId)}>常开</span>
          </td> : null}
          {item.equipmentCategoriesCode === '9006' ? <td> {/*门禁*/}
            <span className="sBtn" onClick={this.handerDoor.bind(this, 2, item.sourceEquipmentId)}>开门</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 1, item.sourceEquipmentId)}>关门</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 0, item.sourceEquipmentId)}>常开</span>
            <span className="sBtn" onClick={this.handerDoor.bind(this, 3, item.sourceEquipmentId)}>常关</span>
          </td> : null}
          {item.equipmentCategoriesCode === '9005' ? <td>
            <span className="sBtn"
              onClick={this.huJiaoHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 1, item.cycleTimes, item.voiceUrl)}>呼叫</span>
            <span className="sBtn"
              onClick={this.hanHuaHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 2, item.cycleTimes, item.voiceUrl)}>喊话</span>
            <span className="sBtn"
              onClick={this.guangBoFangYinHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 3, item.cycleTimes, item.voiceUrl)}>广播放音</span>
          </td> : null}
          {item.equipmentCategoriesCode === '9004' ? <td>
            <span className="sBtn" onClick={this.jianKHander.bind(this, item.sourceEquipmentId)}>监控</span>
          </td> : null}
        </tr>
      })
      return <div key={"ldfaItem" + key} className="ldfaItem" onMouseEnter={this.showFaItem.bind(this, item.actionList)}
        onMouseLeave={this.hideFaItem.bind(this)}><span>方案{key}</span>:{item.prePlanningName}
        {this.state.isFadz ?
          <div className="fadzList">
            <table>
              <tr>
                <td>次序</td>
                <td>设备名称</td>
                {/*<td>动作</td>*/}
              </tr>
              {fadzList}
            </table>
          </div> : null}
      </div>
    })
    let Pic = ''
    if (alterData.Pic) {
      Pic = alterData.Pic.map((item, index) => {
        return <div>
          <img src={item} key={index} alt="" onClick={this.openImg.bind(this, item)}
            style={{ cursor: 'pointer', width: '100%', height: '200px' }} />
        </div>
      })
    }
    return (
      <div>
        <div className='videoplay'
          style={{ display: this.state.isplayvideo ? 'block' : 'none' }}
        >
          <div className="chose1" onClick={this.toggleChose.bind(this, false)}></div>
          {this.state.isplayvideo ? <VideoPlayer rootClassName="videoPalyerDiv" src={this.state.videoUrl} /> : ''}
        </div>
        <div id="videoWrap"></div>

        {this.state.arr.length === 0 ? null : <div className='alter-wrap'>
          {this.state.arr.map((item, index) => {
            return <div className="box"  style={{
              top: index * 50 + 'px',
              left: 0 + 'px',
              lineHeight: 2
            }}>
              {item.RespondType.indexOf('RT0002') != -1 && item.RespondType ?
                <audio controls="controls" autoplay='autoplay'>
                  <source src={this.state.arr[index].videoUrl} type="audio/mpeg" />
                </audio> : null}
              <div className="content-box">
                <div className="close-btn">
                  <span className="close-icon" onClick={this.closeBox.bind(this, index)}></span>
                </div>
                <div className="alter-title">{item.AlarmTypeName}详细信息</div>

                {item.AlarmComfrom === 'environ' ? '' : <div className="Carousel-wrap">
                  {item.Pic ? <Carousel autoplay>
                    {item.Pic.map((item, index) => {
                      return <div key={index}>
                        <img src={item} key={index} alt="" onClick={this.openImg.bind(this, item)}
                          style={{ cursor: 'pointer', width: '100%', height: '200px' }} />
                      </div>
                    })}
                  </Carousel> : null}
                </div>}
                <div className="content-text">
                  <div className="text-title">
                    <span className="s1">{item.DetectionItemsName}</span><span className="s2">{item.AlarmLevel}</span>
                  </div>
                  <div className="text-title">
                    <span className="text">报警简题：</span><span className="text">{item.NO}</span>
                  </div>
                  <div className="text-title text-flex">
                    <div className="left">
                      <span className="text">发生区域：</span><span className="text">{item.LocationAreaName}</span>
                    </div>
                    <div className="right">
                      <span className="text">持续时间：</span><span className="text">{item.KeepTime}</span>
                    </div>
                  </div>
                  {item.AlarmComfrom === 'environ' ? <div className="text-title text-flex">
                    <div className="left">
                      <span className="text">监测时间：</span><span className="text">{item.HValue}</span>
                    </div>
                    <div className="right">
                      <span className="text">实测值：</span><span className="text">{item.number0}</span>
                    </div>
                  </div> : ''}
                  {item.AlarmComfrom === 'environ' ? '' : <div className="text-title">
                    <span className="text">发生时间：</span><span className="text">{item.HValue}</span>
                  </div>}
                  {item.AlarmComfrom === 'environ' ?
                    <>
                      <div className="text-title text-flex">
                        <div className="left">
                          <span className="text">上限指标：</span><span className="text">{item.number1}</span>
                        </div>
                        <div className="right">
                          <span className="text">上上限指标：</span><span className="text">{item.number2}</span>
                        </div>
                      </div>
                      <div className="text-title text-flex">
                        <div className="left">
                          <span className="text">下限指标：</span><span className="text">{item.number3}</span>
                        </div>
                        <div className="right">
                          <span className="text">下下限指标：</span><span className="text">{item.number4}</span>
                        </div>
                      </div>
                    </> : ''}
                  <div className="text-title">
                    <span className="text">预警状态：</span><span className="text">未处理</span>
                  </div>
                </div>
                <div className="text-title text-flex" style={{ marginTop: '15px', marginBottom: '15px' }}>
                  <div className="left" style={{ marginTop: '5px' }}>
                    <span className="label">处理过程：</span>
                  </div>
                  <div className="right" style={{ flex: 1 }}>
                    <TextArea rows={4} placeholder="处理过程" style={{ resize: 'none' }} onChange={this.onChange.bind(this)} />
                  </div>
                </div>

                <div>
                  <div className="btn-wrap">
                    <div className="btn-group">
                      {!item.Video ? <div className="btn">
                        <span className="icon06"></span><span className="h">回放</span>
                      </div> :
                        <div className="btn">
                          <span className="icon06"></span><span className="s"
                            onClick={this.hfBtn.bind(this, item.Video)}>回放</span>
                        </div>}
                    </div>
                    <div className="btn-group btn-group-border">
                      <div className="btn">
                        <span className="icon06"></span><span className="s"
                          onClick={this.noBtn.bind(this, item.Id, index)}>误警</span>
                      </div>
                    </div>
                    <div className="btn-group">
                      <div className="btn">
                        <span className="icon05"></span><span className="s"
                          onClick={this.okBtn.bind(this, item.Id, index)}>报警处理</span>
                      </div>
                    </div>
                  </div>
                  <div className="btn-wrap btn-wrap-margin">
                    {item.patrolEquipmentId ? <div className="btn-group">
                      <div className="btn"
                        onClick={this.jianKHander.bind(this, item)}>
                        <span className="icon03"></span><span className="s">监控</span>
                      </div>
                    </div> : ''}

                    <div className="btn-group btn-group-border">
                      <div className="btn">
                        <span className="icon04"></span><span className="s"
                          onClick={this.ddldHander.bind(this, item.Id, index)}>多点联动</span>
                      </div>
                    </div>

                  </div>
                </div>


                {!this.state.ljclType ? <div className="ldfaList">{ldfa}</div> : null}
              </div>
            </div>
          })}
          {this.state.isImgWrap ? <div className="img-wrap">
            <img className='alter-img' src={this.state.imgUrl} alt="" onClick={this.closeImg.bind(this)} />
          </div> : null}
        </div>}
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    alterId: state.alter.test,
    info: state.alter.info
  }
};
const AlertForm = Form.create()(Alert);
export default connect(mapStateToProps)(AlertForm);
// export default AlertForm;

/* eslint-enable */
