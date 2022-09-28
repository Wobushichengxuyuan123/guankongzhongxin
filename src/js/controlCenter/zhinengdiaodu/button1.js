// ~ --------------------------------------------------import-------------------
import React, { cloneElement } from "react";
import {connect} from 'react-redux';

import PropTypes from 'prop-types'
import { Modal,Button } from "antd";
import GetCmtWsClientHelper from "@/js/utils/cmtWsClientHelper.js";
import cmtEvents from "@/js/utils/cmtEvents.js";
import {ztConfig,companyConfig} from "@/js/utils/cmt-config.js";
const { confirm } = Modal;
// ~ --------------------------------------------------class component-------------------
class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateName: {
        unInited: 0
        ,starting: 1
        ,restarting: 1
        ,tryConnecting: 2
        ,connected: 3
        ,logining: 4
        ,finished: 5
      }
      ,nMsoState: 0 //0, 没有监测过。1，已经运行了，那么重启。2，还没有启动，那么启动。启动后可以登录。
      //3，已经重启过了，可以登录了
      ,allCallList: []
    }
  }
  // ?-----------------------------------------------------cmt---------------------------
  timerTaskFunction = () => {
    let _that = this
    if (this.timerOpenWs != null) {
      clearTimeout(this.timerOpenWs);
    }
    this.loginTime++;
    console.log(this.loginTime,'重新连接次数!');
    //计算登陆超时超时
    if (this.loginTime > 5) {
      if (this.isShowModal || this.isShowModal2) {
        this.resetLoginTime();
        return
      } else {
        this.showConfirm({
          content: '注册失败,点击确定,将重新载入重试,取消则继续操作.',
          callback: window.location.reload,
          callbackParams: {
            flag: true
          },
          cancelCallback: this.resetLoginTime
        })
      }
      this.isShowModal = true;
    }
    this.mso = GetCmtWsClientHelper();
    this.cmtLoginRegister()
    this.timerOpenWs = setTimeout(function() {
      _that.timerTaskFunction();
    }, 1000);
  }
  tryOpenWs = () => {
    console.log('tryOpenWs');
    let _that = this
    this.loginTime = 0;
    if (this.timerOpenWs != null) {
      clearTimeout(this.timerOpenWs);
    }
    this.timerOpenWs = setTimeout(function() {
      _that.timerTaskFunction();
    }, 1000);
  }
  // ?-----------------------------------------------------methods---------------------------
  //#region 
  showConfirm  = (props) => {
    let {
      cancelCallback='',
      callbackParams='',
      type=null,
      title="您正在进行一些更新操作。",
      content="请确认您的操作无误.",
      callback=null
    } = props;
    confirm({
      keyboard: false,
      centered: true,
      title, 
      content,
      okText:"确认",
      cancelText:"取消",
      onOk:() => {
        // eslint-disable-next-line no-unused-expressions
        window.location.reload()
      },
      onCancel:() => {
        // eslint-disable-next-line no-unused-expressions
        cancelCallback ? cancelCallback() : ''
      },
    });
  }
  deleteAllGroup = (parameter) => {
    for (let index = 99010; index <= 99515; index++) {
      this.mso.deletePttGroupURL(
        ztConfig.ip,
        ztConfig.nPort,
        index,
        ztConfig.loginSinglePawn
      )
    }
  }
  // *按下讲话
  axjh = (axjhFlag) => {
    this.props.watchFun({
      emitType: 'axjh',
      buttonMso: this.mso,
      axjhFlag
    })
  }
  // *点击取消的时候触发此事件，
  resetLoginTime = () => {
    this.loginTime = 0;
    this.loginTime2 = 0;
    if (this.timerOpenWs != null) {
      clearTimeout(this.timerOpenWs);
    }
    return
  }
  // *注册登陆
  cmtLoginRegister = () => {
    console.log('----------正在进行注册----------');
    console.warn('注意此处登陆账号写死，后续接登陆的信息');
    // let res = this.mso.registerSip("8880001", "8880001", "192.168.1.182", "6050");
    let res = this.mso.registerSip(ztConfig.loginSinglePawn, ztConfig.loginSinglePawn, ztConfig.ip,ztConfig.registerSip);
    if (res == 0) {
      console.warn('此处地址已写死，请留意。');
      var videoPlayUrl =
      window.location.protocol +
      "//" +
      // window.location.host +
      // "192.168.1.182" +
      ztConfig.ip + ":" + ztConfig.nPort +
      "/" +
      // "andis/cmtPages.html#/videoPlayer?" +
      "vdis/videoPlayer?" +
      "user=" +
      ztConfig.loginSinglePawn +
      "&passwd=" +
      ztConfig.loginSinglePawn;
      this.mso.setServiceConfig("videoPlayUrl", videoPlayUrl);
      // 
      // this.mso.setServiceConfig("vdis", videoPlayUrl);
      console.log('----------注册成功----------');
    } else {
      this.loginTime2++
      console.log('注册次数',this.loginTime2);
      if (this.loginTime2 > 5) {
        console.log(this.isShowModal,this.isShowModal2);
          if (this.isShowModal || this.isShowModal2) {
            this.resetLoginTime();
            return
          } else {
            this.showConfirm({
              content: '注册失败,点击确定,将重新载入重试,取消则继续操作.',
              callback: window.location.reload,
              callbackParams: {
                flag: true
              },
              cancelCallback: this.resetLoginTime
            })
          }
          
        this.isShowModal2 = true;
      }
      console.log('----------注册失败----------');

    }
  }
  // 邀请
  lx = () => {
    alert('录像')
  }
  // 拍照
  pz = () => {
    alert('拍照')
  }
  // 退出
  xz = () => {
    alert('旋转')
  }
  // 邀请
  yq = () => {
    alert('邀请')
  }
  // 结束
  js = () => {
    this.props.watchFun({
      emitType: 'js'
      ,buttonMso: this.mso
    })
  }
  // 退出
  tc = () => {
    alert('退出')
  }
  //呼叫
  call = () => {
    this.props.watchFun({
      emitType: 'call'
      ,buttonMso: this.mso
      ,tryOpenWs:this.tryOpenWs
    })
  };
  //对讲
  dj = () => {
    this.props.watchFun({
      emitType: 'dj'
      ,buttonMso: this.mso
    })
  };
  //广播
  gb = () => {
    this.props.watchFun({
      emitType: 'gb'
      ,buttonMso: this.mso
    })
  };
  //视频
  sp = () => {
    this.props.watchFun({
      emitType: 'sp'
      ,buttonMso: this.mso
    })
  };
  //*会议
  hy = () => {
    this.props.watchFun({
      emitType: 'hy'
      ,buttonMso: this.mso
    })
  };
  // 定位
  dw = () => {
    this.props.watchFun({
      emitType: 'dw'
      ,buttonMso: this.mso
    })
  };
  // 监听
  jt = () => {
    alert("监听");
  };
  // 强插
  qc = () => {
    alert("强插");
  };
  // 转发
  zf = () => {
    alert("转发");
  };
  //短信
  dx = () => {
    this.props.watchFun({
      emitType: 'dx',
      buttonMso: this.mso
    })
  };
  // 拨号
  bh = () => {
    alert("拨号");
  };
  // 云控
  yk = () => {
    alert("云控");
  };
  //接听
  hangUp = () => {
    this.props.watchFun({
      emitType: 'handUp'
      ,buttonMso: this.mso
    })
    // if (this.props.comingCall) {
    //   let res = this.mso.answerCall(this.mso.callId, 0);
    //   if (res == -1) {
    //     console.warn('接听失败!')
    //   }
    // }
  };
  //挂断
  hangDown = () => {
    if (this.mso.callId || this.props.comingCall) {
      this.props.watchFun({
        emitType: 'handDown'
        ,buttonMso: this.mso
      })
    }
  };

  //#endregion
  // ?---------------------------------------------------componentDidMount---------------------------
  componentDidMount() {

    // 转移至Vue开启
    window.location = "CmtClientService://";
    // console.log('button 的 componentDidMount');
    /* 
    * 1. GetCmtWsClientHelper() 
    * 会进行一次，尝试打开websocket
    */
    this.mso = GetCmtWsClientHelper();
    this.loginTime2 = 0
    this.isShowModal = false;
    this.isShowModal2 = false;
    // *进行注册登陆，
    cmtEvents.on('opensuccess',() => {
      console.log('----------进入注册阶段----------');
      setTimeout(this.cmtLoginRegister,800)
    })
    // *失败，尝试再次连接
    cmtEvents.on('onerror',() => {
      // **开启托盘服务
      window.location = "CmtClientService://";
      // *再次连接托盘服务
      this.tryOpenWs()
      console.log('onerror');
    })
    cmtEvents.on('onEventRegistered',(parameter) => {
      let { code } = parameter
      if (code == 200) {
        console.log('----------登陆成功----------');
        if (this.timerOpenWs != null) {
          clearTimeout(this.timerOpenWs);
        }
        this.mso.subscribeAllPttGroupInfo()
        this.props.switchZhinengjianceloading({
          zhinengjianceloadingTip: '登陆成功',
        })
        window.sessionStorage.setItem('zhinengjianceloading','login-success')
      } else {
        // *登陆失败，尝试再次连接
        // **开启托盘服务
        window.location = "CmtClientService://";
        // *再次连接托盘服务
        this.tryOpenWs()
      }
    })
    window.addEventListener('unload', (parameter) => {
      // window.sessionStorage.removeItem('zhinengjianceloading')
      // let mso = GetCmtWsClientHelper()
      // mso.closeService()
      // window.localStorage.setItem('closebutton' + new Date().toISOString(),new Date().toLocaleString())
    })
  }
  // ? ----------------------------------------------------render-------------------------------
  render() {
    const isShowOnTheLine = () => {
      if (this.props.comingCall) {
        return (
          <Button>
            通话中...
          </Button>
        );
      } else {
        return null;
      }
    };
    const isShowHangUp = () => {
      if (this.props.comingCall && (this.props.comingCallInfo.length != 0)) {
        return (
          <Button onClick={this.hangUp} className={this.props.comingCall?'comingCall': ''}>
            接听
          </Button>
        );
      } else {
        return null;
      }
    };
    const isShowHangDown = () => {
      if (this.props.isShowHandDownBtn) {
        return (
            <Button onClick={this.hangDown}>挂断</Button>
        )
      } else {
        return null
      }
    }
    const isShowAxjhBtn = () => {
      if (this.props.isShowAxjhBtnFlag) {
        if (this.props.axjhFlag === 'call') {
          return (
            <Button onClick={this.axjh.bind(this,'call')}>按下讲话</Button>
          )
        } else {
          return (
            <Button onClick={this.axjh.bind(this,'cancel')}>取消讲话</Button>
          )
        }
      } else {
        return null
      }
    }
    const isShowJsBtn = () => {
      if (this.props.groupsInfoObj.panes.length) {
        if (this.props.axjhFlag === 'call') {
          return (
            <Button onClick={this.js}>结束</Button>
          )
        }
      } else {
        return null
      }
    }
    // ?----------------------------------------------------return--------------------------------
    return (
      <div className="btns-group">
        <div className="common-btns">
          <Button onClick={this.call}>呼叫</Button>
          <Button onClick={this.dj}>对讲</Button>
          <Button onClick={this.gb}>广播</Button>
          <Button onClick={this.sp}>视频</Button>
          <Button onClick={this.hy}>会议</Button>
          {/* <Button onClick={this.dw}>定位</Button> */}
          <Button onClick={this.dx}>短信</Button>
          {/* <Button onClick={this.deleteAllGroup}>删除所有数组</Button> */}
          { isShowJsBtn() }
        </div>
        <div className="response-btns">
          { isShowHangUp() }
          { isShowHangDown() }
          { isShowAxjhBtn() }
        </div>
        {/* <Button onClick={this.jt}>监听</Button> */}
        {/* <Button onClick={this.qc}>强插</Button> */}
        {/* <Button onClick={this.zf}>转发</Button> */}
        {/* <Button onClick={this.bh}>拨号</Button> */}
        {/* <Button onClick={this.yk}>云控</Button> */}
        {/* <Button onClick={this.lx}>录像</Button> */}
        {/* <Button onClick={this.pz}>拍照</Button> */}
        {/* <Button onClick={this.xz}>旋转</Button> */}
        {/* <Button onClick={this.yq}>邀请</Button> */}
        {/* <Button onClick={this.tc}>退出</Button> */}
      </div>
    );
  }
}
Buttons.propTypes = {
  watchFun: PropTypes.func,
}
export default Buttons;
