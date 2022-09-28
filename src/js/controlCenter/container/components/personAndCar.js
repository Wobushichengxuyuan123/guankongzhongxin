import React from 'react';
import moment from 'moment';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;
class PersonAndCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      list: ''
    }
  }

  // 组件销毁
  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer() {
    this.timerone && clearInterval(this.timerone)
  }


  // 详情
  details(value,e) {
    e.stopPropagation()
    this.setState({
      isShow: true,
      list: value
    })
  }

  // 跟踪
  track(value,e) {
    e.stopPropagation()
    this.timerone && clearInterval(this.timerone)
    this.genzong(value)
    this.timerone = setInterval(() => {
      this.genzong(value)
    }, 3000);
  }

  // 呼叫
  call(value) {
    console.log('呼叫', value)
  }

  // 关闭弹窗
  closeBox() {
    console.log('close')
    this.setState({
      isShow: false
    })
  }

  // 跟踪
  genzong(person_id) {
    let datatime = moment()
    var id = [
      { "key": "person_id", "value": person_id }
    ]
    let personlist = JSON.stringify(id)
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/personDetails?pageNo=1&pageSize=10&searchItems=' + personlist + '&_=' + datatime)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          //   this.setState({ resultList: b.data || [] });
          window.PushData && window.PushData("GisGpsPCarNowlistClick" + "@" + encodeURI(JSON.stringify(b.data)));
        }
      }
      )
  }

  shishi(item) {
    window.PushData && window.PushData("GisGpsPCarHoslistClick" + "@" + encodeURI(JSON.stringify(item)));
  }

  render() {
    let { panelList } = this.props
    let resultItems = panelList.map((item, i) => {
      item.index = (i + 1);
      return <div className='hist' key={item.index} onClick={this.shishi.bind(this, item)} >
        <div className='information'>{item.index}.{item.person_name}
          <span className='inforight'>{item.company_name}</span>
        </div>
         <div className='liebiao'>
          <div className='trajectory' onClick={e=>this.trajectory(item.person_name, item.position_time, item.person_id,e)}>
            <div className='guiji'></div><div>轨迹</div>
          </div>
          <div className='details' onClick={e=>this.details( item,e)}>
            <div className='xiangqing'></div><div>详情</div>
          </div>
          <div className='track' onClick={e=>this.track(item.person_id,e)}>
            <div className='xiangqing'></div><div>跟踪</div>
          </div>
          <div className='call' onClick={this.call.bind(this, item)}>
            <div className='xiangqing'></div><div>呼叫</div>
          </div>
        </div>
      </div>
    })
    // console.log(resultItems, 'resultItems')

    return (<div>
      {resultItems.length ?
        resultItems
        : null}
      {/* 详情弹窗 */}
      <div className="alterwrap" style={{
          display: this.state.isShow ? 'block' : 'none',
          bottom:'auto'
        }}>
        <div className="alarm" style={{lineHeight: 2,position:'static'}}>
          {this.state.list.d_type == 0 ? <div className="contentbox" style={{position:'static'}}>
            <div className="closebtn">
              <div className='namexinxi'>人员信息</div>
              <div className="closeicon" onClick={this.closeBox.bind(this)}></div>
            </div>
            <div className="contenttext">
              <div className="texttitle">
                <span className="text">姓名：</span><span className="text">{this.state.list.person_name}</span>
              </div>
              <div className="texttitle">
                <span className="text">手机：</span><span className="text">{this.state.list.mobile}</span>
              </div>
              <div className="texttitle">
                <span className="text">出生日期：</span><span className="text">{this.state.list.birthday}</span>
              </div>
              <div className="texttitle">
                <span className="text">身份证号：</span><span className="text">{this.state.list.idcard}</span>
              </div>
              <div className="texttitle">
                <span className="text">公司：</span><span className="text">{this.state.list.company_name}</span>
              </div>
              <div className="texttitle">
                <span className="text">职务：</span><span className="text">{this.state.list.post}</span>
              </div>
              <div className="texttitle">
                <span className="text">工种：</span><span className="text">{this.state.list.work_type_name}</span>
              </div>
              <div className="texttitle">
                <span className="text">工号：</span><span className="text">{this.state.list.person_no}</span>
              </div>
              <div className="texttitle">
                <span className="text">设备编号：</span><span className="text">{this.state.list.equipment_no}</span>
              </div>
              <div className="texttitle">
                <span className="text">区域：</span><span className="text">{this.state.list.area_name}</span>
              </div>
              <div className="texttitle">
                <span className="text">定位时间：</span><span className="text">{this.state.list.position_time}</span>
              </div>
            </div>
          </div> : <div className="contentbox" style={{position:'static'}}>
            <div className="closebtn">
              <div className='namexinxi'>车辆信息</div>
              <div className="closeicon" onClick={this.closeBox.bind(this)}></div>
            </div>
            <div className="contenttext">
              <div className="texttitle">
                <span className="text">车牌号：</span><span className="text">{this.state.list.person_name}</span>
              </div>
              <div className="texttitle">
                <span className="text"> 类型：</span><span className="text">{this.state.list.work_type_name}</span>
              </div>
              <div className="texttitle">
                <span className="text"> 组织机构：</span><span className="text">{this.state.list.company_name}</span>
              </div>
              <div className="texttitle">
                <span className="text"> 区域：</span><span className="text">{this.state.list.area_name}</span>
              </div>
              <div className="texttitle">
                <span className="text">定位时间：</span><span className="text">{this.state.list.position_time}</span>
              </div>
            </div>
          </div>}

        </div>
      </div>
    </div>);
  }

}

export default PersonAndCar;
