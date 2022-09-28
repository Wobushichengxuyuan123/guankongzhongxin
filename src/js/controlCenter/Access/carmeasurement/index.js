// 测速
import '../../container/css/entranceGuard.scss';
import { Input, Collapse, Spin } from 'antd';

import EntranceGuardItem from '../../container/entranceGuardItem';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import ChaosuTables from '../compones/chaosutablecopy'

const Search = Input.Search;
const Panel = Collapse.Panel;
/* eslint-disable */
class Carmeasurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      entranceGuardList: [],
      sname: null,
      isLoding: true,
      resNum: 0,
      type: 2,
      isshow: true,
      tableList: [],
      carsesualert: false,
      carsesuList: []
    }
  }

  componentDidMount() {
    this.getEntranceGuardInfo();
    this.getList();
    this.time = setInterval(() => {
      this.getList();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.time)
  }

  getEntranceGuardInfo(name) {
    let projectId = window.sessionStorage.getItem("projectId")
    if (!name) {
      name = "";
    }
    this.setState({ sname: name });
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfo?name=" + name + '&state=2' + '&projectId=' + projectId)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          this.setState({ areaList: b.data });
        }
      })
  }

  entranceGuardInfoByAreaId(id) {
    this.setState({ isLoding: true, resNum: this.state.resNum + 1 })
    var seqname = this.state.sname === null ? "" : "&eqment_name=" + this.state.sname;
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfoByAreaId?area_id=" + id + seqname + '&state=2')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          if (b.msg === "success") {
            this.setState({ entranceGuardList: b.data, isLoding: false });
          }
        } else {
          if (this.state.resNum < 3) {
            this.entranceGuardInfoByAreaId(id)
          } else {
            this.setState({ resNum: 0 })
            // message.error('服务器异常!请稍后再试!')
          }
        }
      })
  }

  changeCollapse(id) {
    this.setState({ entranceGuardList: [] });
    setTimeout((() => {
      this.entranceGuardInfoByAreaId(id);
    }).bind(this), 200);
  }
  echartsClick = (equipmentid) => {
    console.log(equipmentid)
    this.getList(equipmentid)
  }

  // 测速列表
  getList(id) {
    let projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/public/pubStatisics/selectEnterOutList",
      {
        method: 'POST',
        body: JSON.stringify({ pageNo: 1, pageSize: 10, type: this.state.type, equipmentId: id, projectId: projectId, isAll: "all" }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        this.setState({
          tableList: res.data.list || []
        })
      })
  }
  carcesuCallback = (data) => {
    this.setState({
      carsesuList: data,
      carsesualert: true
    })

  }
  chose() {
    this.setState({
      carsesuList: [],
      carsesualert: false
    })
  }

  render() {
    const { isshow, tableList, carsesualert, carsesuList } = this.state
    let items = this.state.entranceGuardList.map((item, i) => {
      item.index = i + 1;
      return <EntranceGuardItem key={"EntranceGuardItem" + i} data={item} echartsClick={this.echartsClick.bind(this)} />
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="entranceGuardList">
          {this.state.isLoding ? <div style={{ textAlign: 'center', margin: '10px 0' }}><Spin tip="加载中..." />
          </div> : items}
        </div>
      </Panel>
    })
    return (<div className="entranceGuard">
      <div className="title">车辆超速</div>
      <div>
        <div className="searchDiv" style={{ paddingTop: 20 }}>
          <Search className="entranceGuardSearchInput searchInput" placeholder="请输入车辆超速名称"
            onSearch={this.getEntranceGuardInfo.bind(this)} />
        </div>
        <div style={{ height: (window.document.documentElement.clientHeight - 200) }}>
          <Scrollbars>
            {panels ?
              <Collapse accordion onChange={this.changeCollapse.bind(this)}>
                {panels}
              </Collapse>
              : null}
          </Scrollbars>
        </div>
      </div>
      <div className="entranceguand-right" style={{ display: isshow ? 'block' : 'none', }}>
        <div className='right-ent'>
          <div className='ent-right-buttom2'><ChaosuTables carcesuCallback={this.carcesuCallback} name={this.state.type} tableList={tableList} /></div>
        </div>
      </div>
      {carsesualert ? <div className='alertRight'>
        <div className='chose' onClick={this.chose.bind(this)}></div>
        <div className='ryalert'>
          <div className='Ryleft'>
            <div className='Rx'>
              <div className="alertdiv">单位: </div>
              <div className='alerttext'>{carsesuList.deptName}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv">车牌号: </div>
              <div className='alerttext'>{carsesuList.carNo}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv"> 驾驶员: </div>
              <div className='alerttext'>{carsesuList.personName}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv">时间: </div>
              <div className='alerttext'>{carsesuList.time}</div>
            </div>
          </div>
          <div className="alertimg"><img className='Ryimg' src={carsesuList.pic} width='100' height='100' /> </div>
        </div>


      </div> : null}
    </div>);
  }
}

export default Carmeasurement;
/* eslint-enable */