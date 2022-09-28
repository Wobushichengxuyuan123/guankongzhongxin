import { Button, message, Modal, Table } from "antd";
import React from 'react';
import './css/broadcastItem.scss';


/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModla: false,
      value: 1,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      adioData: null
    }
  }

  pageQuery(pageNo, searchItem) {
    if (!pageNo) {
      pageNo = 1;
    }
    if (!searchItem) {
      searchItem = {};
    }
    fetch(`${window.SYSTEM_CONFIG_BASICS}/pubEquipmentAction/pageQueryVoice?pageNo=${pageNo}&pageSize=${this.state.pageSize}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: "GET",
    }).then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          if (!b.data) {
            b.data = [];
          }
          this.setState({
            /* pageNo: parseInt(b.data.pageNo),
            pageSize: parseInt(b.data.pageSize), */
            list: (b.data.list || []),
            totalCount: parseInt(b.data.totalCount),
            audioUrl: b.data.list.map((item, index) => {
              return item.audioUrl
            })
          })
        } else {
          message.error(b.msg);
        }
      })
  }

  dwHander() {
    // GetCorrelationInfo(this.props.data.equipment_id + "_1");
  }

  guangBoHander(type) {
    let filePath = this.state.adioData ? this.state.adioData[0].audioUrl : ''
    fetch(`${window.SYSTEM_NELDA_OUTAPI}/broadcast/broadcast?prePlanningActionId=${''}&command=${type}&numbers=${this.props.data.equipment_number}&equipmentActionId=${''}&cycleTimes=${1}&voiceUrl=${filePath}`, {
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
    this.setState({showModla: false});
  }

  huJiaoHander(e) {
    e.stopPropagation();
    fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/xCall?number=${this.props.data.equipment_number}`, {
      method: "GET",
    })
      .then(r => r.json())
      .then(b => {
        message.success('呼叫' + this.props.data.equipment_number + '成功')
      })
  }

  yinPinHander(e) {
    e.stopPropagation();
    this.setState({showModla: true})
    this.pageQuery()
  }

  quYuHander(e) {
    e.stopPropagation();
    let data = {
      locationAreaId: this.props.data.location_area_id,
      numbers: this.props.data.equipment_number
    }
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/broadcast/areaCall", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(b => {
        message.success('区域喊话成功')
      })
  }

  handleCancel() {
    this.setState({showModla: false});
  }

  bfHandle() {
    let filePath = this.state.adioData[0]
    let data = {
      locationAreaId: this.props.data.location_area_id,
      numbers: this.props.data.equipment_number,
      equipmentActionId: '',
      cycleTimes: 1,
      filePath: filePath.audioUrl,
    }
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/broadcast/areaSoundCall", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(b => {
        console.log(b)
        message.success('正在播放: ' + filePath.fileName + '音频文件')
      })
    this.setState({showModla: false});
  }

  render() {
    const columns = [
      {
        title: '音频文件名称',
        dataIndex: 'fileName',
        key: 'fileName'
      }
    ]
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          adioData: selectedRows
        })
      }
    }

    let pagination = {
      pageSize: this.state.pageSize,
      current: this.state.pageNo,
      total: this.state.totalCount,
      onChange: ((no) => {
        this.pageQuery(no)
      }).bind(this)
    }
    return (<div className="broadcastItem" onClick={this.dwHander.bind(this)}>
      {this.props.data.resource_class_icon ?
        <div className="broadcastIcon"><img src={this.props.data.resource_class_icon}/></div> : null}
      <div className="broadcastNo">{this.props.data.index}.</div>
      <div className="broadcastName">{this.props.data.equipment_name} <span
        className={"broadcastWz sxt" + this.props.data.status}>{this.props.data.equipment_location}</span></div>
      <div className="broadcastOperation">
        <div className="hujiao"
             onClick={this.huJiaoHander.bind(this)}
          // onClick={this.guangBoHander.bind(this, 1)}
        >喊话
        </div>
        <div className="quyuhanhua"
             onClick={this.quYuHander.bind(this)}
          // onClick={this.guangBoHander.bind(this, 2)}
        >区域喊话
        </div>
        <div className="quyubofang" onClick={this.yinPinHander.bind(this)}>区域播放</div>
      </div>
      <Modal
        width={321}
        title='音频文件'
        visible={this.state.showModla}
        onCancel={this.handleCancel.bind(this)}
        footer={[
          <Button
            key='btn2'
            onClick={this.bfHandle.bind(this)}
            // onClick={this.guangBoHander.bind(this, 3)}
            className="ant-btn ant-btn-primary ant-btn-lg">播
            放</Button>,
          <Button key='btn1' onClick={this.handleCancel.bind(this)} className="ant-btn ant-btn-lg">取 消</Button>
        ]}
      >
        <Table rowSelection={rowSelection} columns={columns} pagination={false} dataSource={this.state.list} bordered/>
      </Modal>
    </div>);
  }
}

export default Main;
/* eslint-enable */