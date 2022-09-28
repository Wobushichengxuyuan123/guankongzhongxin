import React from 'react';
import moment from 'moment';
import './time.scss'

/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stavalue: moment(),
      isplay: false,
      timeList: [],
      showTime: '00:00:00',
      timeInfo: {},
      timer: null,
      speed: 1,//倍速
      showTimeGetTime: 0,  //记录showtime的实际时间戳
      unit: 0,             //每1毫秒对应的width
      timerone: null,  //   进度条
      domEndTime: null,//当前块的结束时间
      iWndIndex: ''
    };
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillMount() {
    if (this.props.startTime && this.props.endTime)
      this.setState({
        iWndIndex: this.props.iWndIndex
      })
    this.getSearchDetails(this.props.startTime, this.props.endTime)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime && nextProps.endTime) {
      this.getSearchDetails(nextProps.startTime, nextProps.endTime)
    }
  }
  // 组件销毁
  componentWillUnmount() {
    this.clearTime()
  }
  
  isvideo = (value) => {
    this.getwid()
    this.setState({
      unit: this.state.unit,
      showTimeGetTime: value.showTime
    })
    let dom = document.getElementById('showTime')
    dom.style.left = value.left * 100 + '%'
    this.setTime()
  }
  isvideoOne = () => {
    this.setState({
      showTime: '00:00:00'
    })
    document.getElementById('showTime').style.left = '0' + 'px'
    this.clearTime()
  }
  iskuaijin = (value) => {
    this.setState({
      showTime: value.stateTime,
      // showTime: moment(value.showTime).format("HH:mm:ss")
    })
    this.setTime()

  }
  getSearchDetails(start, last) {
    let showTime = moment(start).format("HH:mm:ss")
    const nowTimeDate = new Date(start)
    let startTime = nowTimeDate.setHours(0, 0, 0, 0)  // 当天开始时间
    let lastTime = nowTimeDate.setHours(23, 59, 59, 999) // 当天结束时间
    let allTImeArea = lastTime - startTime//时间范围  // 当天时间范围值
    this.setState({
      timeList: [{ entrance_time: moment(start).valueOf(), leave_time: moment(last).valueOf() }],   //  传入的时间块
      timeInfo: {  startTime,  lastTime,  allTImeArea }, //当前时间条
      showTime,
      showTimeGetTime: moment(start).valueOf(),
      domEndTime: moment(last).valueOf()
    })
  }

  getwid() {
    let parentWidth = parseFloat(document.getElementById('timeP').offsetWidth)//父元素width
    let day = 86400//1天秒数
    let unit = parentWidth / day
    this.setState({
      unit
    })
  }
  //showTime 移动单位
  getUnit(e) {
    let parentWidth = parseFloat(getComputedStyle(e.currentTarget.parentNode, null).getPropertyValue('width'))//父元素width
    let day = 86400//1天秒数
    let unit = parentWidth / day
    this.setState({
      unit
    })
  }
  //进度条click
  timeGo(e) {
    e.stopPropagation();
    let parentDom = e.currentTarget.offsetParent//父元素
    let dom = document.getElementById('showTime')
    let parentWidth = parseFloat(getComputedStyle(e.currentTarget.parentNode, null).getPropertyValue('width'))//父元素width
    //处理showTime位置
    let clientX = e.clientX //相对窗口距离
    let parentLeft = parentDom.offsetLeft//父元素，相对于其父元素的left
    let left = clientX - parentLeft//鼠标点击距离父元素left距离
    dom.style.left = left + 'px'
    //showTime时间更改
    let { startTime, allTImeArea } = this.state.timeInfo
    let Accounted = left / parentWidth//点击位置相对于width的占比
    let showTimeGetTime = startTime + parseInt(allTImeArea * Accounted)//点击位置的时间戳
    let showTime = moment(showTimeGetTime).format('HH:mm:ss')
    //移动并修改showTime
    let day = 86400//1天秒数
    let unit = parentWidth / day
    this.setState({
      showTime,
      showTimeGetTime,
      unit,
      isplay: true
    }, () => {
      this.setTime()
      this.props.parent.timeGo({ stateTime: showTimeGetTime, endtime: domEndTime, showTime: showTimeGetTime, unit: Accounted, iWndIndex: this.props.iWndIndex })
    })
    let domEndTime = e.currentTarget.getAttribute('data-endtime')//当前播放范围的endTime
    dom.setAttribute('endtime', domEndTime)
  }
  //设置定时器
  setTime() {
    this.clearTime()
    let { showTimeGetTime, unit } = this.state
    let { lastTime } = this.state.timeInfo
    let dom = document.getElementById('showTime')
    let domEndTime = dom.getAttribute('endtime') * 1//当前播放范围的endTime
    let timer = setInterval(() => {
      showTimeGetTime += 1000
      if (showTimeGetTime >= lastTime) {
        alert('播放结束')
        return this.clearTime()
      }
      if (showTimeGetTime > domEndTime) {
        let { timeList } = this.state
        timeList.some((item, index) => {
          if (item.leave_time == domEndTime) {
            dom.setAttribute('endtime', timeList[index + 1].leave_time)//给showTime绑定新的endTime
            domEndTime = timeList[index + 1].leave_time
            showTimeGetTime = timeList[index + 1].entrance_time * 1//给showTime新的时间
            dom.style.left = timeList[index + 1].left
            dom.style.left = getComputedStyle(dom, null).getPropertyValue('left')
            this.setThreeData(showTimeGetTime, domEndTime)
            return true
          }
        })
      } else {
        dom.style.left = `${parseFloat(getComputedStyle(dom, null).getPropertyValue('left')) + unit}px`
      }
      this.setState({
        showTime: moment(showTimeGetTime).format('HH:mm:ss'),
        showTimeGetTime
      })
    }, 1000 / this.state.speed);
    this.setState({ timer })
  }
  //清除定时器
  clearTime() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({ timer: null })
    }
  }
  //时间占比处理
  formatTime(time1, time2) {
    let { startTime, allTImeArea } = this.state.timeInfo
    let demo1 = time1 - startTime//第一段时间 到 开始时间 占的数量
    let demo2 = time2 - time1//第一段时间 到 结束时间到开始时间 占的数量
    let left = this.toPercent(demo1 / allTImeArea)
    let width = this.toPercent(demo2 / allTImeArea)
    let obj = { left, width }
    return obj
  }
  //百分比转换
  toPercent(point) {
    var str = Number(point.toFixed(6) * 100).toFixed(1)
    str += "%"
    return str
  }
  // 控制暂停播放 
  Playvideo(e) {
    if (this.state.domEndTime) {
      this.getUnit(e)
      let dom = document.getElementById('showTime')
      dom.setAttribute('endtime', this.state.domEndTime)
      this.setState({
        domEndTime: null
      })
    }
    this.setState({
      isplay: !this.state.isplay
    }, function () {
      if (this.state.isplay == true) {
        this.setTime()
        this.props.parent.clickResume()
      } else {
        this.props.parent.clickPause()
        clearInterval(this.state.timer)
        this.setState({ timer: null })
      }
    })
  }
  render() {
    const { timeList, showTime } = this.state
    //颜色块
    let info = timeList.map((item, index) => {
      let { left, width } = this.formatTime(item.entrance_time, item.leave_time)
      item.left = left
      return <div onClick={e => this.timeGo(e)} key={index} className='info' style={{ width, left }} data-endtime={item.leave_time}></div>
    })
    //生成时间刻度
    let timeBox = []
    for (let i = 0; i <= 24; i++) {
      let dom = <span className={(i == 24) ? 'timeBoxone' : 'timeBox'} style={{ left: 100 / 24 * i + '%', }} key={i} >{'|'}
        <span style={{ marginLeft: '12px' }}>{i}{":00"}</span></span >
      timeBox.push(dom)
    }
    //移动时间块
    let showTimeBox = <span id='showTime' className='zhiz' onClick={e => this.Playvideo(e)}>{showTime}</span>
    return (
      <div id='timeP'>
        {info}
        <div className='infotop'>
          {timeBox}
        </div>
        {showTimeBox}
      </div>
    );
  }
}
export default Main;

/* eslint-enable */