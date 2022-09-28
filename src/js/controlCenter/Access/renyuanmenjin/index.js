// 人员门禁
import React from 'react';
import { Icon, Input, Collapse, Spin, message } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';
// import Tables from '../compones/table'
import Tables from '../compones/tablerenyuan'
import EntranceGuardItem from '../../container/entranceGuardItem';
import { Scrollbars } from 'react-custom-scrollbars';
import menjinimg from '../../container/img/menjin.jfif';
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import '../../container/css/entranceGuard.scss';
import './index.scss'


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]);

const Search = Input.Search;
const Panel = Collapse.Panel;
/* eslint-disable */
class Renyuanmenjin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      entranceGuardList: [],
      sname: null,
      isLoding: true,
      resNum: 0,
      isshow: true,
      type: 0,
      equipmentid: '',
      echartsList: [],
      tableList: [],
      menjinList: [],
      isactive: '',
      isalert: false,
      isalertList: {},
      isactive: '1',
    }
  }

  componentDidMount() {
    this.getEntranceGuardInfo();
    this.getList();
    this.menjin1()
    this.time = setInterval(() => {
      clearInterval(this.state.timer)
      this.getList();
      this.menjin1()
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.time)
  }

  getEntranceGuardInfo(name) {
    var projectId = window.sessionStorage.getItem("projectId")
    if (!name) {
      name = "";
    }
    this.setState({ sname: name });
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfo?name=" + name + '&state=0' + '&projectId=' + projectId)
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
      fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfoByAreaId?area_id=" + id + seqname + '&state=0')
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
            }
          }
        })
    }
  }
  echartsClick = (equipmentid) => {
    this.menjin(equipmentid)
    this.setState({
      equipmentid: equipmentid
    })
    this.getList(equipmentid, 0, 'all')
    this.equipment(equipmentid)
  }
  equipment = (equipmentid) => {
    this.setState({
      equipmentid: equipmentid,
      isactive: equipmentid
    })
    this.getList(equipmentid, 0, 'all')
  }
  changeCollapse(id) {
    this.setState({ entranceGuardList: [] });
    setTimeout((() => {
      this.entranceGuardInfoByAreaId(id);
    }).bind(this), 200);
  }
  menjin1() {
    var projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/pubPersonCarDoor/getEquipmentData",
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectId,
          type: 0,
          //  equipmentId:id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "success") {
          this.setState({
            menjinList: res.data.list
          })
          for (var i = 0; i < this.state.menjinList.length; i++) {
            this.state.menjinList[i].switch = false
          }
        }
      })
  }
  //门禁
  menjin(id) {
    var projectId = window.sessionStorage.getItem("projectId")
    fetch("/nelda-smcc/pubPersonCarDoor/getEquipmentData",
      {
        method: 'POST',
        body: JSON.stringify({
          projectId: projectId,
          type: 0,
          equipmentId: id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(res => {
        if (res.msg === "success") {
          if (this.state.menjinList.length == 0) {
            this.state.menjinList.push(res.data.list[0])
            this.setState({
              menjinList: this.state.menjinList
            })
          } else {
            var arronce = this.state.menjinList;
            var flag = arronce.some(function (arr) {
              return arr.id == id
            })
            if (flag) {
              message.error("设备已存在")
            } else {
              this.state.menjinList.push(res.data.list[0])
              this.setState({
                menjinList: this.state.menjinList
              })
            }
          }
        }
      })
  }
  // echarts

  // 人员列表
  getList = (id, type, isAll) => {
    var projectId = window.sessionStorage.getItem("projectId")
    if (isAll == undefined) {
      var params = { pageNo: 1, pageSize: 10, type: this.state.type, projectId: projectId, isAll: 'all' }
    } else {
      var params = { pageNo: 1, pageSize: 10, type: type, equipmentId: id, projectId: projectId, isAll: isAll }
    }
    // console.log(params,'-----');
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
        this.setState({
          tableList: res.data.list || []
        })
      })
  }
  deletebox = (item, index, e) => {
    e.stopPropagation();
    for (var i = index, len = item.length - 1; i < len; i++)
      item[i] = item[i + 1];
    item.length = len;
    this.setState({
      menjinList: item
    })
  }
  ismjdoor = (type, id) => {
    let arr = this.state.menjinList
    let index = (arr || []).findIndex((item) => item.id === id)
    if (type == 1) {
      let type = false
      this.state.menjinList[index].switch = type
      this.setState({
        menjinList: this.state.menjinList
      })
    } else {
      let type = true
      this.state.menjinList[index].switch = type
      this.setState({
        menjinList: this.state.menjinList
      })
    }

  }
  initDoorType = (id) => {
    fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/getDoorStatusByUuids?doorUuids=" + id)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setStatus(b.data[0].doorStatus);
        }
      })
  }
  isdoorbtn = (id, index, e) => {
    e.stopPropagation();
    this.state.menjinList[index].switch = !this.state.menjinList[index].switch
    this.setState({
      menjinList: this.state.menjinList
    }, function () {
      if (this.state.menjinList[index].switch) {
        let type = 2;
        console.log('开门');
        fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/synControl?doorUuid=" + id + "&command=" + type)
          .then(r => r.json())
          .then(b => {
            console.log(b);
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
        fetch(window.SYSTEM_NELDA_OUTAPI + "/public/entranceguard/synControl?doorUuid=" + id + "&command=" + type)
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
  getisalert = (data) => {
    this.setState({
      isalert: true,
      isalertList: data
    })
  }
  chose() {
    this.setState({
      isalert: false
    })
  }

  menjinjinchu = (value, type, isAll) => {
    this.setState({
      isactive: value
    })
    let id = this.state.equipmentid
    this.getList(id, type, isAll)
  }

  render() {
    let { entranceGuardList, isshow, isalert, isalertList } = this.state
    let items = entranceGuardList.map((item, i) => {
      item.index = i + 1;
      return <EntranceGuardItem key={"EntranceGuardItem" + i} data={item} echartsClick={this.echartsClick.bind(this)} ismjdoor={this.ismjdoor.bind(this)} />
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="entranceGuardList">
          {this.state.isLoding ? <div style={{ textAlign: 'center', margin: '10px 0' }}><Spin tip="加载中..." />
          </div> : items}
        </div>
      </Panel>
    })
    let menjin = this.state.menjinList.map((item, index) => {
      let car = item.js + item.jl + item.sj + item.sg + item.qt;
      if (item.inof == [] || item.info.length == 0) {
        var obj = {};
        obj.organizationName = '';
        obj.postName = '';
        obj.name = '';
        obj.tagId = '';
        obj.img = menjinimg;
        item.info.push(obj);
      } else {
        if (item.info[0].img == '') {
          item.info[0].img = menjinimg
        } else {
          item.info[0].img = item.info[0].img
        }
      }

      return <SwiperSlide style={{ width: '200px' }} key={index}>
        <div style={{ height: '100%', cursor: 'pointer' }} className={this.state.isactive == item.id ? 'mjactive' : 'mjnotactive'} onClick={this.equipment.bind(this, item.id)}>
          <div className='item-box'>
            <div className="deletebtn" onClick={this.deletebox.bind(this, this.state.menjinList, index)}>
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
                  <p style={{ fontSize: '18px', color: '#fff', width: '50%', marginLeft: '5%' }}> 洞内人员：<span>{car.toString()}</span></p>
                  <p style={{ fontSize: '18px', color: '#fff', width: '20%' }}>其他:<span>{item.qt}</span> </p>
                  <div style={{ width: '30px', height: "26px" }} className={item.switch ? 'opendoor' : 'closedoor'}
                    onClick={this.isdoorbtn.bind(this, item.id, index)} title={item.switch ? '关门' : '开门'}></div>
                </div>
              </div>
            </div>
            <div className='item-below'>
              <div style={{ height: '100%', display: 'flex', marginTop: '2%' }}>
                <div className='left-item-content' style={{ width: '60%', marginLeft: '5%' }}>
                  {/* <p style={{ fontSize: '18px' }}>十四局</p> */}
                  <p>单位：<span className='textColor'>{item.info[0].organizationName}</span></p>
                  <p>姓名：<span className='textColor'>{item.info[0].name}</span></p>
                  {/* <p>职务：<span className='textColor'>{item.info[0].postName}</span></p> */}
                  {/* <p>编号：<span className='textColor'>{item.info[0].tagId}</span></p> */}
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
      <div className="title">人员门禁</div>
      <div>
        <div className="searchDiv" style={{ paddingTop: 20 }}>
          <Search className="entranceGuardSearchInput searchInput" placeholder="请输入门禁名称"
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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {menjin}
          </Swiper>
        </div>
        <div className='right-ent'>
          {/* <div className='ent-right-buttom'><Tables name={this.state.type} isalert={this.getisalert} tableList={this.state.tableList} getList={this.getList} equipmentid={this.state.equipmentid} /></div> */}
          <div className='ent-right-buttom'><Tables isalert={this.getisalert} tableList={this.state.tableList}  /></div>
          <div className='menjingBtn' style={{ textAlign: 'left' }}>
            <div style={{ width: '30px', height: "30px", cursor: "pointer" }} title={"进出"} className={this.state.isactive == 1 ? 'mjjcactive' : 'mjjc'} onClick={this.menjinjinchu.bind(this, 1, 0, 'all')}></div>
            <div style={{ width: '30px', height: "30px", cursor: "pointer" }} title={"逗留"} className={this.state.isactive == 2 ? 'mjdlactive' : 'mjdl'} onClick={this.menjinjinchu.bind(this, 2, 0, '')}></div>
          </div>
        </div>
      </div>
      {isalert ? <div className='alertRight'>
        <div className='chose' onClick={this.chose.bind(this)}></div>
        <div className='ryalert'>
          <div className='Ryleft'>
            <div className='Rx'>
              <div className="alertdiv">单位: </div>
              <div className='alerttext'>{isalertList.deptName}</div>
            </div>
            <div className='Rx'>
              <div className="alertdiv">姓名: </div>
              <div className='alerttext'>{isalertList.personName}</div>
            </div>
         
            {/* <div className='Rx'>
              <div className="alertdiv">状态: </div>
              <div className='alerttext'>{isalertList.personCode}</div>
            </div> */}
            <div className='Rx'>
              <div className="alertdiv">时间: </div>
              <div className='alerttext'>{isalertList.time}</div>
            </div>
          </div>
          <div className="alertimg"><img className='Ryimg' src={isalertList.pic} width='100' height='100' /> </div>
        </div>


      </div> : null}
    </div>);
  }
}

export default Renyuanmenjin;
/* eslint-enable */