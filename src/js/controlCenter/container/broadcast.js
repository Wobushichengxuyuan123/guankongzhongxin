import './css/searchInfo.scss';
import {Input, Icon} from 'antd';
import RadioItem from './radioItem';
import {Scrollbars} from 'react-custom-scrollbars';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: "area",
      areaList: [],
      name: "",
      isMh: false,
      resultList: [],
      searchList: [],
      id: "",
      type: "",
      searchPrompt: true,
      searchResult: false,
      orgList: []
    };
  }

  componentDidMount() {
    this.getAreaSearchDetails();
    this.getOrgData();
  }

  tabHander(type) {
    this.setState({tabSelected: type});
  }

  getSearch(name) {
    if (!name) {
      name = "";
    }
    fetch(window.BASICS_SYSTEM + "/pubSearch/search?searchValue=" + name)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({searchList: b.data});
        }
      })
  }

  getSearchDetails(name, type, id) {
    let param = {};
    if (name) {
      param = {
        id: id,
        name: name,
        type: type
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
      this.setState({isMh: mh, searchPrompt, searchResult})
    }
    if (type == 5) {
      fetch(window.BASICS_SYSTEM + "/pubPersionSearch/personDetailsCom?com_id=" + id + "&name=" + name)
        .then(r => r.json())
        .then(b => {
          if (b.data.data) {
            this.setState({resultList: b.data.data || []});
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
          this.setState({resultList: b.data || []});
        }
      })
  }

  getAreaSearchDetails(id, parentId) {
    let param = "";
    if (id) {
      param += "?location_area_id=" + id + "&parent_id=" + parentId;
    }
    fetch(window.BASICS_SYSTEM + "/pubSearch/areaSearchDetails" + param)
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({areaList: b.data});
        }
      })
  }

  getOrgData() {
    fetch(window.BASICS_SYSTEM + "/pubSearch/orgSearch")
      .then(r => r.json())
      .then(b => {
        if (b.data) {
          this.setState({orgList: b.data});
        }
      })
  }

  searchFun(e) {
    this.getSearchDetails(this.state.name, this.state.type, this.state.id);
  }

  clearSearchInput() {
    this.setState({name: "", isMh: false, type: "", id: "", searchPrompt: true, searchResult: false, resultList: []})
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
  }

  clickMhItemHander(name, type, id) {
    this.getSearchDetails(name, type, id)
    this.setState({name: name, isMh: false, id, type, searchPrompt: false, searchResult: true});
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
      return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, item.type, item.id)}
                  className="mhItem">
        <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
          <img src={item.categoriesicon}/> : null}</div>
        <div className="name" title={item.name}>{item.name}</div>
      </div>;
    })
    let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
      item.index = (i + 1);
      if (item.type == 1) {
        if (item.equipment_categories_code == "9005") {//广播
          return <RadioItem data={item} key={"resultItems" + i}/>
        }
      }
    }) : null;
    let orgItems = this.state.orgList.map(item => {
      return <div key={item.organization_id}
                  onClick={this.clickMhItemHander.bind(this, item.organization_name, 5, item.organization_id)}
                  className="level1 nobold">{item.organization_name}</div>;
    })
    let searchInputButtons = <div>
      <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)}/>
      <span className="jg">︱</span>
      <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)}/>
    </div>
    return (
      <div className="searchInfo">
        <div className="title">搜索</div>
        <div className="searchDiv">
          <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)}
                 addonAfter={searchInputButtons} placeholder="广播"/>
        </div>
        <div className="mhss" style={{
          height: (window.document.documentElement.clientHeight - 170),
          display: this.state.isMh ? "block" : "none"
        }}>
          {mhItems}
        </div>
        {this.state.searchPrompt ?
          <div className="searchPrompt">
            <div className="tabs" style={{display: "block"}}>
              <div className="tabs-title">
                <div className={this.state.tabSelected == "area" ? "active" : ""}
                     onClick={this.tabHander.bind(this, "area")}>区域 {this.state.tabSelected == "area" ?
                  <Icon type="caret-up"/> : <Icon type="caret-down"/>}</div>
                <div className={this.state.tabSelected == "org" ? "active" : ""}
                     onClick={this.tabHander.bind(this, "org")}>组织 {this.state.tabSelected == "org" ?
                  <Icon type="caret-up"/> : <Icon type="caret-down"/>}</div>
              </div>
              {this.state.tabSelected == "area" ?
                <div className="tabs-content" style={{height: (window.document.documentElement.clientHeight - 223)}}>
                  <div className="item">
                    {resultfun()}
                  </div>
                </div>
                : null}
              {this.state.tabSelected == "org" ?
                <div className="tabs-content" style={{height: (window.document.documentElement.clientHeight - 223)}}>
                  <div className="item">
                    {orgItems}
                  </div>
                </div>
                : null}
            </div>
          </div>
          : null}
        {this.state.searchResult ?
          <div className="searchResult" style={{display: "block"}}>
            <Scrollbars style={{height: (window.document.documentElement.clientHeight - 170)}}>
              {resultItems}
            </Scrollbars>
          </div>
          : null}
      </div>
    );
  }
}

export default Main;