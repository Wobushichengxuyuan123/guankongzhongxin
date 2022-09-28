import React from "react";
import _ from 'lodash';
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
  getPpyaList = async (parameter) => {
    const {
      suddenEventInfo
    } = this.props;
    let url = '/zhdd-zhdd/yjzhYjjyEmergencyPlanAttachment/getEmergencyPlanAttachmentListByEventProperties';
    let data = {
      "eventProperties": suddenEventInfo.eventType,
      "pageIndex": 0,
      "pageSize": 0,
      "planDesc": "",
      "planProgrammeFlag": 0,
      "powerStationId": suddenEventInfo.powerStationId
    }
    let result = await fetch(url,{
      method: 'POST',
      body: JSON.stringify(data)
    })
    let res = await result.json();
    let ppyaList = [];
    if (res.successful) {
      ppyaList = res.resultValue.items || [];
      if(ppyaList.length == 0){ 
        return true
      }
      this.setState((state,props) => {
        return {
          ppyaList
        }
      })
    }
  }
  setRadioInitValue = (value) => {
    this.setState({
      value
    });
  }

  onChange = (modalTitle,planId,event) => {
    if (!this.state.value) {
      let value = event.target.value - 0;
      this.setState({
        value
      });
    }
    // this.props.changeModalTitle({
    //   modalTitle,
    //   planId
    // })
    // this.props.fun(true)
  };
  executePlan = (parameter) => {
    console.log('被点击',this.state.isExecuteFlag,this.state.value);
    const {
      suddenEventInfo,
      executePlan
    } = this.props;
    // 执行预案
    if(this.state.isExecuteFlag || !this.state.value) {
      console.log('停止执行');
      return true
    }
    let url = '/zhdd-zhdd/yjzhYjzhBattleSuddenEventInf/implementSuddenEventInf'
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
        executePlan({
          planId: this.state.value
        })
        console.log(res);
        window.parent.$message.success(res.flag)
        this.setState({isExecuteFlag:true})
        window.parent.$commit('changeSuddenEventPlanAttachmentId',this.state.value)
      } else {
        console.log(res);
        window.parent.$message.error(res.flag||'已执行过')
      }
    },error => {
      console.log(error);
    })
  }
  componentDidMount() {
    let {
      suddenEventInfo
    } = this.props;
    let planId = suddenEventInfo.planId ? suddenEventInfo.planId : null;
    if(planId==0 || planId) {
      this.setState({isExecuteFlag:true})
    }
    this.getPpyaList()
    this.setRadioInitValue(planId)
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    let {
      ppyaList,
      value
    } = _.cloneDeep(this.state)
    value = value ? value : null;
    return (
      <div className="ppya-box">
        {
          !ppyaList.length
          ? (
            <p>暂无信息..</p>
          )
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
                          <span>预演{item.numberStarts}次;</span>
                          <span>推荐值{item.recommendedValue}次;</span>
                        </div>
                      </Radio>
                    )
                  })
                }
                
              </Radio.Group>
              <div className={
                this.state.isExecuteFlag 
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
