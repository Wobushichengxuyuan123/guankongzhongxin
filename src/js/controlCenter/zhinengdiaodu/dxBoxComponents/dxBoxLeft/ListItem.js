import React, { Component, Fragment } from 'react'

export default class ListItem extends Component {
  constructor(props) {
    super(props)
    this.contentRef = React.createRef();
    this.state = {
    }
  }
  clickHead = (parameter) => {
    let {
      sonfun
    } = this.props;
    console.log(parameter);
    let sipNum = []
    if (parameter['nIDGroup']) {
      parameter.members.forEach(item => {
        sipNum.push(item.key)
      })
    } else {
      sipNum.push(parameter.sipNum)
    }
    // sipNum = sipNum.join(',')
    console.log(this.props);
    sonfun({
      type: 'click-head',
      arg: {sipNum,sendSMSInfo:parameter}
    })
  }
  // filterContent = (config,alreadySendMsgPersons) => {
    
  // }
  // getSnapshotBeforeUpdate = () =>{
  //   return this.contentRef.current.scrollHeight
  // }
  // componentDidUpdate = (preProps, preState,parameter) =>{
  //   console.log(37,parameter);
  //   this.contentRef.current.scrollTop += this.contentRef.current.scrollHeight - parameter
  // }
  render() {
    let {
      config,
      alreadySendMsgPersons
    } = this.props;
    let currentDxAllContent = [];
    if (config['nIDGroup']) {
      let res = alreadySendMsgPersons.find(item => {
        return item.addressee == config['nIDGroup']
      })
      if(res) {
        currentDxAllContent = res.currentDxAllContent
        currentDxAllContent = [currentDxAllContent[currentDxAllContent.length - 1]]
      }
    } else {
      let res = alreadySendMsgPersons.find(item => {
        return item.addressee == config['sipNum']
      })
      if(res) {
        currentDxAllContent = res.currentDxAllContent
        currentDxAllContent = [currentDxAllContent[currentDxAllContent.length - 1]]
      }
    }
    console.log(this.props,20);
    return (
      <div className="list-item">
        <div onClick={this.clickHead.bind(this,config)} className="head">
          <div className="name">
            {config.name}:
          </div>
        </div>
        <ul ref={this.contentRef} className="content">
          {
            currentDxAllContent.map((item,index) => {
              return (
                <li key={index}>
                  <div className="time">
                    <span>{item.date}</span>
                  </div>
                  <div className="con">
                    <p>{item.content}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
