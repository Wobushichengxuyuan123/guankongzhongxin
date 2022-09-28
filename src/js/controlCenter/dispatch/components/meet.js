import React, { Component } from 'react'
import { Radio, Button } from "antd";
import { triggerType as triggerTypeSum } from "../trigger";
export default class meet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radioGroupVal: "audio"
    }
  }
  radioOnChange = (val) => {
    this.setState({radioGroupVal:val.target.value})
  }
  handler = (arg) => {
    let {type} = arg;
    let { radioGroupVal } = this.state
    let {meetTrigger} = this.props
    if (type === 'end') {
      meetTrigger({ triggerType: type })
    } else if(type === 'sure') {
      if (radioGroupVal === 'audio') {
        let configObj = {
          triggerType:radioGroupVal, 
          data: {
            triggerInfo: {
              txt: '语音会议',
              triggerType: triggerTypeSum.audioConference
            }
          }
        }
        meetTrigger(configObj)
      } else {
        let configObj = {
          triggerType:radioGroupVal, 
          data: {
            triggerInfo: {
              txt: '视频会议',
              triggerType: triggerTypeSum.videoConference
            }
          }
        }
        meetTrigger(configObj)
      }
    } else {
      meetTrigger({ triggerType: 'stop' + radioGroupVal })
    }
  }
  render() {
    // let { createAudioMeet } = this.props
    let { radioGroupVal } = this.state
    return (
      <div className="alertGbBox alertMeetBox">
        <Radio.Group  onChange={this.radioOnChange} value={radioGroupVal} >
          <Radio value={"audio"}>语音会议</Radio>
          <Radio value={"video"}>视频会议</Radio>
        </Radio.Group>
        <div className="buttonBox">
          {/* {
            createAudioMeet
            ? (<Button className='jixibtn' type="primary" onClick={this.handler.bind(this,{type:'stop'})} style={{ marginTop: 16, marginRight: 16 }} >停止会议</Button>)
            : (<Button className='jixibtn' type="primary" onClick={this.handler.bind(this,{type:'sure'})} style={{ marginTop: 16, marginRight: 16 }} >开始会议</Button>)
          } */}
          {/* <Button type="primary" onClick={this.handler.bind(this,{type:'stop'})} style={{ marginTop: 16, marginRight: 16 }} >停止会议</Button> */}
          <Button type="primary" onClick={this.handler.bind(this,{type:'sure'})} style={{ marginTop: 16, marginRight: 16 }} >开始会议</Button>
          {/* <Button className='jixibtn' type="primary" onClick={this.handler.bind(this,{type:'end'})}>退出会议</Button> */}
        </div>
      </div>
    )
  }
}
