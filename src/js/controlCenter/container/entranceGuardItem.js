import './css/entranceGuardItem.scss';
import React from 'react';
import { message} from 'antd';

/* eslint-disable */

class Main extends React.Component {
  initDoorType() {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/getDoorStatusByUuids?doorUuids=" + this.props.data.src_equipment_id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setStatus(b.data[0].doorStatus);
        }
      })
  }
  handerDoor(type, equipmentType, e) {
    e.stopPropagation();
    this.props.ismjdoor(type,this.props.data.equipment_id)
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/synControl?doorUuid=" + this.props.data.equipment_id + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          setTimeout(() => {
            this.initDoorType();
          }, 1000)
          message.success("操作成功！")
        } else {
          message.error("操作失败！")
        }
      })
  }

  handerDzDoor(type, equipmentType, e) {
    e.stopPropagation();
    this.props.isdoor(type,this.props.data.equipment_id)
    fetch(window.SYSTEM_NELDA_OUTAPI + "/entranceguard/controlBarrierByRoadwayUuid?roadwayUuid=" + this.props.data.equipment_id + "&command=" + type)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          setTimeout(() => {
          this.initDoorType();
          }, 1000)
          message.success("操作成功！")
        } else {
          message.error("操作失败！")
        }
      })
  }

  dwHander(value) {
     this.props.echartsClick(value);
    // GetCorrelationInfo(this.props.data.equipment_id + "_1");
  }


  render() {
    return (<div className="entranceGuardItem" onClick={this.dwHander.bind(this,this.props.data.equipment_id)}>
      {this.props.data.resource_class_icon ?
        <div className="entranceGuardIcon"><img src={this.props.data.resource_class_icon}/></div> : null}
        <div className="entranceGuardNo">{this.props.data.index}.</div>
        <div className="entranceGuardName">{this.props.data.equipment_name} <span
             className={"entranceGuardWz sxt" + this.props.data.status}>{this.props.data.equipment_location}</span></div>

      {this.props.data.equipment_categories_code === "S2010" ? <div className="entranceGuardOperation" >
        <div className="kaimen" onClick={this.handerDoor.bind(this, 2,'mj')}>开门</div>
        <div className="guanmen" onClick={this.handerDoor.bind(this, 1,'mj')}>关门</div>
        <div className="changkai" onClick={this.handerDoor.bind(this, 0,'mj')}>常开</div>
        <div className="changguan" onClick={this.handerDoor.bind(this, 3,'mj')}>常关</div>
      </div> : null}
      {this.props.data.equipment_categories_code === "S3010" ? <div className="entranceGuardOperation">
        <div className="kaimen" onClick={this.handerDzDoor.bind(this, 0,'dz')}>开门</div>
        <div className="guanmen" onClick={this.handerDzDoor.bind(this, 1,'dz')}>关门</div>
      </div> : null}
    </div>);
  }
}

export default Main;

/* eslint-enable */