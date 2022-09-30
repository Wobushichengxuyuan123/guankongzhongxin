/* eslint-disable */
import {  Input, DatePicker, Collapse, message, Pagination, Spin } from 'antd';
import { connect } from "react-redux";
import { actionCreators } from './store'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import AlarmItem from './alarmItem';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';

const Search = Input.Search;
const Panel = Collapse.Panel;

var that = null

class ClassAlarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      historySearch: false,
      alarmInfo: [],
      alarmInfoDetails: [],
      alarm_type: 1,
      type: 3,
      name: "",
      current: 1,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageId: 0,
      isAlarmItem: true,
      isLoding: true,
      resNum: 0
    }
    that = this
  }

  componentDidMount() {
    this.getAlarmInfo(this.state.type, this.state.alarm_type);
  }

  getAlarmInfo(type, alarm_type, name, startValue, endValue) {
    let projectId =window.sessionStorage.getItem("projectId")
    // this.setState({alarmInfo:[]})
    let param = "&type=" + type + "&alarm_type=" + alarm_type;
    if (alarm_type == 2) {
      param += "&name=" + name + "&start_time=" + (startValue ? startValue : "") + "&end_time=" + (endValue ? endValue : "");
    }
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfo?projectId=" +projectId + param)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ alarmInfo: b.data });
          //this.getAlarmInfoDetails(type, alarm_type, b.data[0].id, this.state.pageNo, this.state.pageSize)
          this.getAlarmInfoDetails(type, alarm_type, this.state.pageId, this.state.pageNo, this.state.pageSize)
          this.getAlarmCount()
        }
      })
  }

  getAlarmCount() {
    let projectId =window.sessionStorage.getItem("projectId")
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmCount?projectId="+projectId)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          if (b.data[0]) {
            this.props.changeAlarmCount(b.data[0].count)
          }
        }
      })
  }

  getAlarmInfoDetails(type, alarm_type, id, pageNo, pageSize) {
    if(this.state.pageId!==id){
      pageNo=1
    }
    let projectId =window.sessionStorage.getItem("projectId")
    this.setState({ isLoding: true, resNum: this.state.resNum + 1 })
    let param = "?type=" + type + "&alarm_type=" + alarm_type + "&id=" + id + '&pageNo=' + pageNo + '&pageSize=' + pageSize +'&projectId=' + projectId;
    if (alarm_type == 2) {
      param += "&name=" + this.state.name + "&start_time=" + (this.state.startValue ? this.state.startValue : "") + "&end_time=" + (this.state.endValue ? this.state.endValue : "");
    }
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfoDetails" + param)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({
            alarmInfoDetails: b.data.list,
            pageNo: Number(b.data.pageNo),
            totalCount: Number(b.data.totalCount),
            isLoding: false
          });
        } else {
          if (this.state.resNum < 3) {
            this.getAlarmInfoDetails(type, alarm_type, id, pageNo, pageSize)
          } else {
            this.setState({ resNum: 0 })
            // message.error('服务器异常!请稍后再试!')
          }
        }
      })
  }

  disabledStartDate(startValue) {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue) {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }

  onStartChange(value) {
    this.onChange('startValue', value);
  }

  onEndChange(value) {
    this.onChange('endValue', value);
  }

  handleStartOpenChange(open) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange(open) {
    this.setState({ endOpen: open });
  }

  clickHistoryHander() {
    this.setState({ historySearch: true, alarm_type: 2, alarmInfo: [], alarmInfoDetails: [] });
  }

  clickXunhHander() {
    this.setState({ historySearch: false, alarm_type: 1, startValue: null, endValue: null });
    this.getAlarmInfo(this.state.type, 1);
  }

  changeCollapse(id) {
    this.setState({
      pageId: id
    })
    if (id) {
      this.setState({ isAlarmItem: true })
      this.getAlarmInfoDetails(this.state.type, this.state.alarm_type, id, this.state.pageNo, this.state.pageSize)
      if (!this.props.isAoTuAlter && this.props.info !== 0) {
        // let width = Number(document.getElementById("unityPlayer").childNodes[0].width)
        // window.MapContainer.changeWidth(width - 330);
      }
    } else {
      this.setState({ isAlarmItem: false })
      if (!this.props.isAoTuAlter && this.props.info !== 0) {
        this.props.changeInfo(0)
        // let width = Number(document.getElementById("unityPlayer").childNodes[0].width)
        // window.MapContainer.changeWidth(width + 330);
      }
    }
  }
  changeSearch(e) {
    let projectId =window.sessionStorage.getItem("projectId")
    if ( e.trim()=="" ) {
      var param = "&type=" + this.state.type + "&start_time=" + this.state.startValue + "&end_time=" + this.state.endValue;
    } else if(e.trim() != ""){
      var param = "&type=" + this.state.type + "&name=" + e + "&start_time=" + this.state.startValue + "&end_time=" + this.state.endValue;
    }
    this.setState({ alarmInfo: [], alarmInfoDetails: [] });
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfoDetailsAndCount?projectId=" + projectId + param)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ alarmInfo: b.data });
        }
      })
  }

  emitEmpty() {
    this.setState({ name: "" });
    this.getAlarmInfo(this.state.type, this.state.alarm_type, "", this.state.startValue, this.state.endValue);
  }

  pageOnChange(page) {
    this.setState({
      pageNo: page
    })
    this.getAlarmInfoDetails(this.state.type, this.state.alarm_type, this.state.pageId, page, this.state.pageSize)
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    let alarmItems = this.state.alarmInfoDetails.map((detail, j) => {
      return (<AlarmItem key={"alarmItem-" + j} data={detail} parent={this}  time={new Date().getTime()} />);
    })
    let panels = this.state.alarmInfo.map((item, i) => {
      return <Panel header={item.name + " (" + item.count + ")"} key={item.id}>
        {this.state.isLoding ? <div style={{ textAlign: 'center', margin: '10px 0' }}><Spin tip="加载中..." />
        </div> : this.state.isAlarmItem ? alarmItems : null}
        {this.state.alarmInfoDetails.length != 0 && !this.state.isLoding ?
          this.state.isAlarmItem ? <div className='page-wrap' style={{ textAlign: 'center' }}>
            <Pagination
              size="small"
              pageSize={this.state.pageSize}
              current={this.state.pageNo}
              onChange={this.pageOnChange.bind(this)}
              total={this.state.totalCount}
            />
          </div> : null : null}
      </Panel>
    })
    const suffix = this.state.name ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
    return (<div>
      <div className="alarmTag">
        <div className="xhbj" onClick={this.clickXunhHander.bind(this)}>当前报警</div>
        <div className="lsbj" onClick={this.clickHistoryHander.bind(this)}>历史报警</div>
      </div>
      <div className="alarmList">
        {this.state.historySearch ? <div className="historySearch searchDiv">
          <Search className="historySearchInput searchInput" suffix={suffix} onSearch={this.changeSearch.bind(this)}
            placeholder="报警信息" />
          <div>
            <DatePicker
              className="dataPicker"
              disabledDate={this.disabledStartDate.bind(this)}
              showTime
              format="YYYY-MM-DD"
              locale={locale}
              value={startValue}
              placeholder="开始时间"
              onChange={this.onStartChange.bind(this)}
              onOpenChange={this.handleStartOpenChange.bind(this)}
            />
            <DatePicker
              style={endOpen ? { marginLeft: "-100px" } : null}
              className="dataPicker"
              disabledDate={this.disabledEndDate.bind(this)}
              showTime
              format="YYYY-MM-DD"
              locale={locale}
              value={endValue}
              placeholder="结束时间"
              onChange={this.onEndChange.bind(this)}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange.bind(this)}
            />
          </div>
        </div> : null}
        <div
          style={{ height: (window.document.documentElement.clientHeight - 235) - (this.state.historySearch ? 144 : 0) }}>
          <Scrollbars>
            {panels.length > 0 ?
              <Collapse accordion onChange={this.changeCollapse.bind(this)}>
                {panels}
              </Collapse> : null}
          </Scrollbars>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.alter.info,
    isAoTuAlter: state.alter.isAoTuAlter,
    alarmCount: state.alter.alarmCount
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeInfo: (data) => {
      dispatch(actionCreators.info(data))
    },
    changeAlarmCount: (data) => {
      dispatch(actionCreators.alarmCount(data))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassAlarm);
/* eslint-enable */