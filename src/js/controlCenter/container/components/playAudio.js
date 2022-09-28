
import {message, Modal, Button, Table} from "antd";
import React from 'react';

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

  componentDidMount(){
    this.props.playAudioHandler(this)
  }

  yinPinHander(e) {
    // e.stopPropagation();
    this.setState({showModla: true})
    this.pageQuery()
    console.log(this.props,'props');
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
    return (
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
      </Modal>)
  }
}

export default Main;
/* eslint-enable */