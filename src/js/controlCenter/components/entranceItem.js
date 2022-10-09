import React from 'react';
import { message } from 'antd';
// import './css/entranceItem.scss';

/* eslint-disable */
class EntranceItem extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { doorStatus: "" }
  }
  componentDidMount() {
    // this.initDoorType();
  }
  initDoorType() {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/getDoorStatusByUuids?doorUuids=" + this.props.data.src_equipment_id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setStatus(b.data[0].doorStatus);
        }
      })
  }
  setStatus(data) {
    switch (data) {
      case 0:
        this.setState({ doorStatus: "未知" });
        break;
      case 1:
        this.setState({ doorStatus: "开门" });
        break;
      case 2:
        this.setState({ doorStatus: "关门" });
        break;
      case 3:
        this.setState({ doorStatus: "长开" });
        break;
      case 4:
        this.setState({ doorStatus: "长关" });
        break;
    }
  }
  handerDoor(type, e) {
    e.stopPropagation();
    fetch(window.SYSTEM_NELDA_OUTAPI + "/event/doControl?doorIndexCodes=" + this.props.data.srcEquipmentId + "&controlType=" + type)
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
  render() {
    return (
      <div className="entranceItem" >
        {this.props.data.resource_class_icon ?
          <div className="videoIcon">
            <img alt='videoIcon' src={this.props.data.resource_class_icon} />
          </div> : null}
        <div className="videoNo">{this.props.data.index}.</div>
        <div className="videoName">{this.props.data.equipment_name}
          <span className={"videoWz sxt" + this.props.data.status}>
            {this.state.doorStatus}
          </span>
        </div>
        <div className="operation">
          <div className="kaimen" onClick={this.handerDoor.bind(this, 2)}>开门</div>
          <div className="guanmen" onClick={this.handerDoor.bind(this, 1)}>关门</div>
          <div className="changkai" onClick={this.handerDoor.bind(this, 0)}>常开</div>
          <div className="changguan" onClick={this.handerDoor.bind(this, 3)}>常关</div>
        </div>
      </div>);
  }
}
export default EntranceItem;

/* eslint-enable */