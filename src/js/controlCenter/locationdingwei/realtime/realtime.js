
import { Icon, Input, Pagination } from 'antd';
import moment from 'moment';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class Realtime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: moment(),
      tabSelected: "area",
      areaList: [],
      historyList: [],
      name: "",
      isMh: false,
      resultList: [],
      searchList: [],
      id: "",
      searchPrompt: true,
      searchResult: false,
      orgList: [],
      current: 3,
      isShow: false,
      list: '',
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
    };
  }
  // 组件挂载
  componentDidMount() {
    this.getHistory();
    this.getAreaSearchDetails();  //  定位区域
    this.getOrgData();   //  参建单位
  }
  // 组件销毁
  componentWillUnmount() {
    clearInterval(this.timer)
    clearInterval(this.timerone)
  }

  tabHander(type) {
    this.setState({ tabSelected: type });
  }

  // 搜索框第一次搜索内容信息
  getOneSearch(name) {
    clearInterval(this.timer)
    clearInterval(this.timerone)
    if (!name) {
      name = "";
    }
    // 搜索框第一次搜索内容信息
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/ppms/personoverall/getPersonOverAll?searchItems=[{"key":"name","value":"' + name + '"}]')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ searchList: b.data });
        }
      })
  }

  getSearchDetails(name, id) {
    window.PushData && window.PushData("GisGpsPCarNowArea" + "@" + id);
    this.add(name, id)
    this.timer = setInterval(() => {
      this.add(name, id)
    }, 3000);
    this.getOneSearch(name)
  }
  // 实时定位
  add(name, id) {
    let datatime = moment()
    let pageNo = this.state.pageNo
    if (name) {
      var param = [
        {
          key: 'name',
          value: name
        }, {
          key: 'id',
          value: id
        }, {
          key: 'perids',
          value: ''
        }];
    }
    let list = JSON.stringify(param)
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/personDetails?pageNo=' + pageNo + '&pageSize=10&searchItems=' + list + '&_=' + datatime)
      .then(r => r.json())
      .then(b => {
        if (b.data != "" && b.data != null) {
          this.setState({
            resultList: b.data || [],
            pageNo: Number(b.pageNo),
            totalCount: Number(b.totalCount),
          });

          window.PushData && window.PushData("GisGpsPCarNow" + "@" + encodeURI(JSON.stringify(b.data)));
        }
      })
  }
  // 跟踪
  genzong(person_id) {
    clearInterval(this.timer)
    let datatime = moment()
    var id = [
      { "key": "person_id", "value": person_id }
    ]
    let personlist = JSON.stringify(id)
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/personDetails?pageNo=1&pageSize=10&searchItems=' + personlist + '&_=' + datatime)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ resultList: b.data || [] });
          window.PushData && window.PushData("GisGpsPCarNowlistClick" + "@" + encodeURI(JSON.stringify(b.data)));
        }
      }
      )
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

  // 历史记录搜索
  getHistory() {
    let loginName =window.sessionStorage.getItem("loginName")
    fetch("/nelda-smcc/pubUserSearchHistory/list", {
			method: "post",
			body: JSON.stringify({
				loginName : loginName,
				searchPath : 'shishidingwei',
			})
		})
			.then(r => r.json())
			.then(b => {
				let list = b.data.slice(0, 5)
        this.setState({ historyList: list });
			})
  }
  // 参建单位
  getOrgData() {
    fetch(window.SYSTEM_CONFIG_PPMS + '/public/personPosition/personInfoCom')
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ orgList: b.data });
        }
      })
  }
  // 点击搜索按钮搜索
  searchFun(e) {
    let loginName =window.sessionStorage.getItem("loginName")
    fetch("/nelda-smcc/pubUserSearchHistory/insert", {
      method: "post",
      body: JSON.stringify({
        loginName : loginName,
        searchPath : 'shishidingwei',
        searchValue : e
      })
    })
      .then(r => r.json())
      .then(b => {
        this.getHistory();
      })
    this.getSearchDetails(this.state.name, this.state.type, this.state.id);
  }
  // 清空input框 
  clearSearchInput() {
    clearInterval(this.timer)
    clearInterval(this.timerone)
    this.setState({ name: "", isMh: false, type: "", id: "", searchPrompt: true, searchResult: false, resultList: [], isShow: false })
    window.PushData && window.PushData("GisGpsPCarEnd" + "@" + '实时定位');
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
      resultList: [],
      searchList: [],
      searchPrompt,
      searchResult
    });
    this.getOneSearch(e.target.value);
  }
  clickMhItemHander(name, id) {
    this.getSearchDetails(name, id)
    this.setState({ name: name, isMh: false, id, searchPrompt: false, searchResult: true });
  }
  clickMhItemHanderS(name){
    let isMh = false;
		if (name.trim() !== "") {
			isMh = true;
		}
		this.setState({ name: name, isMh: isMh, id: "", parentId: "", isShow: false });
		this.getOneSearch(name);
  }
  // 时间回调
  onChange = page => {
    this.setState({
      current: page,
    });
  };



  // 详情
  details(value, e) {
    e.stopPropagation()
    this.setState({
      isShow: true,
      list: value
    })

  }
  // 跟踪
  track(value, e) {
    e.stopPropagation()
    this.setState({
      isShow: false
    })
    this.genzong(value)
    this.timerone = setInterval(() => {
      this.genzong(value)
    }, 3000);
  }

  // 呼叫
  call(value, e) {
    e.stopPropagation()
  }

  // 关闭弹窗
  closeBox() {
    this.setState({
      isShow: false
    })
  }

  // 分页
  pageOnChange(page) {
    this.setState({
      pageNo: page
    }, function () {
      this.getSearchDetails(this.state.name, this.state.id)
    });
  }

  // 点击空白处人员居中
  shishi(item) {
    window.PushData && window.PushData("GisGpsPCarHoslistClick" + "@" + encodeURI(JSON.stringify(item)));
  }
  render() {
    // 历史搜索
    let historyDivs = this.state.historyList.map((item, i) => {
      return <div onClick={this.clickMhItemHanderS.bind(this, item.searchValue, item.id)} key={"historyDiv" + i}>{item.searchValue}</div>;
    })
    // 定位区域
    let resultfun = (list = this.state.areaList, level = 1) => {
      return list.map((item, index) => {
        let reval = <div onClick={this.clickMhItemHander.bind(this, item.location_area_name, item.location_area_id)}
          className={"level" + level} key={index}>{item.location_area_name}</div>;
        let relist = [];
        if (item.children) {
          relist = resultfun(item.children, level + 1);
        }
        relist.unshift(reval);
        return relist;
      });
    }
    // 参建单位
    let orgItems = this.state.orgList.map(item => {
      return <div key={item.com_id}
        onClick={this.clickMhItemHander.bind(this, item.company_name, item.com_id)}
        className="level1 nobold">{item.company_name}</div>;
    })
    // 搜索显示结果
    let mhItems = this.state.searchList.map((item, i) => {
      return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, item.id)}
        className="mhItem">
        <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
          <img src={item.categoriesicon} /> : null}</div>
        <div className="name" title={item.name}>{item.name}</div>
      </div>;
    })
    let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
      item.index = (i + 1);
      return <div className='hist' key={item.index} onClick={this.shishi.bind(this, item)}>
        <div className='information'>{item.index}.{item.person_name}
          <span className='inforight'>{item.company_name}</span>
        </div>
        <div className='liebiao'>
          <div className='trajectory' onClick={e => this.trajectory(item.person_name, item.position_time, item.person_id, e)}>
            <div className='guiji'></div><div>轨迹</div>
          </div>
          <div className='details' onClick={e => this.details(item, e)}>
            <div className='xiangqing'></div><div>详情</div>
          </div>
          <div className='track' onClick={e => this.track(item.person_id, e)}>
            <div className='xiangqing'></div><div>跟踪</div>
          </div>
          <div className='call' onClick={e => this.call(item, e)}>
            <div className='xiangqing'></div><div>呼叫</div>
          </div>
        </div>
      </div>
    }) : null;

    let searchInputButtons = <div>
      <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
      <span className="jg">︱</span>
      <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
    </div>
    return (
      <div className="searchInfo">
        <div className="title">实时定位</div>
        <div className="searchDiv">
          <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)}
            addonAfter={searchInputButtons} placeholder="视频/门禁/广播/基站/人员/报警/区域" />
        </div>
        <div className="mhss" style={{
          height: (window.document.documentElement.clientHeight - 170),
          display: this.state.isMh ? "block" : "none"
        }}>
          {mhItems}
        </div>
        {this.state.searchPrompt ?
          <div className="searchPrompt">
            <div className='searchPromptone'>
              <div className='historyleft'>历史搜索：</div>
              <div className="history">{historyDivs}</div>
            </div>
            <div className="tabs" style={{ display: "block" }}>
              <div className="tabs-title">
                <div className={this.state.tabSelected == "area" ? "active" : ""}
                  onClick={this.tabHander.bind(this, "area")}>定位区域{this.state.tabSelected == "area" ?
                    <Icon type="caret-up" /> : <Icon type="caret-down" />} </div>
                <div className={this.state.tabSelected == "org" ? "active" : ""}
                  onClick={this.tabHander.bind(this, "org")}>参建单位 {this.state.tabSelected == "org" ?
                    <Icon type="caret-up" /> : <Icon type="caret-down" />}</div>
              </div>
              {this.state.tabSelected == "area" ?
                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                  <div className="item">
                    {resultfun()}
                  </div>
                </div>
                : null}
              {this.state.tabSelected == "org" ?
                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                  <div className="item">
                    {orgItems}
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
                  <span className="text">定位时间：</span><span className="text">{this.state.list.position_time}</span>
                </div>
                {this.state.list.heartrate != '' ?
                  <div>
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
                  : null}

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
                  <span className="text">定位时间：</span><span className="text">{this.state.list.position_time}</span>
                </div>

              </div>
            </div>}

          </div>
        </div>
      </div>
    );
  }
}

export default Realtime;

/* eslint-enable */