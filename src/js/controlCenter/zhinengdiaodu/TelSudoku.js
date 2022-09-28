import React, { Component } from 'react'
import { Input,Button, Icon, Col, Row } from 'antd';
import './css/index.scss'
class BackGrid extends Component{
  insertCurrentText2 = (parameter) => {
    let {
      text
    } = parameter
    let {
      insertCurrentText
    } = this.props
    insertCurrentText({currentClickText:text})
  }
  render() {
    let {
      text
    } = this.props
    return (
      <li onClick={this.insertCurrentText2.bind(this,{text})} className="gridItem">
        {text}
      </li>
    )
  }
}
export default class TelSudoku extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridList: [1,2,3,4,5,6,7,8,9,'*',0,'#'],
      lastSipNum: "",
      currentClickText: ""
    }
  }
  // ~------------------------------------methods--------------------------------------------
  // #region methods
  callFun = (type) => {
    let  {
      lastSipNum: sipNum
    } = this.state
    let  {
      secBh
    } = this.props
    secBh({
      emitType: type,
      eventText: {
        sipNum
      }
    })
    this.clearInputCon()
  }
  headClose = (parameter) => {
    this.props.watchTelSudokuFun({
      emitType: 'hideTelSudoku'
    })
  }
  clearInputCon = (parameter) => {
    this.setState((state,props) => {
      return {
        currentClickText: "",
        lastSipNum: ""
      }
    })
  }
  inputOnchange = (parameter) => {
    let text = parameter.target.value
    if (!text) {
      return true
    }
    this.setState((state,props) => {
      return {
        lastSipNum: text
      }
    })
  }
  insertCurrentText = (parameter) => {
    let {
      currentClickText
    } = parameter
    let {
      lastSipNum
    } = this.state
    lastSipNum += currentClickText
    this.setState((state,props) => {
      return {
        currentClickText,
        lastSipNum
      }
    })
  }
  // #endregion
  render() {
    let {
      gridList,
      lastSipNum,
      
    } = this.state
    let {
      isHideTelSudoku
    } = this.props
    if(!isHideTelSudoku){
      return (
        <div id="telSudoku">
          <div className="head-close"><Icon onClick={this.headClose} style={{ fontSize: '16px' }} type="close-circle" /></div>
          <Row className="inputBox">
            <Col span={18}><Input onChange={this.inputOnchange} value={lastSipNum} placeholder="输入号码" /></Col>
            <Col span={6} className="clearBox">
              <div onClick={this.clearInputCon} className="clearInputConBtn">
                <div className="closeButton">
                  X
                </div>
              </div>
            </Col>
          </Row>
          <ul className="grid">
            {
              gridList.map(item => {
                return (
                  <BackGrid key={item} insertCurrentText={this.insertCurrentText} text={item}></BackGrid>
                )
              })
            }
          </ul>
          <div className="btn-control">
            <Button onClick={this.callFun.bind(this,'call')} value="small">语音呼叫</Button>
            <Button onClick={this.callFun.bind(this,'sp')} value="small">视频呼叫</Button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
