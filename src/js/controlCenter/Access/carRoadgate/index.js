// 车辆道闸
import '../../container/css/entranceGuard.scss';
import { Input, Collapse, Spin, message } from 'antd';
import EntranceGuardItem from '../../container/entranceGuardItem';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import CarTables from '../compones/cartablecopy'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import carimg from '../../container/img/car.png';
import SwiperCore, { Keyboard, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]);

const Search = Input.Search;
const Panel = Collapse.Panel;
/* eslint-disable */
class CarRoadgate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      entranceGuardList: [],
      sname: null,
      isLoding: true,
      resNum: 0,
      isshow: true,
      type: 1,
      isAll: 'all',
      equipmentid: '',
      echartsList: [],
      tableList: [],
      daozhaList: [],
      caralertList: [],
      isactive: "",
      caralert: false,
      isactive:'1'
    }
  }

  componentDidMount() {
    this.getEntranceGuardInfo();
    this.getList();
    this.daozha1()
    this.time = setInterval(() => {
      clearInterval(this.state.timer)
      this.getList();
      this.daozha1()
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.time)
  }

  getEntranceGuardInfo(name) {
    let projectId = window.sessionStorage.getItem("projectId")
    if (!name) {
      name = "";
    }
    this.setState({ sname: name });
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfo?name=" + name + '&state=1' + '&projectId=' + projectId)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          this.setState({ areaList: b.data || [] });
        }
      })
  }

  entranceGuardInfoByAreaId(id) {
    if (id) {
      this.setState({ isLoding: true, resNum: this.state.resNum + 1 })
      var seqname = this.state.sname === null ? "" : "&eqment_name=" + this.state.sname;
      fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfoByAreaId?area_id=" + id + seqname + '&state=1')
        .then(r => r.json())
        .then(b => {
          if (b.data) {
            if (b.msg === "success") {
              this.setState({ entranceGuardList: b.data, isLoding: false });
            }
          } else {
            if (this.state.resNum < 3) {
              this.entranceGuardInfoByAreaId(id)
            } else {
              this.setState({ resNum: 0 })
              // message.error('服务器异常!请稍后再试!')
            }
          }
        })
    }
  }

  echartsClick = (equipmentid) => {
    this.daozha(equipmentid)
    this.setState({ equipmentid: equipmentid })
    this.selectPersonOutEnterTj(equipmentid)
    this.getList(equipmentid, 1, 'all')
    this.equipment(equipmentid)
  }

  equipment = (equipmentid) => {
    this.setState({
      equipmentid: equipmentid,
      isactive: equipmentid
    })
    this.getList(equipmentid, 1, 'all')
  }

  changeCollapse(id) {
    this.setState({ entranceGuardList: [] });
    setTimeout((() => {
      this.entranceGuardInfoByAreaId(id);
    }).bind(this), 200);
  }

  daozha1() {
    var projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/pubPersonCarDoor/getEquipmentData",
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectId,
          type: 1,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "success") {
          this.setState({
            daozhaList: res.data.list
          })
          for (var i = 0; i < this.state.daozhaList.length; i++) {
            this.state.daozhaList[i].switch = false
          }
        }
      })
  }

  daozha(id) {
    var projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/pubPersonCarDoor/getEquipmentData",
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectId,
          type: 1,
          equipmentId: id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "success") {
          if (this.state.daozhaList.length == 0) {
            this.state.daozhaList.push(res.data.list[0])
            this.setState({
              daozhaList: this.state.daozhaList
            })
          } else {
            var arronce = this.state.daozhaList;
            var flag = arronce.some(function (arr) {
              return arr.id == id
            })
            if (flag) {
              message.error("设备已存在")
            } else {
              this.state.daozhaList.push(res.data.list[0])
              this.setState({
                daozhaList: this.state.daozhaList
              })
            }
          }
        }
      })
  }
  // echarts
  selectPersonOutEnterTj = (id) => {
    let projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/public/pubStatisics/selectEnterOutTj",
      {
        method: 'POST',
        body: JSON.stringify({ type: this.state.type, equipmentId: id, projectId: projectId }),
      })
      .then(r => r.json())
      .then(res => {
        this.setState({
          echartsList: res.data
        })
      })
  }
  // 道闸列表
  getList = (id, type, isAll) => {
    let projectId = window.sessionStorage.getItem("projectId")
    if (isAll == undefined) {
      var params = { pageNo: 1, pageSize: 10, type: this.state.type, projectId: projectId, isAll: 'all' }
    } else {
      var params = { pageNo: 1, pageSize: 10, type: type, equipmentId: id, projectId: projectId, isAll: isAll }
    }
    fetch("/nelda-smcc/public/pubStatisics/selectEnterOutList",
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "success") {
          this.setState({
            tableList: res.data.list || []
          }) 
        }
      })
  }
  deletebox = (item, index, e) => {
    e.stopPropagation();
    for (var i = index, len = item.length - 1; i < len; i++)
      item[i] = item[i + 1];
    item.length = len;
    this.setState({
      daozhaList: item
    })
  }
  initDoorType(id) {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/getDoorStatusByUuids?doorUuids=" + id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setStatus(b.data[0].doorStatus);
        }
      })
  }
  isdoor = (type, id) => {
    let arr = this.state.daozhaList
    let index = (arr || []).findIndex((item) => item.id === id)
    if (type == 1) {
      let type = false
      this.state.daozhaList[index].switch = type
      this.setState({
        daozhaList: this.state.daozhaList
      })
    } else {
      let type = true
      this.state.daozhaList[index].switch = type
      this.setState({
        daozhaList: this.state.daozhaList
      })
    }
  }
  isdoorbtn = (id, index, e) => {
    e.stopPropagation();
    this.state.daozhaList[index].switch = !this.state.daozhaList[index].switch
    this.setState({
      daozhaList: this.state.daozhaList
    }, function () {
      if (this.state.daozhaList[index].switch) {
        let type = 0;
        console.log('开门');
        fetch(window.SYSTEM_NELDA_OUTAPI + "/entranceguard/controlBarrierByRoadwayUuid?roadwayUuid=" + id + "&command=" + type)
          .then(r => r.json())
          .then(b => {
            if (b.msg === "success") {
              setTimeout(() => {
                this.initDoorType(id);
              }, 1000)
              message.success("操作成功！")
            } else {
              message.error("操作失败！")
            }
          })
      } else {
        let type = 1;
        console.log('关门');
        fetch(window.SYSTEM_NELDA_OUTAPI + "/entranceguard/controlBarrierByRoadwayUuid?roadwayUuid=" + id + "&command=" + type)
          .then(r => r.json())
          .then(b => {
            if (b.msg === "success") {
              setTimeout(() => {
                this.initDoorType(id);
              }, 1000)
              message.success("操作成功！")
            } else {
              message.error("操作失败！")
            }
          })
      }
    })
  }
  carinfo = (data) => {
    this.setState({
      caralert: true,
      caralertList: data
    })
  }
  chose() {
    this.setState({
      caralert: false,
      caralertList: []
    })
  }
  daozhajinchu = (value, type, isAll) => {
    this.setState({
        isactive:value
    })

    this.getList(this.state.equipmentid,type, isAll)
}
  render() {
    let { entranceGuardList, isshow, tableList, caralert, caralertList } = this.state
    let items = entranceGuardList.map((item, i) => {
      item.index = i + 1;
      return <EntranceGuardItem key={"EntranceGuardItem" + i} data={item} echartsClick={this.echartsClick.bind(this)} isdoor={this.isdoor.bind(this)} />
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="entranceGuardList">
          {this.state.isLoding ? <div style={{ textAlign: 'center', margin: '10px 0' }}><Spin tip="加载中..." />
          </div> : items}
        </div>
      </Panel>
    })
    let daozha = this.state.daozhaList.map((item, index) => {
      let car = item.js + item.jl + item.sj + item.sg +item.qt;
      if (item.inof == [] || item.info.length == 0) {
        var obj = {};
        obj.organizationName = '';
        obj.carNo = '';
        obj.name = '';
        obj.img = carimg;

        item.info.push(obj);
      } else {
        if (item.info[0].img == '') {
          item.info[0].img = carimg
        } else {
          item.info[0].img = item.info[0].img
        }
      }

      return <SwiperSlide style={{ width: '200px' }} key={index}>
        <div style={{ height: '100%', cursor: 'pointer' }} className={this.state.isactive == item.id ? 'mjactive' : 'mjnotactive'} onClick={this.equipment.bind(this, item.id)}>
          <div className='item-box'>
            <div className="deletebtn" onClick={this.deletebox.bind(this, this.state.daozhaList, index)}>
              <Icon type="close" />
            </div>
            <div className='item-up'>
              <div className='item-content'>
                <div style={{ textAlign: 'center' }}>
                  <h3>{item.name}</h3>
                </div>
                <div style={{ height: '46%', display: 'flex' }}>
                  <div className='left-item-content'>
                    <p>建设单位：<span>{item.js}</span></p>
                    <p>监理单位：<span>{item.jl}</span></p>
                    {/* <p>其他：<span>2</span></p> */}
                  </div>
                  <div className='right-item-content'>
                    <p>设计单位：<span>{item.sj}</span></p>
                    <p>施工单位：<span>{item.sg}</span></p>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '18px', color: '#fff', width: '50%', marginLeft: '5%' }}>洞内车辆：<span>{car.toString()}</span></p>
                  <p style={{ fontSize: '18px', color: '#fff', width: '20%' }}>其他:<span>{item.qt}</span> </p>
                  <div style={{ width: '30px', height: "26px" }} className={item.switch ? 'opendoor' : 'closedoor'}
                    onClick={this.isdoorbtn.bind(this, item.id, index)} title={item.switch ? '关门' : '开门'}></div>
                </div>
              </div>
            </div>
            <div className='item-below'>
              <div style={{ height: '100%', display: 'flex', marginTop: '2%' }}>
                <div className='left-item-content' style={{ width: '60%', marginLeft: '5%' }}>

                  <p style={{ marginBottom: '1rem' }}>单位：<span className='textColor'>{item.info[0].organizationName}</span></p>
                  <p style={{ marginBottom: '1rem' }}>车牌号：<span className='textColor'>{item.info[0].carNo}</span></p>
                  <p style={{ marginBottom: '1rem' }}>驾驶员：<span className='textColor'>{item.info[0].name}</span></p>
                  {/* <p>方向：<span className='textColor'>进</span></p> */}
                </div>
                <div className='right-item-content' style={{ width: '50%' }}>
                  <div className='rightImg'>
                    <img src={item.info[0].img}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    })
    return (<div className="entranceGuard">
      <div className="title">车辆道闸</div>
      <div>
        <div className="searchDiv" style={{ paddingTop: 20 }}>
          <Search className="entranceGuardSearchInput searchInput" placeholder="请输入道闸名称"
            onSearch={this.getEntranceGuardInfo.bind(this)} />
        </div>
        <div style={{ height: (window.document.documentElement.clientHeight - 200) }}>
          <Scrollbars>
            {panels ?
              <Collapse accordion onChange={this.changeCollapse.bind(this)}>
                {panels}
              </Collapse>
              : null}
          </Scrollbars>
        </div>
      </div>
      <div className="entranceguand-right" style={{ display: isshow ? 'block' : 'none', }}>
        <div className='left-ent'>
          <Swiper
            style={{ height: '100%' }}
            spaceBetween={20}
            slidesPerView={4}
            // navigation={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {daozha}
          </Swiper>
        </div>
        <div className='right-ent'>
          <div className='ent-right-buttom'><CarTables name={this.state.type} tableList={tableList} carCallback={this.carinfo} getList={this.getList} equipmentid={this.state.equipmentid} /></div>
          <div className='menjingBtn' style={{textAlign:'left'}}>
                    <div style={{ width: '30px', height: "26px", cursor: "pointer" }} title={"进出"} className={this.state.isactive == 1 ? 'dzjcactive' : 'dzjc'} onClick={this.daozhajinchu.bind(this, 1, 1, 'all')}></div> 
                    <div style={{ width: '30px', height: "26px", cursor: "pointer" }} title={"逗留"} className={this.state.isactive == 2 ? 'dzdlactive' : 'dzdl'} onClick={this.daozhajinchu.bind(this, 2, 1, '')}></div>
                </div>
        </div>
      </div>
      {caralert ? <div className='alertRight'>
        <div className='chose' onClick={this.chose.bind(this)}></div>
        <div className='ryalert'>
          <div className='Ryleft'>
            <div className='Rx'>
              <div className="alertdiv">单位: </div>
              <div className='alerttext'>{caralertList.deptName}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv">车牌号: </div>
              <div className='alerttext'>{caralertList.carNo}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv"> 驾驶员: </div>
              <div className='alerttext'>{caralertList.personName}</div>
            </div>

            {/* <div className='Rx'>
              <div className="alertdiv">状态: </div>
              <div className='alerttext'>{isalertList.personCode}</div>
            </div> */}
            <div className='Rx'>
              <div className="alertdiv">时间: </div>
              <div className='alerttext'>{caralertList.time}</div>
            </div>
          </div>
          <div className="alertimg"><img className='Ryimg' src={caralertList.pic} width='100' height='100' /> </div>
        </div>


      </div> : null}

    </div>);
  }
}

export default CarRoadgate;
/* eslint-enable */