//  历史回放
import { DatePicker, Icon, Input } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React from 'react';
import '../location.scss';
import '../playindex.scss';

const dateFormat = 'YYYY-MM-DD';

var flag = true
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stavalue: moment(),
      name: '',
      id: "",
      person_id: '',
      isMh: false,
      searchList: [],
      searchPrompt: true,
      searchResult: false,
      start_time: '',
      end_time: '',
      isShow: false,
      isplay: false,
      timeList: [],
      showTime: '',
      timeInfo: {},
      timer: null,
      speed: 4,//倍速
      showTimeGetTime: 0,//记录showtime的实际时间戳
      unit: 0,//每1毫秒对应的width
      timerone: null,  //   进度条
      domEndTime: null,//当前块的结束时间
    };
  }
  componentWillMount() {
    if (this.props.name) {
      this.setState({
        stavalue: moment(this.props.time),
        name: this.props.name,
        id: this.props.id
      })
      this.getSearchDetails(this.props.id, this.props.time)
    }
  }
  // 组件销毁
  componentWillUnmount() {
    // this.props.hendleClick();
    flag = true
    this.clearTime()
  }
  // 轨迹跳转请求
  getSearchDetails(id, time) {
    let data = moment(time).valueOf()
    this.clearTime()
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/trailGetPersonTimeSlice?id=' + id + '&time=' + data)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          let list = b.data
          let showTime = b.data[0].entrance_time ? moment(b.data[0].entrance_time * 1).format('HH:mm:ss') : "00:00:00"
          const nowTimeDate = new Date(this.state.stavalue)
          let startTime = nowTimeDate.setHours(0, 0, 0, 0)
          let lastTime = nowTimeDate.setHours(23, 59, 59, 999)
          let allTImeArea = lastTime - startTime//时间范围

          this.setState({
            timeInfo: {
              startTime,
              lastTime: list[list.length - 1].leave_time ?? null,
              allTImeArea
            },
            timeList: b.data,
            showTime,
            isShow: true,
            showTimeGetTime: b.data[0].entrance_time * 1,
            domEndTime: b.data[0].leave_time * 1
          })
        } else {
          this.setState({
            timeInfo: {
              startTime: null,
              lastTime: null,
              allTImeArea: null
            },
            timeList: [],
            showTime: null,
            isShow: false
          })
        }
      })

    //#region 
    //demo
    // let b={data:[
    //   {entrance_time:'1614479411000',leave_time:'1614483011000'},
    //   {entrance_time:'1614486611000',leave_time:'1614490211000'},
    //   {entrance_time:'1614497411000',leave_time:'1614508211000'},
    // ]}
    // let list=b.data
    // let showTime = b.data[0].entrance_time ? moment(b.data[0].entrance_time * 1).format('HH:mm:ss') : "00:00:00"
    // console.log(list[list.length-1].leave_time ?? null,'list[list.length-1].leave_time')

    //     const nowTimeDate = new Date(this.state.stavalue)
    //     let startTime = nowTimeDate.setHours(0, 0, 0, 0)
    //     let lastTime = nowTimeDate.setHours(23, 59, 59, 999)
    //     let allTImeArea = lastTime - startTime//时间范围

    //     this.setState({
    //       timeInfo: {
    //         startTime,
    //         lastTime:list[list.length-1].leave_time ?? null,
    //         allTImeArea
    //       },
    //       timeList: b.data,
    //       showTime,
    //       isShow:true
    //     })
    //demo
    //#endregion 
  }
  // 初始化请求
  getSearch(name) {
    if (!name) {
      name = "";
    }
    let datatime = moment()
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/trailGetPersonName?name=' + name + '&_=' + datatime)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ searchList: b.data });
        }
      })
  }
  searchFun(e) {
    this.clearTime()
    this.getSearchDetails(this.state.id, this.state.stavalue);
  }
  clearSearchInput() {
    this.setState({ name: "", isMh: false, id: "", searchPrompt: true, searchResult: false, isShow: false })
    window.PushData && window.PushData("GisGpsPCarEnd" + "@" + '轨迹回放');
  }
  changeSearchInput(e) {
    let isMh = false;
    let searchPrompt = true;
    let searchResult = false;
    if (e.target.value.trim() != "") {
      isMh = true;
      searchPrompt = false;
      searchResult = false;
    }
    this.setState({
      name: e.target.value,
      isMh: isMh,
      id: "",
      searchList: [],
      searchPrompt,
      searchResult
    });
    this.getSearch(e.target.value);
  }
  clickMhItemHander(name, id) {
    this.getSearchDetails(id, this.state.stavalue)
    this.setState({ name: name, isMh: false, id, searchPrompt: false, searchResult: true });
  }
  // 时间框选中时间 
  onChange(value) {
    this.setState({
      stavalue: moment(value),
      timeInfo: {
        startTime: null,
        lastTime: null,
        allTImeArea: null
      },
      timeList: [],
      resultList: [],
      showTime: null,
      isShow: false,
    }, function () {
      this.getSearchDetails(this.state.id, this.state.stavalue)
    })
    flag = true
  }
  // 前一天
  qian() {
    let acc = this.state.stavalue.valueOf();
    let add = acc - 1000 * 60 * 60 * 24;
    this.setState({
      stavalue: add
    }, function () {
      flag = true

    })
    this.onChange(add)
  }
  // 后一天
  hou() {
    let acc = this.state.stavalue.valueOf();
    let add = acc + 1000 * 60 * 60 * 24
    this.setState({
      stavalue: add
    }, function () {
      flag = true
    })
    this.onChange(add)
  }

  // 设置倍速
  four(value) {
    this.setState({
      speed: value
    }, function () {
      this.setTime()
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
    // let offsetLeft = e.currentTarget.offsetLeft//dom相对父元素距离
    let parentLeft = parentDom.offsetLeft//父元素，相对于其父元素的left
    let left = clientX - parentLeft//鼠标点击距离父元素left距离
    dom.style.left = left + 'px'
    //showTime时间更改
    let { startTime, allTImeArea, lastTime } = this.state.timeInfo
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
    }, function () {
      this.setTime()
    })
    let domEndTime = e.currentTarget.getAttribute('data-endtime')//当前播放范围的endTime
    dom.setAttribute('endtime', domEndTime)
    this.setThreeData(showTimeGetTime, domEndTime)//给三维传递数据
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
        // showTimeGetTime=nextTime
        // dom.style.left = nextDomLeft
        //当前块走完，跳转至下一视频块

        let { timeList } = this.state
        timeList.some((item, index) => {
          if (item.leave_time == domEndTime) {
            dom.setAttribute('endtime', timeList[index + 1].leave_time)//给showTime绑定新的endTime
            domEndTime = timeList[index + 1].leave_time

            showTimeGetTime = timeList[index + 1].entrance_time * 1//给showTime新的时间
            dom.style.left = timeList[index + 1].left
            dom.style.left = getComputedStyle(dom, null).getPropertyValue('left')
            // console.log(getComputedStyle(dom, null).getPropertyValue('left'), 'showTimeGetTime');
            // this.clearTime()
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

  //给三维传递数据
  setThreeData(showTimeGetTime, domEndTime) {
    let params = {
      pageNo: 1,
      pageSize: 10,
      sortKey: 'positioning_time',
      sortValue: 'ASC',
      searchItems: [{ "key": "person_id", "value": this.state.id }, { "key": "start_time", "value": showTimeGetTime }, { "key": "end_time", "value": domEndTime }],
    }
    let speed = {
      speed: this.state.speed
    }

    window.PushData && window.PushData("GisGpsPCar" + "@" + JSON.stringify({ url: 'http://192.168.1.180:9091/ppms-portal-web/public/personPosition/getPersonInfoBeforeADay', params, speed }))

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

    if (flag) {
      document.getElementById('showTime').style.left = left
      flag = false
    }

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
    // flag = true
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
      } else {
        clearInterval(this.state.timer)
        this.setState({ timer: null })
      }
    })
  }

  render() {
    const { isplay, timeList, showTime, speed } = this.state
    // 搜索人员
    let mhItems = this.state.searchList.map((item, i) => {
      return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, item.id)}
        className="mhItem">
        <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
          <img src={item.categoriesicon} /> : null}</div>
        <div className="name" title={item.name}>{item.name}</div>
      </div>;
    })
    //输入框 
    let searchInputButtons = <div>
      <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
      <span className="jg">︱</span>
      <Icon type="search" onClick={this.searchFun.bind(this, this.state.id)} />
    </div>

    //颜色块
    let info = timeList.map((item, index) => {
      let { left, width } = this.formatTime(item.entrance_time, item.leave_time)
      item.left = left
      return <div onClick={e => this.timeGo(e)} key={index} className='info' style={{ width, left }} data-endtime={item.leave_time}></div>
    })
    //生成时间刻度
    let timeBox = []
    for (let i = 0; i <= 24; i++) {
      let dom = <span className='timeBox' style={{ left: 100 / 24 * i + '%' }} key={i}>{i}</span>
      timeBox.push(dom)
    }
    //移动时间块
    let showTimeBox = <span id='showTime' className='zhiz' onClick={e => this.Playvideo(e)}>{showTime}</span>

    let beisu = <div className="closebtn">
      <div className='namexinxi'>加速播放</div>
      <div className={'namexinxi ' + (speed == 4 ? "active" : '')} onClick={this.four.bind(this, 4)}>4倍</div>
      <div className={'namexinxi ' + (speed == 8 ? "active" : '')} onClick={this.four.bind(this, 8)}>8倍</div>
      <div className={'namexinxi ' + (speed == 16 ? "active" : '')} onClick={this.four.bind(this, 16)}>16倍</div>
    </div>

    return (
      <div className="searchInfo">
        <div className="title">轨迹回放</div>
        <div className="searchDiv">
          <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)}
            addonAfter={searchInputButtons} placeholder="人员" />
        </div>
        <div className="mhss" style={{
          height: (window.document.documentElement.clientHeight - 170),
          display: this.state.isMh ? "block" : "none",
          overflow: 'auto'
        }}>
          {mhItems}
        </div>
        <div className='searchDiv shijian'>
          <span className='zuoyou' onClick={this.qian.bind(this)}></span>
          <DatePicker
            locale={locale}
            className="dataPicker"

            defaultValue={this.state.stavalue === undefined ? this.state.stavalue : null}
            value={this.state.stavalue}
            format={dateFormat}
            onChange={this.onChange.bind(this)}
          />
          <span className='mingtian' onClick={this.hou.bind(this)}></span>
        </div>

        <div id='demoP' style={{ display: this.state.isShow ? 'block' : 'block', }}>
          {info}
          {timeBox}
          {showTimeBox}
          {beisu}
        </div>
      </div>
    );
  }
}

export default Main;

/* eslint-enable */