/* eslint-disable */
import './css/videoItem.scss';
import { message, Modal, Button, Table } from "antd";
import React from 'react';


// var that = null;

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
    // that = this;
  }

  componentDidMount() {

  }

  pageQuery(pageNo, searchItem) {
    if (!pageNo) {
      pageNo = 1;
    }
    if (!searchItem) {
      searchItem = {};
    }
    // searchItem.pageNo = pageNo;
    // searchItem.pageSize = this.state.pageSize;
    fetch(window.SYSTEM_CONFIG_APPLICATIONAPI + '/pubEquipmentAction/videoPageQuery', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: "POST",
      body: JSON.stringify(searchItem)
    }).then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          if (!b.data) {
            b.data = [];
          }
          this.setState({
            pageNo: parseInt(b.data.pageNo),
            pageSize: parseInt(b.data.pageSize),
            list: (b.data || []),
            totalCount: parseInt(b.data.totalCount)
          })
        } else {
          message.error(b.msg);
        }
      })
  }

  huJiaoHander(e) {
    e.stopPropagation();
    fetch(window.SYSTEM_NELDA_OUTAPI + "/broadcast/xCall?number=" + this.props.data.equipment_number, { method: "get" })
      .then(r => r.json())
      .then(b => {
        message.success('呼叫' + this.props.data.equipment_number + '成功')
      })
  }

  yinPinHander(e) {
    e.stopPropagation();
    this.setState({ showModla: true })
    this.pageQuery()
  }

  handleCancel() {
    this.setState({ showModla: false });
  }

  bfHandle() {
    let filePath = this.state.adioData[0]
    let data = {
      filePath: filePath.audioUrl,
      locationAreaId: this.props.data.location_area_id,
    }
    fetch(window.SYSTEM_NELDA_OUTAPI + "/broadcast/areaSoundCall", {
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
    this.setState({ showModla: false });
  }

  quYuHander(e) {
    e.stopPropagation();
    let data = {
      locationAreaId: this.props.data.location_area_id,
    }
    fetch(window.SYSTEM_NELDA_OUTAPI + "/broadcast/areaCall", {
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
        message.success('区域喊话成功')
      })
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
    return (
      <div className="videoItem" >
        {this.props.data.RESOURCE_CLASS_ICON ?
          <div className="videoIcon"><img src={this.props.data.RESOURCE_CLASS_ICON} /></div> : null}
        <div className="videoNo">{this.props.data.index}.</div>
        <div className="videoName">{this.props.data.equipment_name}
          <span className={"videoWz sxt" + this.props.data.status}>{this.props.data.equipment_location} </span>
        </div>
        <div className="videoOperation">
          <div className="hujiao" onClick={this.huJiaoHander.bind(this)}>喊话</div>
          <div className="quyuhanhua" onClick={this.quYuHander.bind(this)}>区域喊话</div>
          <div className="quyubofang" onClick={this.yinPinHander.bind(this)}>区域播放</div>
        </div>
        <Modal
          width={321}
          title='音频文件'
          visible={this.state.showModla}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key='btn2' onClick={this.bfHandle.bind(this)} className="ant-btn ant-btn-primary ant-btn-lg">播
              放</Button>,
            <Button key='btn1' onClick={this.handleCancel.bind(this)} className="ant-btn ant-btn-lg">取 消</Button>
          ]}
        >
          <Table rowSelection={rowSelection} columns={columns} pagination={false} dataSource={this.state.list} bordered />
        </Modal>
      </div>
    );
  }
}

export default Main;

/* eslint-enable */