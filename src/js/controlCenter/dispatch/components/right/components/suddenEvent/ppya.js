import React from "react";
import { Radio } from "antd";

class Ppya extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ppyaList: [],
      value: null,
      isExecuteFlag: false
    }
  }
  getPpyaList = () => {
    let suddenEventInfo = this.getSuddenInfo();
    if(!suddenEventInfo) {
      return true
    }
    let url = window.ZHDD + '/yjzhYjjyEmergencyPlanAttachment/getEmergencyPlanAttachmentListByEventProperties';
    let data = {
      "eventProperties": suddenEventInfo.eventType||"",
      "pageIndex": 0,
      "pageSize": 0,
      "planDesc": "",
      "planProgrammeFlag": 0,
      "powerStationId": suddenEventInfo.powerStationId||""
    }
    fetch(url,{ method: 'POST', body: JSON.stringify(data) })
    .then(r => r.json()).then(
      res => {
      let ppyaList = [];
      if (res.successful) {
        ppyaList = res.resultValue.items || [];
        if(ppyaList.length == 0){ 
          return true
        }
        this.setState({ppyaList})
      }      
    },err => {
      console.log(err);
    })
  }
  setRadioInitValue = () => {
    let suddenEventInfo = this.getSuddenInfo();
    if(!suddenEventInfo) {
      return true
    }
    let isExecuteFlag = false;
    if (!suddenEventInfo) {
      return true
    }
    if (suddenEventInfo.planExecStatus==1) {
      isExecuteFlag = true
    }
    let planId = suddenEventInfo.planId ? suddenEventInfo.planId : null;
    this.setState({ isExecuteFlag, value:planId });
  }
  onChange = (modalTitle,planId,event) => { 
    let suddenEventInfo = this.getSuddenInfo();
    if (suddenEventInfo&&suddenEventInfo.planExecStatus!==1) {      
      let value = event.target.value - 0; 
      this.setState({ value }); 
    }
  };
  executePlan = () => {
    let suddenEventInfo = this.getSuddenInfo();
    // 执行预案
    if(!this.state.value) { 
      return true
    }
    let url = window.ZHDD +'/yjzhYjzhBattleSuddenEventInf/implementSuddenEventInf'
    let data = {
      "actDeskId": suddenEventInfo.actDeskId,
      "createDate": "",
      "creater": "",
      "drillBeginDatetime": "",
      "drillEndDatetime": "",
      "drillJionPerson": "",
      "eventDisposalMeasure": "",
      "eventLatitude": "",
      "eventLevel": suddenEventInfo.eventLevel,
      "eventLevelName": "",
      "eventLongitude": "",
      "eventProcessDesc": "",
      "eventStateDesc": "",
      "eventStatus": 0,
      "eventSummingUp": "",
      "eventType": 0,
      "eventTypeName": "",
      "happenArea": "",
      "happenLocalPos": "",
      "isEventFlag": 0,
      "planId": this.state.value,
      "planName": 0,
      "powerStationId": suddenEventInfo.powerStationId,
      "powerStationName": "",
      "recordStatus": 0,
      "suddenEventNo": "",
      "suddenEventSample": ""
    }
    fetch(url,{
      method: 'POST',
      body:JSON.stringify(data)
    }).then(r => r.json())
    .then(res => {
      if (res.successful) {
        window.parent.$message&&window.parent.$message.success(res.flag)
        window.parent.$commit&&window.parent.$commit('changeSuddenEventPlanAttachmentId',{planId:this.state.value,planExecStatus:1})
        let suddenEventInfo = this.getSuddenInfo();
        suddenEventInfo.planExecStatus = 1;
        suddenEventInfo.planId = this.state.value;
        window.parent.sessionStorage.setItem('suddenEventInfo',JSON.stringify(suddenEventInfo))
      } else {
        console.log(res);
        window.parent.$message&&window.parent.$message.error(res.flag||'已执行过')
      }
    },error => {
      console.log(error);
    })
  }
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  componentDidMount() {
    this.getPpyaList()
    this.setRadioInitValue()
  }
  render() {
    const radioStyle = { display: 'block', height: '30px', lineHeight: '30px' };
    let { ppyaList, value } = this.state;
    console.log(ppyaList,129);
    let suddenEventInfo = this.getSuddenInfo();
    value = value ? value : null;
    return (
      <div className="ppya-box">
        {
          !ppyaList.length
          ? ( <p>暂无信息..</p> )
          : (
            <React.Fragment>
              <div className="ppya-list-title">已匹配最合适的应急预案</div>
              <Radio.Group value={value}>
                {
                  ppyaList.map(item => {
                    return (
                      <Radio onClick={this.onChange.bind(this,item.planDesc,item.planId)} key={item.planId} style={radioStyle} value={item.planId}>
                        <div className="item-title">{item.planDesc}</div>
                        <div className="item-info">
                          <span>启用{item.numberStarts}次;</span>
                          <span>预演{item.ylcsNum}次;</span>
                          <span>推荐值{item.recommendedValue}次;</span>
                        </div>
                      </Radio>
                    )
                  })
                }
              </Radio.Group>
              <div className={
                suddenEventInfo.planExecStatus==1
                ? "ppya-list-btn tab-content-common-btn disabled" 
                : "ppya-list-btn tab-content-common-btn"
              }
              onClick={this.executePlan}>执行预案</div>
            </React.Fragment>
          )
        }
      </div>
    );
  }
}
export default Ppya;
