import React, { Component } from 'react'
import ContItem from './contItem';
import Icon from '@ant-design/icons';
import GetCmtWsClientHelper from "@/js/utils/cmtWsClientHelper.js";
import {  Input, Button} from 'antd';
const { TextArea } = Input;

export default class right extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textAreaVal: "",
      cmtMso: GetCmtWsClientHelper(),
    }
  }
  sendMessage = () => {
    let { currentPersonInfo } = this.props
    let { cmtMso, textAreaVal } = this.state
    if (currentPersonInfo.theOtherSipNum == "") {
      return true
    }
    let sjr = ''
    if (currentPersonInfo['nIDGroup']) {
      sjr = currentPersonInfo['nIDGroup']
    } else {
      sjr = currentPersonInfo.theOtherSipNum
    }
    cmtMso.sendSMS( sjr, textAreaVal )
    this.clearWillSendMsg()
  }
  clearWillSendMsg = (parameter) => {
    this.setState((state, props) => {
      return {
        textAreaVal: ''
      }
    })
  }
  textAreaOnchange = (e) =>{
    let value = e.target.value;
    this.setState((state, props) => {
      return {
        textAreaVal: value
      }
    })
  }
  close = () => {
    let { shortLetterTrigger } = this.props
    shortLetterTrigger({ 
      triggerType: "close"
    })
  }
  render() {
    let { currentMsgContent, currentPersonInfo } = this.props
    let { textAreaVal } = this.state
    return (
      <div className="rightBox dx-con">
        <div className="head">
          <div className="headLeft">
            <span>收件人：</span>
            <Input disabled value={currentPersonInfo&&currentPersonInfo.theOtherSipNum} style={{width:'calc(100% - 100px)'}}/>
          </div>
          <span onClick={this.close} className="closeBtnBox">
            <Icon type="close-circle" />
          </span>
        </div>
        <div className="showContent">
          <ul>
            {
              currentMsgContent&&currentMsgContent.content.map((item,index) => {
                return <ContItem  key={index} {...item}></ContItem>
              })
            }
          </ul>
        </div>
        <div className="insertContent">
          <TextArea onChange={ this.textAreaOnchange } value={ textAreaVal } maxLength={150} placeholder="请输入发送的信息" rows={4} />
        </div>
        <div className="controlBtn">
          <Button onClick={this.clearWillSendMsg} className="clearBtn" type="primary">清空内容</Button>
          {/* <Button onClick={this.sendMessage} className="sendBtn" type="primary">应用内发送</Button> */}
          <Button className="sendBtn" type="primary">发送短信</Button>
        </div>
      </div>
    )
  }
}
