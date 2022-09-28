import React from "react";
import PropTypes from 'prop-types' 
// import ".././css/particulars.scss";
// ~ --------------------------------------------------class component-------------------
class Sjxq extends React.Component {
  // ?-------------------------------------------------constructor---------------------------
  constructor(props) {
    super(props);
    this.state = {
      sjxqList: [
        { title: '事件简题: ', prop: 'suddenEventSample', content: "" },
        { title: '事件来源: ', prop: 'suddenEventSource', content: "" },
        { title: '事件类别: ', prop: 'eventTypeName', content: "" },
        { title: '事件级别: ', prop: 'eventLevelName', content: "" },
        { title: '发生区域: ', prop: 'happenAreaName', content: "" },
        // { title: '开始时间: ', prop: 'drillBeginDatetime', content: "" },
        { title: '发生时间: ', prop: 'createDate', content: "" },
        { title: '结束时间: ', prop: 'drillEndDatetime', content: "" },
        { title: '事件经度: ', prop: 'eventLongitude', content: "" },
        { title: '事件纬度: ', prop: 'eventLatitude', content: "" },
        { title: '事件描述: ', prop: 'eventStateDesc', content: "" },
        // { title: '创建人: ', prop: 'creater', content: "" },
        // { title: '发生时间: ', prop: 'createDate', content: "" },
        // { title: '预警状态: ', prop: 'eventStatus', content: "" },
        // { title: '审核状态: ', prop: 'recordStatus', content: "" },
      ]
    };
  }
  // ?---------------------------------------------------methods---------------------------
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  getSjxqList = () => {
    let suddenEventInfo = this.getSuddenInfo();
    let data = {
      actDeskId: suddenEventInfo.actDeskId
    }
    fetch(window.ZHDD + '/yjzhYjzhBattleSuddenEventInf/getSuddenEventInfById', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => { return res.json() })
    .then((result) => {
      if (result.resultValue['createDate']) {
        result.resultValue['createDate'] = new Date(result.resultValue['createDate']).Format("yyyy-MM-dd hh:mm")
      }
      if (result.resultValue['drillBeginDatetime']) {
        result.resultValue['drillBeginDatetime'] = new Date(result.resultValue['drillBeginDatetime']).Format("yyyy-MM-dd hh:mm")
      }
      if (result.resultValue['drillEndDatetime']) {
        result.resultValue['drillEndDatetime'] = new Date(result.resultValue['drillEndDatetime']).Format("yyyy-MM-dd hh:mm")
      }
      let ar = this.state.sjxqList.slice()
      ar.forEach((item) => {
        for(const key in result.resultValue) {
          if (item.prop == key) {
            item.content = result.resultValue[key]
          }
        }
      })
      this.setState((state, props) => {
        return {
          sjxqList: ar
        }
      })
    }).catch((error) => {
      console.log(error, 'error');
    })
  }
  // ?---------------------------------------------------componentDidMount---------------------------
  componentDidMount() {
    this.getSjxqList()
  }
  // ?---------------------------------------------------render---------------------------
  render() {
  // ?---------------------------------------------------return---------------------------
    return (
      <div className="sjxq-box">
        {
          this.state.sjxqList.map((item) => {
            return (
              <div key={ item.prop } className="sjxq-list-item">
                <span className="item-title">{ item.title }</span>
                <span className="item-content">{ item.content }</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}
Sjxq.propTypes = {
  suddenEventInfo: PropTypes.object
}

export default Sjxq;
