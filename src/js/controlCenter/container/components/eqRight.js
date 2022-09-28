import React, { Component } from "react";
import Style from "./eqRight.module.css";
class eqRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conList: [
        {
          prop: "equipmentCategoriesId_Name",
          label: "设备类型: ",
          content: ""
        },
        {
          prop: "equipmentName",
          label: "设备名称: ",
          content: ""
        },
        {
          prop: "chineseDesc",
          label: "中文描述: ",
          content: ""
        },
        {
          prop: "equipmentMarking",
          label: "设备型号: ",
          content: ""
        },
        {
          prop: "manufacturer",
          label: "生产厂家: ",
          content: ""
        },
        {
          prop: "buildCountry",
          label: "生产国家: ",
          content: ""
        },
        {
          prop: "equipmentLeaveCode",
          label: "出厂编号: ",
          content: ""
        },
        {
          prop: "equipmentLeaveTime",
          label: "出场日期: ",
          content: ""
        },
        {
          prop: "equipmentLocation",
          label: "安装位置: ",
          content: ""
        },
        {
          prop: "status",
          label: "设备状态: ",
          content: ""
        }
      ],
    };
  }
  close() {
    this.props.parent.toggleRightBox(false,null)
  }
  render() {
    let conData = this.props.data;
    let { conList } = this.state;
    conList.forEach(v => {
      if (v.prop == 'status') {
        v['content'] = conData[v.prop] == "1" ? '在线': '离线'
      } else if(v.prop == 'equipmentLeaveTime'){ 
        v['content'] = new Date(conData[v.prop]).Format("yyyy-MM-dd hh:mm:ss")
      } else {
        v['content'] = conData[v.prop]
      }
    })
    return (
      <div className={Style.eqRight}>
        <p className={Style.p_title}>详情</p>
        <span onClick={this.close.bind(this)} className={Style.closeIcon}>X</span>
        <div className={Style.content}>
          {conList.map((v) => {
            return (
              <div key={v.label} className={Style.con_item}>
                <span className="label">{v.label}</span>
                <span className="con">{v.content}</span>
              </div>
            );
          })}
          <div className={Style.con_item}>
            <span className="label">实物ID:</span>
            <img className={Style.con_img} src={conData.qrCode} alt="实物ID" />
          </div>
        </div>
      </div>
    );
  }
}

export default eqRight;
