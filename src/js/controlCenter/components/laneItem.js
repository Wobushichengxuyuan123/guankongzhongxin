import './css/laneItem.scss';
import {message} from 'antd';
import React from 'react';

/* eslint-disable */
class Main extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {doorStatus: ""}
  }

  componentDidMount() {
    // this.initDoorType();
  }

  initDoorType() {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/getDoorStatusByUuids?doorUuids=" + this.props.data.source_equipment_id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setStatus(b.data[0].doorStatus);
        }
      })
  }
  setStatus(data) {
    switch (data) {
      case 0 :
        this.setState({doorStatus: "未知"});
        break;
      case 1 :
        this.setState({doorStatus: "开门"});
        break;
      case 2 :
        this.setState({doorStatus: "关门"});
        break;
      case 3 :
        this.setState({doorStatus: "常开"});
        break;
    }
  }
  handerDoor(type, e) {
    e.stopPropagation();
    fetch(window.SYSTEM_NELDA_OUTAPI + "/event/deviceControl?roadwaySyscode=" +  this.props.data.srcEquipmentId + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          setTimeout(() => {
//             this.initDoorType();
          }, 1000)
          message.success("操作成功！")

        } else {
          message.error("操作失败！")
        }
      })
  }


  // dwHander() {
  //   console.log("触发三维更改视角,事件名称 ShebeiToGis  传递参数：{id:*};",'id:',this.props.data.equipment_id)
  //   window.PushData&&window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.equipment_id }));
  //   if(window.PushData){
  //     window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.equipment_id }));
  //   }else{
  //     window.GisMap.ShebeiToGis({id: this.props.data.equipment_id})
  //   }
  // }

  render() {
    return (<div className="laneItem" >
    {this.props.data.RESOURCE_CLASS_ICON ?
            <div className="videoIcon"><img alt='videoIcon' src={this.props.data.RESOURCE_CLASS_ICON}/></div> : null}
          <div className="videoNo">{this.props.data.index}.</div>
          <div className="videoName">{this.props.data.equipment_name} <span
            className={"videoWz sxt" + this.props.data.status}>{this.props.data.equipment_location}</span></div>
      <div className="operation">
        <div className="kaimen" onClick={this.handerDoor.bind(this, 1)}>开门</div>
        <div className="guanmen" onClick={this.handerDoor.bind(this, 0)}>关门</div>
        <div className="guanmen" onClick={this.handerDoor.bind(this, 3)}>常开</div>
      </div>
    </div>);
  }
}

export default Main;

/* eslint-enable */