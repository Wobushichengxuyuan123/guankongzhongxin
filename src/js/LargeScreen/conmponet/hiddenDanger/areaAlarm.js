import {Icon, Input, DatePicker, Collapse,  Pagination, Spin} from 'antd';
import {connect} from "react-redux";
import {actionCreators} from '../store'
import AlarmItem from '../alarmItem';
import {Scrollbars} from 'react-custom-scrollbars';
import moment from 'moment';
import React from 'react';

const Search = Input.Search;
const Panel = Collapse.Panel;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: moment(new Date(new Date().getTime() - 3 * 1000 * 60 * 60 * 24), 'YYYY-MM-DD'),
      endValue: moment(new Date(), 'YYYY-MM-DD'),
      endOpen: false,
      historySearch: false,
      alarmInfo: [],
      alarmInfoDetails: [],
      alarm_type: 1,
      type: 1,
      name: "",
      current: 1,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      pageId: 0,
      isAlarmItem: true,
      isLoding: true,
      resNum: 0 ,
      date:moment().format('YYYY-MM-DD')
    }
  }

  componentDidMount() {
    this.getAlarmInfo(this.state.type, this.state.alarm_type);
  }



  getAlarmInfo(type, alarm_type) {
    fetch("/nelda-smcc/public/analysis/alarmInfo",
    {
      method: 'POST',
        body: JSON.stringify({
          "date":this.state.date,
          "alarmType": "G",
          "type": '',
        })
    })
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({alarmInfo: b.data});
          //this.getAlarmInfoDetails(type, alarm_type, b.data[0].id, this.state.pageNo, this.state.pageSize)
          this.getAlarmInfoDetails(type, alarm_type, this.state.pageId, this.state.pageNo, this.state.pageSize)
          // this.getAlarmCount()
        }
      })
  }



  getAlarmInfoDetails(type, alarm_type, id, pageNo, pageSize) {
    if(this.state.pageId!==id){
      pageNo=1
    }
    fetch("/nelda-smcc/public/analysis/alarmInfoDetails",
    {
      method: 'POST',
        body: JSON.stringify({
          "alarmType": "G",
          "id":id,
          'date':this.state.date,
          "pageNo":1,
          "pageSize":10
        })
    })
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({
            alarmInfoDetails: b.data.list,
            pageNo: Number(b.data.pageNo),
            totalCount: Number(b.data.totalCount),
            isLoding: false
          });
        }else {
          if (this.state.resNum < 3) {
            this.getAlarmInfoDetails(type, alarm_type, id, pageNo, pageSize)
          } else {
            this.setState({resNum: 0})
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
      this.setState({endOpen: true});
    }
  }

  handleEndOpenChange(open) {
    this.setState({endOpen: open});
  }

  clickHistoryHander() {
    this.setState({historySearch: true, alarm_type: 2, alarmInfo: [], alarmInfoDetails: []});
  }

  clickXunhHander() {
    this.setState({historySearch: false, alarm_type: 1, startValue: null, endValue: null});
    this.getAlarmInfo(this.state.type, 1);
  }

  changeCollapse(id) {
    this.setState({
      pageId: id
    })
    if (id) {
      this.setState({isAlarmItem: true})
      this.getAlarmInfoDetails(this.state.type, this.state.alarm_type, id, this.state.pageNo, this.state.pageSize)
      if (!this.props.isAoTuAlter && this.props.info !== 0) {
        // let width = Number(document.getElementById("unityPlayer").childNodes[0].width)
        // window.MapContainer.changeWidth(width - 330);
      }
    } else {
      this.setState({isAlarmItem: false})
      if (!this.props.isAoTuAlter && this.props.info !== 0) {
        this.props.changeInfo(0)
        // let width = Number(document.getElementById("unityPlayer").childNodes[0].width)
        // window.MapContainer.changeWidth(width + 330);
      }
    }
  }

  changeSearch(e) {

    if ( e.trim()=="" ) {
      var param = "&type=" + this.state.type + "&start_time=" + this.state.startValue + "&end_time=" + this.state.endValue;
    } else if(e.trim() != ""){
      var param = "&type=" + this.state.type + "&name=" + e + "&start_time=" + this.state.startValue + "&end_time=" + this.state.endValue;
    }
    this.setState({alarmInfo: [], alarmInfoDetails: []});
    // let param = "?type=" + this.state.type + "&name=" + e + "&start_time=" + this.state.startValue + "&end_time=" + this.state.endValue;
    fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfoDetailsAndCount?=" + param +'&alarmType=G')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({alarmInfo: b.data});
        }
      })
  }

  emitEmpty() {
    this.setState({name: ""});
    this.getAlarmInfo(this.state.type, this.state.alarm_type, "", this.state.startValue, this.state.endValue);
  }

  pageOnChange(page) {
    this.setState({
      pageNo: page
    })
    this.getAlarmInfoDetails(this.state.type, this.state.alarm_type, this.state.pageId, page, this.state.pageSize)
  }

  render() {
    const {startValue, endValue, endOpen} = this.state;
    let alarmItems = this.state.alarmInfoDetails.map((detail, j) => {
      return (<AlarmItem key={"alarmItem-" + j} alterIndex={j} data={detail} parent={this}  time={new Date().getTime()}/>);
    })
    let panels = this.state.alarmInfo.map((item, i) => {
      return <Panel header={item.name + " (" + item.count + ")"} key={item.id}>
        {this.state.isLoding ? <div style={{textAlign: 'center', margin: '10px 0'}}><Spin tip="加载中..."/>
        </div> : this.state.isAlarmItem ? alarmItems : null}
        {this.state.alarmInfoDetails.length !== 0 && !this.state.isLoding ?
          this.state.isAlarmItem ? <div className='page-wrap' style={{textAlign: 'center'}}>
            <Pagination
              size="small"
              pageSize={this.state.pageSize}
              current={this.state.pageNo}
              onChange={this.pageOnChange.bind(this)}
              total={this.state.totalCount}
            />
          </div>
            : null
          : null}
      </Panel>
    })
    const suffix = this.state.name ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)}/> : null;
    return (<div>
      {/* <div className="alarmTag">
        <div className="xhbj" onClick={this.clickXunhHander.bind(this)}>当前风险</div>
        <div className="lsbj" onClick={this.clickHistoryHander.bind(this)}>历史风险</div>
      </div> */}
      <div className="alarmList">
        {this.state.historySearch ? <div className="historySearch searchDiv">
          <Search className="historySearchInput searchInput" suffix={suffix} onSearch={this.changeSearch.bind(this)}
                  placeholder="报警信息"/>
          <div>
            <DatePicker
              className="dataPicker"
              disabledDate={this.disabledStartDate.bind(this)}
              showTime
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="开始时间"
              onChange={this.onStartChange.bind(this)}
              onOpenChange={this.handleStartOpenChange.bind(this)}
            />
            <DatePicker
              style={endOpen ? {marginLeft: "-100px"} : null}
              className="dataPicker"
              disabledDate={this.disabledEndDate.bind(this)}
              showTime
              format="YYYY-MM-DD"
              value={endValue}
              placeholder="结束时间"
              onChange={this.onEndChange.bind(this)}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange.bind(this)}
            />
          </div>
        </div> : null}
        <div style={{height:'50vh'}}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Main);