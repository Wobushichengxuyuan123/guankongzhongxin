import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { triggerType } from "../../../trigger";
import GetZhddXianHelper from '../../../utils/zhdd_xian';
class Buttons extends Component {
  constructor(props) {
    super(props);
    this.cmt = null;
    this.state = {
      allBtnTextList: [
        { key: 1, txt: "呼叫", triggerType: triggerType.goToPhone },
        { key: 2, txt: "对讲", triggerType: triggerType.tallBack },
        { key: 21, txt: "按下讲话", triggerType: triggerType.tallBackPressSpeak },
        { key: 22, txt: "按下听讲", triggerType: triggerType.tallBackPressListen },
        { key: 3, txt: "广播", triggerType: triggerType.broadCast },
        { key: 31, txt: "喊话", triggerType: triggerType.audioBroadCast },
        { key: 4, txt: "视频", triggerType: triggerType.video },
        { key: 5, txt: "会议", triggerType: triggerType.conference },
        { key: 6, txt: "定位", triggerType: triggerType.gpsSipNum },
        { key: 7, txt: "短信", triggerType: triggerType.msg },
        { key: 8, txt: "拨号", triggerType: triggerType.dial },
        { key: 9, txt: "一键通知", triggerType: triggerType.notification },
        { key: 10, txt: "接听", triggerType: triggerType.answer },
        { key: 11, txt: "挂断", triggerType: triggerType.handUp },
        { key: 12, txt: "退出", triggerType: triggerType.logOut },
        { key: 13, txt: "结束", triggerType: triggerType.end }
      ],
      btnTextList: [
        { key: 1, txt: "呼叫", triggerType: triggerType.goToPhone },
        { key: 2, txt: "对讲", triggerType: triggerType.tallBack },
        { key: 3, txt: "广播", triggerType: triggerType.broadCast },
        { key: 31, txt: "喊话", triggerType: triggerType.audioBroadCast },
        { key: 4, txt: "视频", triggerType: triggerType.video },
        { key: 5, txt: "会议", triggerType: triggerType.conference },
        // { key: 6, txt: "定位", triggerType: triggerType.gpsSipNum },
        // { key: 7, txt: "短信", triggerType: triggerType.msg },
        // { key: 8, txt: "拨号", triggerType: triggerType.dial },
        // { key: 9, txt: "一键通知", triggerType: triggerType.notification },
        // { key: 10, txt: "接听", triggerType: triggerType.answer },
        // { key: 11, txt: "挂断", triggerType: triggerType.handUp },
        // { key: 12, txt: "退出", triggerType: triggerType.logOut },
        // { key: 13, txt: "结束", triggerType: triggerType.end }
      ]
    };
  }
  trigger = (key) => {
    if (!this.cmt) {
      this.cmt = new GetZhddXianHelper();
    }
    let keyReg = /12|13|21|22/ig;
    if ((!(keyReg.test(key)))&&this.cmt&&this.cmt.isCallOrVideo) {
      message.error('请先结束其他音视频操作')
      return
    }
    if (key == 10) {
      this.cmt&&this.cmt.changeIsCallOrVideo(true);
    }
    let v = this.state.allBtnTextList.find(item => {
      return item.key == key
    })
    this.props.buttonsTrigger(v)
  };
  render() {
    let { redux_middleTabData, isShowPressSpeak, isShowPressTallBackBtn, 
      redux_acceptTheCallInfo 
    } = this.props;
    let { btnTextList } = this.state;
    return (
      <div ref={this.props.buttonsRef} className="buttons">
        {btnTextList.map((v) => {
          if (window.parent&&window.parent[v.triggerType + '-btn']) {
            return <Button className="jixibtn" key={v.key} onClick={this.trigger.bind(this, v.key)}>{v.txt}</Button>;
          } else {
            return null;
          }
        })}
        {
          (redux_middleTabData.length != 0)
            ? <Button className="jixibtn" onClick={this.trigger.bind(this, 13)}>结束</Button>
            : null
        }
        {/* {
          redux_acceptTheCallInfo
            ? (
              <React.Fragment>
                <Button id="answer" className="jixibtn topLight" onClick={this.trigger.bind(this, 10)}>接听</Button>
                <Button className="jixibtn topLight" onClick={this.trigger.bind(this, 11)}>挂断</Button>
              </React.Fragment>
              )
            : null
        } */}
        {
          isShowPressTallBackBtn
            ? (
              isShowPressSpeak
                ? <Button className="jixibtn" onClick={this.trigger.bind(this, 21)}>按下讲话</Button>
                : <Button className="jixibtn" onClick={this.trigger.bind(this, 22)}>按下听讲</Button>
            )
            : null
        }
      </div>
    );
  }
}
export default connect(
  state => ({
    redux_acceptTheCallInfo: state.dispatchReducer.acceptTheCallInfo,
    redux_middleTabData: state.dispatchReducer.middleTabData
  }),
  null
)(Buttons)
