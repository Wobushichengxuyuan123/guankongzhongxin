/* eslint-disable */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Input, Icon } from 'antd';
import AlarmItem from '../components/alarmItem';
import History from '../components/history';
// import PersonItem from '../components/personItem';
// import VideoItem from '../components/videoItem';
// import EntranceItem from '../components/entranceItem';
// import StationItem from '../components/stationItem';
// import RadioItem from '../components/radioItem';
// import LaneItem from '../components/laneItem';
import './index.scss';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: "area",
      areaList: [],
      historyList: [],
      name: "",
      isMh: false,
      resultList: [],
      searchList: [],
      id: "",
      type: "",
      searchPrompt: true,
      searchResult: false,
      orgList: [],
      loginName: sessionStorage.getItem("loginName"),
      searchPath: 'resourceSearch'
    };
  }

  componentDidMount() {
    this.history.getHistory();

    // this.getAreaSearchDetails();
    // this.getOrgData();
  }

  getHistory() {
    fetch("/nelda-smcc/pubUserSearchHistory/list", {
      method: "post",
      body: JSON.stringify({
        loginName: this.state.loginName,
        searchPath: 'resourceSearch',
      })
    })
      .then(r => r.json())
      .then(b => {
        let list = b.data.slice(0, 5)
        this.setState({ historyList: list });
      })

  }


  tabHander(type) {
    this.setState({ tabSelected: type });
  }

  getSearch(name) {
    let projectId = window.sessionStorage.getItem("projectId")
    if (!name) {
      name = "";
    }
    fetch(window.BASICS_SYSTEM + "/pubSearch/search?searchValue=" + name + '&projectId=' + projectId)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ searchList: b.data });
        }
      })
  }

  getSearchDetails(name, type, id) {
    this.storage(name)
    let projectId = window.sessionStorage.getItem("projectId")
    let param = {};
    if (name) {
      param = {
        id: id,
        name: name,
        type: type,
        projectId: projectId
      }
    } else {
      let mh = false;
      let searchPrompt = true;
      let searchResult = false
      if (name) {
        mh = true;
        searchPrompt = false;
        searchResult = true;
      }
      this.setState({ isMh: mh, searchPrompt, searchResult })
    }
    if (type == 5) {
      fetch(window.BASICS_SYSTEM + "/pubPersionSearch/personDetailsCom?com_id=" + id + "&name=" + name)
        .then(r => r.json())
        .then(b => {
          if (b.data && b.data.data) {
            this.setState({ resultList: b.data.data || [] });
          }
        })
      return;
    }
    fetch(window.BASICS_SYSTEM + "/pubSearch/searchDetails", {
      method: "post",
      body: JSON.stringify(param)
    })
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ resultList: b.data || [] });
        }
      })
  }

  getAreaSearchDetails(id, parentId) {
    let projectId = window.sessionStorage.getItem("projectId")
    let param = "";
    if (id) {
      param += "&location_area_id=" + id + "&parent_id=" + parentId;
    }
    fetch(window.BASICS_SYSTEM + "/pubSearch/areaSearchDetails?projectId=" + projectId + param)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ areaList: b.data });
        }
      })
  }

 
  getOrgData() {
    let projectId = window.sessionStorage.getItem("projectId")
    fetch(window.BASICS_SYSTEM + "/pubSearch/orgSearch?projectId=" + projectId)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({ orgList: b.data });
        }
      })
  }
  storage(e) {
    let loginName = window.sessionStorage.getItem("loginName")
    fetch("/nelda-smcc/pubUserSearchHistory/insert", {
      method: "post",
      body: JSON.stringify({
        loginName: loginName,
        searchPath: 'resourceSearch',
        searchValue: e
      })
    })
      .then(r => r.json())
      .then(b => {
        this.getHistory();
      })
  }
  searchFun(e) {
    this.storage(e)
    this.getSearchDetails(this.state.name, this.state.type, this.state.id);
  }

  clearSearchInput() {
    this.setState({ name: "", isMh: false, type: "", id: "", searchPrompt: true, searchResult: false, resultList: [] })
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
      type: "",
      id: "",
      resultList: [],
      searchList: [],
      searchPrompt,
      searchResult
    });
    this.getSearch(e.target.value);
    this.getHistory()
  }

  clickMhItemHander(name, type, id) {
    this.getSearchDetails(name, type, id)
    this.setState({ name: name, isMh: false, id, type, searchPrompt: false, searchResult: true });
  }
  clickMhItemHanderS(name) {
    let isMh = false;
    if (name.trim() !== "") {
      isMh = true;
    }
    this.setState({ name: name, isMh: isMh, id: "", parentId: "", isShow: false });
    this.getSearch(name);
  }

  render() {
    let resultfun = (list = this.state.areaList, level = 1) => {
      return list.map(item => {
        let reval = <div onClick={this.clickMhItemHander.bind(this, item.location_area_name, 3, item.location_area_id)}
          className={"level" + level} key={item.location_area_id}>{item.location_area_name}</div>;
        let relist = [];
        if (item.children) {
          relist = resultfun(item.children, level + 1);
        }
        relist.unshift(reval);
        return relist;
      });
    }
    let mhItems = this.state.searchList.map((item, i) => {
      return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, item.type, item.id)} className="mhItem">
        <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
          <img src={item.categoriesicon} /> : null}</div>
        <div className="name" title={item.name}>{item.name}</div>
      </div>;
    })
    let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
      item.index = (i + 1);
      if (item.type == 1) {
        if (item.equipment_categories_code == "S5010") {//基站
          return <StationItem data={item} key={"resultItems" + i} />
        }
        if (item.equipment_categories_code == "S1010") {//摄像机
          return <VideoItem data={item} key={"resultItems" + i} />
        }
        if (item.equipment_categories_code == "S4010") {//广播
          return <RadioItem data={item} key={"resultItems" + i} />
        }
        if (item.equipment_categories_code == "S2010") {//门禁
          return <EntranceItem data={item} key={"resultItems" + i} />
        }
        if (item.equipment_categories_code == "S3010") {//车道
          return <LaneItem data={item} key={"resultItems" + i} />
        }
      } else if (item.type == 2) {
        return <AlarmItem parent={this} data={item} search={true} key={"resultItems" + i} />
      } else if (!item.type) {
        return <PersonItem data={item} key={"resultItems" + i} />
      }
    }) : null;
    let orgItems = this.state.orgList.map(item => {
      return <div key={item.organization_id}
        onClick={this.clickMhItemHander.bind(this, item.organization_name, 5, item.organization_id)}
        className="level1 nobold">{item.organization_name}</div>;
    })
    // 历史
    let history = (
      <div className='search_history'>
        <div className='search_history_title'>历史搜索：</div>
        <div className="search_history_list">{
          this.state.historyList.map((item, i) => {
            return <div className="search_history_list_div" onClick={this.clickMhItemHanderS.bind(this, item.searchValue, item.id)} key={"historyDiv" + i}>{item.searchValue}</div>;
          })}</div>
      </div>
    )
    let searchInputButtons = <div>
      <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
      <span className="jg">︱</span>
      <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
    </div>
    return (
      <div className="search_Info">
        <div className="search_title">资源搜索</div>
        <div className="search_input">
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
          <div>
           <History
            searchPath={this.state.searchPath}
            onRef={ref => this.history = ref}
            onHistory={(a, b) => { this.clickMhItemHanderS(a, b) }} />
            <div className="tabs" style={{ display: "block" }}>
              <div className="tabs-title">
                <div className={this.state.tabSelected == "area" ? "active" : ""}
                  onClick={this.tabHander.bind(this, "area")}>区域 {this.state.tabSelected == "area" ?
                    <Icon type="caret-up" /> : <Icon type="caret-down" />}</div>
                <div className={this.state.tabSelected == "org" ? "active" : ""}
                  onClick={this.tabHander.bind(this, "org")}>组织 {this.state.tabSelected == "org" ?
                    <Icon type="caret-up" /> : <Icon type="caret-down" />}</div>
              </div>
              {this.state.tabSelected == "area" ?
                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                  <div className="item">
                    {resultfun()}
                  </div>
                </div>
                : <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                  <div className="item">
                    {orgItems}
                  </div>
                </div>}
            </div>
          </div>
          : null}
        {this.state.searchResult ?
          <div className="searchResult" style={{ display: "block" }}>
            <Scrollbars style={{ height: (window.document.documentElement.clientHeight - 170) }}>
              {resultItems}
            </Scrollbars>
          </div>
          : null}
      </div>
    );
  }
}

export default Main;

/* eslint-enable */
