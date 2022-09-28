import './css/personItem.scss'
import {message, Modal, Input} from 'antd';
import React from 'react';

/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showModla: false}
  }

  dwHander(e) {
    e.stopPropagation();
    // GetCorrelationInfo(this.props.data.person_id + "_2");
    console.log("触发三维更改视角,事件名称 ShebeiToGis  传递参数：{id:*};",'id:',this.props.data.person_id)
    // window.PushData&&window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.person_id }));
    if(window.PushData){
      window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.person_id  }));
    }else{
      window.GisMap.ShebeiToGis({id: this.props.data.person_id })
    }
  }

  hjHander(e) {
    e.stopPropagation();
    fetch(window.BASICS_SYSTEM + "/public/pubPersionSearch/callPerson?name=" + this.props.data.person_name + "&equipment_id=" + this.props.data.equipment_id)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          message.success("呼叫成功！");
        } else {
          message.error("呼叫失败！");
        }
      })
  }

  gjHander(e) {
    e.stopPropagation();
    // GetTrackPlaybackData(this.props.data.person_id + "_" + this.props.data.person_name)
  }

  xqHander(e) {
    e.stopPropagation();
    this.setState({
      showModla: true
    })
  }

  handleCancel() {
    this.setState({showModla: false});
  }

  render() {
    return (<div className="personItem" onClick={this.dwHander.bind(this)}>
      {this.props.data.RESOURCE_CLASS_ICON ?
        <div className="personIcon"><img src={this.props.data.RESOURCE_CLASS_ICON}/></div> : null}
      <div className="personNo">{this.props.data.index}.</div>
      <div className="personName">{this.props.data.person_name} <span
        className="personDw">{this.props.data.company_name}</span></div>
      <div>进入： <span className="time">{this.props.data.entrance_time&&this.props.data.entrance_time.replace(/-/g, "/")}</span> 时长： <span
        className="time">{window.TimeDifference(new Date(this.props.data.position_time&&this.props.data.position_time.replace(/-/g, "/")).getTime() - new Date(this.props.data.entrance_time&&this.props.data.entrance_time.replace(/-/g, "/")).getTime())}</span>
      </div>
      <div className="personOperation">
        <div className="guiji" onClick={this.gjHander.bind(this)}>轨迹</div>
        <div className="dingwei" onClick={this.dwHander.bind(this)}>定位</div>
        {/*<div className="xiangqing" onClick={this.xqHander.bind(this)}>详情</div>*/}
      </div>
      <Modal
        title="人员详情"
        visible={this.state.showModla}
        footer={null}
        width={321}
        onCancel={this.handleCancel.bind(this)}
      >
        单位名称：<Input value={this.props.data.company_name}/><br/><br/>
        人员姓名：<Input value={this.props.data.person_name}/><br/><br/>
        进入时间：<Input value={this.props.data.entrance_time}/><br/><br/>
        进入时长：<Input
        value={window.TimeDifference(new Date(this.props.data.position_time&&this.props.data.position_time.replace(/-/g, "/")).getTime() - new Date(this.props.data.entrance_time&&this.props.data.entrance_time.replace(/-/g, "/")).getTime())}/><br/><br/>
      </Modal>
    </div>);
  }
}

export default Main;
/* eslint-enable */