import React, { Component } from "react";
import { Input, Radio, Button, message } from "antd";
import { triggerType as triggerTypeSum } from "../trigger";
export default class broadCast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onlineUrl: "",
      file: null,
      radioGroupVal: "audio",
      btnTxt: '开始广播'
    }
  }
  componentDidMount() {
    let btnTxt = this.state.btnTxt;
    let radioGroupVal = this.state.radioGroupVal;
    if (this.props.btnKey == 31) {
      radioGroupVal = 'audio';
      btnTxt = '开始喊话';
    } else {
      radioGroupVal = 'file';      
      btnTxt = '开始广播';
    }
    this.setState({
      radioGroupVal,
      btnTxt
    })
    console.log(this.props.btnKey,'componentDidMount');
  }
  radioOnChange = (val) => {
    this.setState({radioGroupVal:val.target.value})
  }
  onInputChangeHandle = (e) => {
    let files = e.target.files;
    this.setState({file: files[0]})
    let mp4 = /mp4/ig;
    if ((files.length!==0)&&!mp4.test(files[0].type)) {
      message.error('请选择mp4文件');
    }
  }
  handler = (arg) => {
    let {type} = arg;
    let mp4 = /mp4/ig;
    let { radioGroupVal, file, onlineUrl } = this.state;
    if ((radioGroupVal!='audio')&&(!file||(!mp4.test(file.type)))) {
      message.error('请选择mp4文件');
      return true;
    }
    let {broadCastTrigger} = this.props;
    if (type === 'end') {
      broadCastTrigger({ triggerType: type })
    } else if(type === 'sure') {
      if (radioGroupVal === 'audio') {
        let configObj = {
          triggerType:radioGroupVal, 
          data: {
            triggerInfo: {
              txt: '语音广播',
              triggerType: triggerTypeSum.audioBroadCast
            }
          }
        }
        broadCastTrigger(configObj)
      } else {
        // file broadCast
        // 地址和选择文件只能存在一个
        if (file&&onlineUrl) {
          message.error('请勿同时播放多个本地/线上文件');
          return
        }
        let configObj = {
          triggerType:radioGroupVal, 
          data: {
            onlineUrl,
            file,
            triggerInfo: {
              txt: '文件广播',
              triggerType: triggerTypeSum.fileBroadCast
            }
          }
        }
        broadCastTrigger(configObj)
      }
    } else {
      broadCastTrigger({ triggerType: 'stop' + radioGroupVal })
    }
  }
  render() {
    let { createAudioBroadcast, btnKey } = this.props
    let { radioGroupVal,btnTxt } = this.state;
    return (
      <div className="alertGbBox">
        <Radio.Group  onChange={this.radioOnChange} value={radioGroupVal} >
          {
            btnKey === 31 
            ? <Radio value={"audio"}>喊话</Radio>
            : <Radio value={"file"}>广播</Radio>
          }
        </Radio.Group>
        {
          radioGroupVal == 'file'
          ? (
            <div className="file-input-div">
              <input type="file" onChange={this.onInputChangeHandle}/>
              {/* <Input onChange={this.setOnlineUrl} style={{marginTop: '8px'}} placeholder="请输入在线的音/视频" /> */}
            </div>
          )
          : null
        }
        <div className="buttonBox">
        <Button className="jixibtn" type="primary" onClick={this.handler.bind(this,{type:'sure'})} style={{ marginTop: 16, marginRight: 16 }} >{btnTxt}</Button>
          {/* {
            createAudioBroadcast
            ? (<Button className="jixibtn" type="primary" onClick={this.handler.bind(this,{type:'stop'})} style={{ marginTop: 16, marginRight: 16 }} >停止广播</Button>)
            : (<Button className="jixibtn" type="primary" onClick={this.handler.bind(this,{type:'sure'})} style={{ marginTop: 16, marginRight: 16 }} >开始广播</Button>)
          } */}
          {/* <Button className="jixibtn" type="primary" onClick={this.handler.bind(this,{type:'end'})}>退出广播</Button> */}
        </div>
      </div>
    )
  }
}
