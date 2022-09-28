import React, { Component } from 'react'
import ContItem from './contItem';
import Search from "../left/components/search";
export default class left extends Component {
  onClick = (item) => {
    let {shortLetterTrigger} = this.props
    shortLetterTrigger({
      triggerType: "setCurrentContent",
      data: item
    })
  }
  render() {
    let { allMsgContent } = this.props
    return (
      <div className="leftBox dx-con">
        <Search className="searchInput" placeholder="请输入人员名称" />
        <div className="main-content">
          {
            allMsgContent.map((v1,i1) => {
              return (
                <div key={i1} onClick={this.onClick.bind(this,v1)} className="msg-left-item">
                  <div className="head">{v1.theOtherSipNum}</div>
                  <div className="cont">
                    <ul>
                      {
                        v1&&v1.content.map((item,index) => {
                          return <ContItem key={index} {...item}></ContItem>
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
