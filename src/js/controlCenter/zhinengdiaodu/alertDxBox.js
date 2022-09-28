import React from "react";
import PropTypes from 'prop-types'
import _ from 'lodash'
import {ztConfig,companyConfig} from "@/js/utils/cmt-config.js";
// *-------------------------------------antd-component------------------------------------------
import { Icon, Input, Button,message } from 'antd';
import DxBoxLeft from "./dxBoxLeft";
const { TextArea } = Input;
// ~------------------------------------FunComponents--------------------------------------------
// #region funComponents
const LiItem = (props) => {
  // *如果单兵账号不等于当前用户账号则为左侧，
  const {sipNum,name,content,date} = props
  console.warn('此处账号写死.请及时修改');
  let flag = sipNum == ztConfig.loginSinglePawn ? true : false
  let infoDivClassName = `
  infoDiv 
  infoDiv_left 
  ${flag ? 'infoDiv_right' : ''}
  `
  let wrapFatherClassName = `
  ${
    flag 
    ? 'bubble-box-right arrow-right'
    : 'bubble-box-left arrow-left'
  }
  `
  return(
    <li>
      <div className={infoDivClassName}>
        <div className="timer">
          <span>
            {date}
          </span>
        </div>
        <div className="user">
          <span>{
            flag ? '我' : (name || sipNum)
          }</span>
        </div>
        <div className={wrapFatherClassName}>
          <div className="wrap">
            <span>{content}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
// #endregion
// ~------------------------------------export default--------------------------------------------
// #region 
export default class AlertDxBox extends React.Component {
  constructor(props) {
    super(props)
    this.showContentRef = React.createRef();
    this.state = {
      textAreaVal: ""
    }
  }
  getSnapshotBeforeUpdate = () =>{
    return this.showContentRef.current.scrollHeight
  }
  componentDidUpdate = (preProps, preState,parameter) =>{
    this.showContentRef.current.scrollTop += this.showContentRef.current.scrollHeight - parameter
  }
  static propTypes = {
    changeAlertDxBox: PropTypes.func.isRequired,
    // addressee: PropTypes.object.isRequired
  }
  // ~------------------------------------methods--------------------------------------------
  // #region methods
  findPersonTel = (parameter) => {
    let personList = this.props.personList
    let sendSMSInfo = this.props.sendSMSInfo
    let tel = ''
    let resObj = personList.find(item => {
      return item.equipmentCode == sendSMSInfo.sipNum
    })
    if (resObj) {
      tel = resObj.mobile_phone
    }
    return tel
  }
  msgTip = (type,text) => {
    message[type](text);
  };
  clearWillSendMsg = (parameter) => {
    this.setState((state, props) => {
      return {
        textAreaVal: ''
      }
    })
  }
  textAreaOnchange = (e) =>{
    let value = e.target.value;
    console.log(value);
    this.setState((state, props) => {
      return {
        textAreaVal: value
      }
    })
  }
  sendTelMsg = (parameter) => {
    let sendSMSInfo = this.props.sendSMSInfo
    console.log(this.props);
    if (Object.keys(sendSMSInfo).length == 0 || sendSMSInfo['nIDGroup'] || this.state.textAreaVal == '') {
      return true
    }
    let url = '/smsBoxsended/manualSmsBoxsending'
    let phones = this.findPersonTel()
    if (!phones) {
      this.msgTip('error','未找到要发送的手机号码.')
      return
    }
    let message =  this.state.textAreaVal
    let query = `?phones=${phones}&message=${message}`
    let fetchUrl  = url + query
    fetch(fetchUrl).then(r => r.json).then(res => {
      console.log(res);
      this.msgTip('success','发送成功')
    },err => {
      console.log(err);
      this.msgTip('error','发送失败')
    })
    this.clearWillSendMsg()
  }
  sendMessage = () => {
    let sendSMSInfo = this.props.sendSMSInfo;
    if (Object.keys(sendSMSInfo).length == 0) {
      return true
    }
    let sjr = ''
    if (sendSMSInfo['nIDGroup']) {
      sjr = sendSMSInfo['nIDGroup']
    } else {
      sjr = sendSMSInfo.sipNum
    }
    console.warn('warn');
    this.props.Mso.sendSMS(
      sjr,
      this.state.textAreaVal
    )
    this.clearWillSendMsg()
  }
  close = () => {
    this.props.changeAlertDxBox(0)
  }
  // #endregion
  // ~------------------------------------render--------------------------------------------
  // #region render
  render() {
    let {dxBoxLeftList,temDxBoxLeftList,newAddressee} = this.props;
    let lastDxBoxLeftList = [];
    lastDxBoxLeftList = dxBoxLeftList;
    if (temDxBoxLeftList.length > 0) {
      lastDxBoxLeftList = temDxBoxLeftList;
    }
    let addresseeLengthFlag = newAddressee.length > 0 ? true : false;
    let selectMembers = [];
    let sjr = selectMembers.join(',')
    if (addresseeLengthFlag) {
      sjr = newAddressee.join(',')
    }
    return (
      <div className="alertGbBox alertDxBox">
        <div className="leftBox">
          <DxBoxLeft
          alreadySendMsgPersons={this.props.alreadySendMsgPersons}
          sonfun={this.props.sonFun}
          dxBoxLeftList={lastDxBoxLeftList}
          ></DxBoxLeft>
        </div>
        <div className="rightBox">
          <div className="head">
            <div className="headLeft">
              <span>收件人：</span>
              <Input 
              disabled
              value={sjr}
              style={{width:'calc(100% - 100px)'}}
              />
            </div>
            <span 
            onClick={this.close}
            className="closeBtnBox">
              <Icon type="close-circle" />
            </span>
          </div>
          <div ref={this.showContentRef} className="showContent">
            <ul>
              {
                this.props.currentDxAllContent.map((item,index) => {
                  return <LiItem key={index} {...item}></LiItem>
                })
              }
            </ul>
          </div>
          <div className="insertContent">
            <TextArea 
            maxLength={150}
            onChange={ this.textAreaOnchange }
            value={ this.state.textAreaVal }
            placeholder="请输入发送的信息" 
            rows={4} 
            />
          </div>
          <div className="controlBtn">
            <Button 
              onClick={this.clearWillSendMsg}
              // style={{marginRight: '16px'}} 
              className="clearBtn" 
              type="primary">清空内容</Button>
            <Button onClick={this.sendMessage} className="sendBtn" type="primary">应用内发送</Button>
            <Button onClick={this.sendTelMsg} className="sendBtn" type="primary">短信发送</Button>
          </div>
        </div>
      </div>
    )
  }
  // #endregion
}
// #endregion