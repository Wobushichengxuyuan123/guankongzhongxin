// 历史定位
import { DatePicker,  Input, Pagination } from 'antd';
import Icon from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import '../alert.scss';
import '../location.scss';
import '../playindex.scss';
var flag = true
var tken = new Date().getTime() + '' + Math.ceil(Math.random() * 10)

class Historyplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: "area",
      areaList: [],   //  定位区域数据
      name: "",
      isMh: false,
      resultList: [],
      searchList: [],
      id: "",
      type: "",
      searchPrompt: true, //  定位区域显示
      searchResult: false,
      datetime: moment().startOf('day'),
      isShow: false,
      list: {},
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      isTime: false,
      speed: 8,
      showTime: '',
      timeList: [],
      isplay: false,
      timeInfo: {},
      timer: null,
      showTimeGetTime: 0,//记录showtime的实际时间戳
      unit: 0,//每1毫秒对应的width
      timerone: null,  //   进度条
      areaId: '',
      domEndTime: null,//当前块的结束时间
      isSart: 0
    };
  }
  // 加载时请求
  componentDidMount() {
    this.getAreaSearchDetails();  //  参建单位
  }
  // 销毁时触发
  componentWillUnmount() {
    clearInterval(this.timerone)
    flag = true
    this.setState({ timer: null, timerone: null })
  }

  // 关闭弹窗
  closeBox() {
    this.setState({
      isShow: false
    })
  }

  // 定位区域
  getAreaSearchDetails() {
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/newPersonInfo')
      .then(r => r.json())
      .then(b => {
        if (b) {
          let key = Object.keys(b)
          let data = key.map(item => {
            let valueArr = b[item].map(n => {
              return {
                location_area_name: n.area_name,
                location_area_id: n.area_id
              }
            })
            let obj = {
              location_area_name: item.substring(19, 25),
              children: [...valueArr]
            }
            return obj
          })
          this.setState({ areaList: data });
        }
      })
  }

  // 点击搜索图标 搜索
  searchFun() {
    this.getSearchDetails(this.state.name, this.state.datetime);
  }
  // 分页
  pageOnChange(page) {
    this.setState({
      pageNo: page
    })
    this.getSearchDetails(this.state.name, this.state.datetime, page, this.state.pageSize);
  }

  getSearchDetails(start) {

    let { showTimeGetTime, areaId, speed } = this.state
    let endtime = showTimeGetTime - 1000 * speed

    var searchItems = [
      { "key": "area_id", "value": areaId },
      { "key": "start_time", "value": showTimeGetTime },
      { "key": "end_time", "value": endtime },
      { "key": "isStart", "value": start },
      { "key": "perids", "value": "" },
      { "key": "tken", "value": tken }]

    let list = JSON.stringify(searchItems)
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/historyPositionByAreaAndTime?pageNo=1&pageSize=10&searchItems=' + list)
      .then(r => r.json())
      .then(b => {
        if (b.data && b.data.length > 0) {
          console.log(b.data.length,'length');
          this.setState({
            resultList: b.data || [],
            pageNo: Number(b.pageNo),
            totalCount: Number(b.totalCount),
          });
          window.PushData && window.PushData("GisPlayBack" + "@" + encodeURI(JSON.stringify(b.data)));
        }
      })
  }

  // 清空搜索框
  clearSearchInput() {
    flag = true
    clearInterval(this.timerone)
    clearInterval(this.state.timer)
    this.setState({
      name: "",
      isMh: false,
      type: "",
      id: "",
      searchPrompt: true,
      searchResult: false,
      resultList: [],
      timer: null,
      isTime: false,
      isShow: false,
      isSart: 0,
      timeInfo: {
        startTime: null,
        lastTime: null,
        allTImeArea: null
      },
    timeList: [],
    resultList: [],
    showTime: null,
    isTime: false,
    isSart: 0})
    window.PushData && window.PushData("GisGpsPCarEnd" + "@" + '历史回放');
  }

  // 输入框搜索
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
      type: "",
      id: "",
      resultList: [],
      searchList: [],
      searchPrompt,
      searchResult
    });
    this.getSearch(e.target.value);
  }

  //  搜索框
  getSearch(name) {
    if (!name) {
      name = '';
    }
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/ppms/personoverall/getPersonOverAll?searchItems=[{"key":"name","value":"' + name + '"}]')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ searchList: b.data });
        }
      })
  }

  clickMhItemHander(name, id, time) {
    this.GetPersonTimeSliceALL(id, time)
    this.setState(
      {
        name: name,
        isMh: false,
        areaId: id,
        searchPrompt: false,
        searchResult: true
      });
  }
  // 时间轴的请求
  GetPersonTimeSliceALL(areaId, time) {
    console.log(areaId);
    window.PushData && window.PushData("GisGpsPCarNowArea" + "@" + areaId);
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/trailGetPersonTimeSliceALL?areaId=' + areaId + '&time=' + time + '&perids=')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          let list = b.data
          let showTime = b.data[0].entrance_time ? moment(b.data[0].entrance_time * 1).format('HH:mm:ss') : "00:00:00"

          const nowTimeDate = new Date(this.state.datetime)
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
            isTime: true,
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
            isTime: false
          })
        }
      })

  }

  // 时间调用
  onChange(value) {
    this.setState({
      datetime: moment(value),
      timeInfo: {
        startTime: null,
        lastTime: null,
        allTImeArea: null
      },
      timeList: [],
      resultList: [],
      showTime: null,
      isTime: false,
      isSart: 0
    }, function () {
      this.GetPersonTimeSliceALL(this.state.areaId, this.state.datetime)
      clearInterval(this.state.timer)
      clearInterval(this.timerone)
      this.setState({ timer: null, timerone: null })
    })
    flag = true
  }
  // 详情
  details(item) {
    this.setState({
      isShow: true,
      list: item
    })
  }

  // 设置倍速
  four(value) {
    this.setState({
      speed: value
    }, function () {
      this.setTime()
      this.getList()
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
    }, function () {
      this.setTime()
      this.getList()
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
        clearInterval(this.timerone)
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
            return true

          }
        })
      }
      else {
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
  // 进度条点击请求
  getList() {
    this.timerone && clearInterval(this.timerone)
    this.getSearchDetails(this.state.isSart)
    this.setState({
      isSart: 1
    }, function () {
      this.timerone = setInterval(() => {
        this.getSearchDetails(this.state.isSart)
      }, 3000)
    })
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
      isplay: !this.state.isplay,
    }, function () {
      if (this.state.isplay == true) {
        this.getList()
        this.setTime()
      } else {
        clearInterval(this.state.timer)
        clearInterval(this.timerone)
        this.setState({ timer: null, timerone: null })
      }
    })
  }

  render() {
    const { timeList, showTime, speed, areaList, list } = this.state
    let positioningTime= list.positioning_time?moment(list.positioning_time*1).format('YYYY-MM-DD HH:mm:ss'):''
    // 定位区域
    let resultfun = (list = areaList, level = 1) => {
      return list.map(item => {
        let reval = <div onClick={this.clickMhItemHander.bind(this, item.location_area_name, item.location_area_id, this.state.datetime)}
          className={"level" + level} key={item.index}>{item.location_area_name}</div>;
        let relist = [];
        if (item.children) {
          relist = resultfun(item.children, level + 1);
        }
        relist.unshift(reval);
        return relist;
      });
    }

    // 搜索内容展示
    let mhItems = this.state.searchList.map((item, i) => {
      return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, item.area_id, this.state.datetime)}
        className="mhItem">
        <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
          <img src={item.categoriesicon} /> : null}</div>
        <div className="name" title={item.name}>{item.name}</div>
      </div>;
    })

    // 搜索后人员信息
    let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
      item.index = (i + 1);
      return <div className='hist' key={item.index}>
        <div className='information'>{item.index}.{item.person_name}
          <span className='inforight'>{item.company_name}</span>
        </div>
        <div className='liebiao'>

          <div onClick={this.details.bind(this, item)} className='details'>
            <div className='xiangqing'></div><div>详情</div>
          </div>
        </div>
      </div>
    }) : '暂无搜索数据';

    let searchInputButtons = <div>
      <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
      <span className="jg">︱</span>
      <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
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
    // 倍速
    let beisu = <div className="closebtn">
      <div className='namexinxi'>加速播放</div>
      <div className={'namexinxi ' + (speed == 4 ? "active" : '')} onClick={this.four.bind(this, 4)}>4倍</div>
      <div className={'namexinxi ' + (speed == 8 ? "active" : '')} onClick={this.four.bind(this, 8)}>8倍</div>
      <div className={'namexinxi ' + (speed == 16 ? "active" : '')} onClick={this.four.bind(this, 16)}>16倍</div>
    </div>

    return (
      <div className="searchInfo">
        <div className="title">搜索</div>
        <div className="searchDiv">
          <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)}
            addonAfter={searchInputButtons} />
        </div>
        <div className='time'>定位时间：
          <DatePicker
            locale={locale}
            className="dataPicker"
            defaultValue={this.state.datetime}
            value={this.state.datetime}
            onChange={this.onChange.bind(this)}
            format="YYYY-MM-DD  HH:mm:ss"
            placeholder="开始时间"
          />
        </div>
        <div className="mhss" style={{
          height: (window.document.documentElement.clientHeight - 170),
          display: this.state.isMh ? "block" : "none"
        }}>
          {mhItems}
        </div>
        {this.state.searchPrompt ?
          <div className="searchPrompt">
            <div className="tabs" style={{ display: "block" }}>
              <div className="tabs-title">
                <div className={this.state.tabSelected == "area" ? "active" : ""}
                >定位区域 </div>
              </div>
              {this.state.tabSelected == "area" ?
                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                  <div className="item" >
                    {resultfun()}
                  </div>
                </div>
                : null}
            </div>
          </div>
          : null}
        {this.state.searchResult ?
          <div className="searchResult" style={{ display: "block" }}>
            <Scrollbars style={{ height: (window.document.documentElement.clientHeight - 170) }}>
              {resultItems}
              {this.state.resultList.length != 0 ?
                <div className='page-wrap' style={{ textAlign: 'center' }}>
                  <Pagination
                    size="small"
                    pageSize={this.state.pageSize}
                    current={this.state.pageNo}
                    onChange={this.pageOnChange.bind(this)}
                    total={this.state.totalCount}
                  />
                </div> : null}
            </Scrollbars>
          </div>
          : null}

        {/* 详情弹窗 */}
        <div className="alterwrap"  style={{
            display: this.state.isShow ? 'block' : 'none',
            bottom:'auto'
          }}>
          <div className="alarm" style={{lineHeight: 2,position:'static'}}>
            {this.state.list.d_type == 0 ? <div className="contentbox" style={{position:'static'}}>
              <div className="closebtn">
                <div className='namexinxi'>人员信息</div>
                <div className="closeicon" onClick={this.closeBox.bind(this)}></div>
              </div>
              <div className="contenttext">
                <div className="texttitle">
                  <span className="text">姓名：</span><span className="text">{this.state.list.person_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text">手机：</span><span className="text">{this.state.list.mobile}</span>
                </div>
                <div className="texttitle">
                  <span className="text">出生日期：</span><span className="text">{this.state.list.birthday}</span>
                </div>
                <div className="texttitle">
                  <span className="text">身份证号：</span><span className="text">{this.state.list.idcard}</span>
                </div>
                <div className="texttitle">
                  <span className="text">公司：</span><span className="text">{this.state.list.company_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text">职务：</span><span className="text">{this.state.list.post}</span>
                </div>
                <div className="texttitle">
                  <span className="text">工种：</span><span className="text">{this.state.list.work_type_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text">工号：</span><span className="text">{this.state.list.person_no}</span>
                </div>
                <div className="texttitle">
                  <span className="text">设备编号：</span><span className="text">{this.state.list.equipment_no}</span>
                </div>
                <div className="texttitle">
                  <span className="text">区域：</span><span className="text">{this.state.list.area_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text">定位时间：</span><span className="text">{positioningTime}</span>
                </div>
                <div className="texttitle">
                  <span className="text">心率：</span><span className="text">{this.state.list.heartrate}</span>
                </div>
                <div className="texttitle">
                  <span className="text">血压高压：</span><span className="text">{this.state.list.highpressure}</span>
                </div>
                <div className="texttitle">
                  <span className="text">血压低压：</span><span className="text">{this.state.list.lowpressure}</span>
                </div>
              </div>
            </div> : <div className="contentbox" style={{position:'static'}}>
              <div className="closebtn">
                <div className='namexinxi'>车辆信息</div>
                <div className="closeicon" onClick={this.closeBox.bind(this)}></div>
              </div>
              <div className="contenttext">
                <div className="texttitle">
                  <span className="text">车牌号：</span><span className="text">{this.state.list.person_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text"> 类型：</span><span className="text">{this.state.list.work_type_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text"> 组织机构：</span><span className="text">{this.state.list.company_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text"> 区域：</span><span className="text">{this.state.list.area_name}</span>
                </div>
                <div className="texttitle">
                  <span className="text">定位时间：</span><span className="text">{positioningTime}</span>
                </div>

              </div>
            </div>}
          </div>
        </div>
        {/* 时间轴 */}
        <div id='demoP' style={{ display: this.state.isTime ? 'block' : 'none', }}>
          {info}
          {timeBox}
          {showTimeBox}
          {beisu}
        </div>
      </div>
    );
  }
}
export default Historyplay;

/* eslint-enable */