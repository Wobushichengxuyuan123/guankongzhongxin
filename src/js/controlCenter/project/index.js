import React from "react";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { Input, Pagination } from "antd";
import History from "../components/history";
import './index.scss'

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      areaList: [],
      searchList: [],
      resultList: [],
      name: "",
      isShow: false,
      isSearch: true,
      list: "",
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      loginName: sessionStorage.getItem("loginName"),

    };
  }
  componentDidMount() {
    this.history.getHistory('xiangmu', this.state.loginName);
    this.getAreaSearchDetails();
  }
  getAreaSearchDetails(name) {
    var params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      projectName: name,
    };
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubProject/pagination", {
      method: "post",
      body: JSON.stringify(params),
    })
      .then((r) => r.json())
      .then((b) => {
        if (b.data) {
          this.setState({
            resultList: b.data.list || [],
            totalCount: Number(b.data.totalCount),
          });
        }
      });
  }
  getAreaSearch(sProjectName) {
    if (!sProjectName) {
      sProjectName = "";
    }
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubProject/list", {
      method: "post",
      body: JSON.stringify({ sProjectName }),
    })
      .then((r) => r.json())
      .then((b) => {
        if (b.data) {
          this.setState({ searchList: b.data || [], resultList: [] });
        }
      });
  }
  searchFun(e) {
    if (e.trim() !== "") {
      this.setState({ name: e }, () => {
        this.storage(e);
        this.getAreaSearchDetails(e);
      })
    }
  }
  changeSearchInput(e) {
    this.setState({
      name: e.target.value,
    })
    if (e.target.value.trim() !== "") {
      this.setState({
        isSearch: false,
        name: e.target.value,
        pageNo: 1
      })
      this.getAreaSearch(e.target.value);
    }
  }
  clearSearchInput() {
    this.setState({
      name: "",
      isSearch: true,
      isShow: false,
    });
    this.getAreaSearchDetails();
    this.history.getHistory('xiangmu', this.state.loginName);
  }
  storage(e) {
    fetch("/nelda-smcc/pubUserSearchHistory/insert", {
      method: "post",
      body: JSON.stringify({
        loginName: sessionStorage.getItem("loginName"),
        searchPath: "xiangmu",
        searchValue: e,
      }),
    })
      .then((r) => r.json())
      .then((b) => {
        this.history.getHistory('xiangmu', this.state.loginName);
      });
  }
  clickMhItemHander(name) {
    this.storage(name);
    this.setState({ name: name, isSearch: true });
    this.getAreaSearchDetails(name);
  }
  clickMhItemHanderS(name) {
    this.setState({
      isSearch: false,
      name: name,
    });
    this.getAreaSearch(name);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNo != this.state.pageNo) {
      this.getAreaSearchDetails();
    }
  }
  // 分页
  pageOnChange(page) {
    this.setState({
      pageNo: page,
    });
  }
  details(item, e) {
    e.stopPropagation();
    this.setState({
      isShow: true,
      list: item,
    });
  }
  closeBox() { this.setState({ isShow: false, }) }
  tiaozhuan(item, projectName) {
    window.projectName(projectName);
    sessionStorage.setItem("projectName", projectName);
    sessionStorage.setItem("projectId", item);
    window.GisMap.AreaJump(item);
  }
  render() {
    const { isSearch, isShow } = this.state
    let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
      item.index = (this.state.pageNo - 1) * this.state.pageSize + 1 + i;
      return (
  
        <div
          className="project_table_List_div"
          key={item.id}
          onClick={this.tiaozhuan.bind(this, item.id, item.projectName)}
        >
          <div className="project_table_information">
            {item.index}.{item.projectName}
            <span className="project_table_inforight">{item.company_name}</span>
          </div>
          <div className="project_table_liebiao">
            <div
              onClick={(e) => this.details(item, e)}
              className="project_table_details"
            >
              <div className="project_table_xiangqing"></div>
              <div>详情</div>
            </div>
          </div>
        </div>
      )
    }) : null;
    // 搜索显示结果
    let mhItems = this.state.searchList.map((item, i) => {
      return (
        <div key={"mhItems" + item.id} className="project_search_Item" onClick={this.clickMhItemHander.bind(this, item.projectName, item.id)} >
          <div className="mh-ico">
            {item.categoriesicon && item.categoriesicon != "no" ? (
              <img src={item.categoriesicon} />
            ) : null}
          </div>
          <div className="projectName" title={item.projectName}>
            {item.projectName}
          </div>
        </div>
      )
    });
    let searchInputButtons = (
      <div>
        <CloseCircleOutlined onClick={this.clearSearchInput.bind(this)} />
        <span className="jg">︱</span>
        <SearchOutlined onClick={this.searchFun.bind(this, this.state.name)} />
      </div>
    );
    return (
      <div className="project_info">
        <div className="project_title">项目</div>
        <div className="project_input">
          <Input
            className="searchInput"
            value={this.state.name}
            onChange={this.changeSearchInput.bind(this)}
            addonAfter={searchInputButtons}
            placeholder="项目"
          />
        </div>
        {isSearch ? <div>
          <History onRef={ref => this.history = ref} onHistory={(a, b) => { this.clickMhItemHanderS(a, b) }} />
          <div className="project_table">
            <div className="project_table_title"> 项目</div>
            <div className="project_table_List" >
            <Scrollbars> {resultItems}</Scrollbars>
             
              {this.state.resultList.length != 0 ? (
                <div className="project_table_page_wrap" style={{ textAlign: "center" }}>
                  <Pagination
                    size="small"
                    pageSize={this.state.pageSize}
                    current={this.state.pageNo}
                    onChange={this.pageOnChange.bind(this)}
                    total={this.state.totalCount}                 
                    showSizeChanger={false}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div> : <div className=" project_search"  >
          {mhItems}
        </div>}
        {/* 详情弹窗 */}
        {isShow ? null : ""}
        <div className="alterwrap"
          style={{
            display: this.state.isShow ? "block" : "none",
            bottom: "auto",
          }}
        >
          <div className="alarm" style={{ lineHeight: 2, position: "static" }}>
            <div className="contentbox" style={{ position: "static" }}>
              <div className="closebtn">
                <div className="namexinxi">项目</div>
                <div
                  className="closeicon"
                  onClick={this.closeBox.bind(this)}
                ></div>
              </div>
              <div className="contenttext">
                <div className="texttitle">
                  <span className="text">项目名称：</span>
                  <span className="text">{this.state.list.projectName}</span>
                </div>
                <div className="texttitle">
                  <span className="text">项目编码：</span>
                  <span className="text">{this.state.list.projectCode}</span>
                </div>
                <div className="texttitle">
                  <span className="text">建设周期：</span>
                  <span className="text">{this.state.list.needTime}</span>
                </div>
                <div className="texttitle">
                  <span className="text">项目预算：</span>
                  <span className="text">{this.state.list.budget}</span>
                </div>
                <div className="texttitle">
                  <span className="text">建设单位：</span>
                  <span className="text">{this.state.list.masterCompany}</span>
                </div>
                <div className="texttitle">
                  <span className="text">施工单位：</span>
                  <span className="text"> {this.state.list.implementCompany} </span>
                </div>
                <div className="texttitle">
                  <span className="text">设计单位：</span>
                  <span className="text">{this.state.list.designCompany}</span>
                </div>
                <div className="texttitle">
                  <span className="text">监理单位：</span>
                  <span className="text">
                    {this.state.list.superviseCompany}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Project;