import { Timeline } from "antd";
import React, { Component } from 'react'

class timeShaft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelineList: []
    }
  }
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  getTimeShaftData = async () => {
    let suddenEventInfo = this.getSuddenInfo();
    let data = {
      pageIndex: 0,
      pageSize: 0,
      suddenEventId: suddenEventInfo.actDeskId
    }
    let result = await fetch(
      window.ZHDD + '/yjzhYjzhSuddenEventDisposalProcessInfo/getSuddenEventDisposalProcessInfoList',
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    let res = await result.json();
    if (res.successful) {
      let timelineList = res.resultValue.items || [];
      if(timelineList.length == 0){ 
        return true
      }
      timelineList.sort(function(a,b) {
        return b.dateTime - a.dateTime
      })
      timelineList.forEach(item => {
        item.dateTime = new Date(item.dateTime).Format("yyyy-MM-dd hh:mm")
      })
      this.setState((state,props) => {
        return {
          timelineList
        }
      })
    }
  }
  componentDidMount() {
    this.getTimeShaftData()
  }
  render() {
    const {
      timelineList
    } = this.state;
    return (
      <div className="react-dispatch-right-timeShaft time-shaft-box">
        <p className="time-title">处理过程</p>
        <div className="time-shaft-list">
          {
            timelineList.length
            ? (
              <Timeline>
                {
                  timelineList.map(item => {
                    return (
                      <React.Fragment key={item.keyId}>
                        <Timeline.Item key={item.keyId}>
                          <p className="time-shaft-title">{item.dateTime}</p>
                          <div className="conBox">
                            <div className="head">【进展信息】</div>
                            <p className="content">
                              {item.disposalProcessDesc}
                            </p>
                          </div>
                        </Timeline.Item>
                      </React.Fragment>
                    )
                  })
                }
              </Timeline>
            )
            : <p>暂无此事件处理</p>
          }
        </div>
      </div>
    );
  }
}
export default timeShaft;
