import React from "react";
import { Icon, Input, Pagination, Modal, Button, message, Popconfirm } from "antd";
import AddPubPointPosition from "./Addindex";
import { Scrollbars } from "react-custom-scrollbars";
import "../container/css/areaInfo.scss";
import "./index.scss";
var that = null;
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      searchList: [],
      name: "",
      isMh: false,
      resultList: [],
      id: "",
      isShow: false,
      list: "",
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      isMh: false,
      title: "新增",
      isSearch: true,
    };
    that = this;
  }
  componentDidMount() {
    this.getAreaSearchDetails();
  }
  getAreaSearchDetails(name) {
    var params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      projectId: sessionStorage.getItem("projectId"),
      pointName: name,
    };
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/pageQuery", {
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
  getAreaSearch(pointName) {
    if (!pointName) {
      pointName = "";
    }
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/listQuery", {
      method: "post",
      body: JSON.stringify({ pointName }),
    })
      .then((r) => r.json())
      .then((b) => {
        if (b.data) {
          this.setState({ searchList: b.data || [], resultList: [] });
        }
      });
  }
  searchFun(name) {
    this.getAreaSearchDetails(name);
  }

  changeSearchInput(e) {
    let isMh = false;
    if (e.target.value.trim() !== "") {
      isMh = true;
    }
    this.setState({
      name: e.target.value,
      isMh: isMh,
      id: "",
      isShow: false,
      isSearch: false
    });
    this.getAreaSearch(e.target.value);
  }
  clearSearchInput() {
    this.setState({
      name: "",
      isMh: false,
      id: "",
      isShow: false,
      isSearch: true
    });
    this.getAreaSearchDetails();
  }
  clickMhItemHander(name) {
    this.setState({ name: name, isSearch: true });
    this.getAreaSearchDetails(name);
  }
  clickMhItemHanderS(name) {
    let isMh = false;
    if (name.trim() !== "") {
      isMh = true;
    }
    this.setState({
      name: name,
      isMh: isMh,
      id: "",

      isShow: false,
    });
    this.getAreaSearch(name);
  }
  details(item, e) {
    e.stopPropagation();
    this.setState({
      isShow: true,
      list: item,
    });
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
  tiaozhuan(item) {
    if (window.PushData) {
      window.PushData("AreaJump" + "@" + encodeURI(JSON.stringify(item)));
    } else {
      window.GisMap.AreaJump(item);
    }
  }
  open() {
    if (window.PushData) {
      window.PushData("GisPointsEdit" + "@" + JSON.stringify(1));
    } else {
      window.GisMap.GisPointsEdit(1);
    }
    this.setState({ title: "新增", isShow: true, viewId: "" });
  }
  updata(id, item) {
    let params = {
      value: 1,
      id: id,
      pointName: item.pointName,
      xcoordinate: item.xCoordinate,
      ycoordinate: item.yCoordinate,
      zcoordinate: item.zCoordinate
    };
    this.setState({ title: "修改", isShow: true, viewId: id });
    if (window.PushData) {
      window.PushData("GisPointsEdit" + "@" + JSON.stringify(params));
    } else {
      window.GisMap.GisPointsEdit(params);
    }
  }
  handleOk() {
    this.setState({ loading: true });
    this.ref.addDepartment.validateFields((err, values) => {
      if (!err) {
        if (values.status) {
          values.status = "1";
        } else {
          values.status = "0";
        }
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/insertData", {
          method: "POST",
          body: JSON.stringify(values),
        })
          .then((r) => r.json())
          .then((b) => {
            if (b.code == "0") {
              message.success("保存成功！");
              this.setState({ visible: false, loading: false });
              this.getAreaSearchDetails();
              this.handleCancel();
            }
            if (b.code == "-1") {
              message.warning(b.msg);
              this.setState({ loading: false });
            }
          });
      }
    });
  }
  doUpdate() {
    this.setState({ loading: true });
    this.refs.addDepartment.validateFields((err, values) => {
      if (!err) {
        if (values.status) {
          values.status = "1";
        } else {
          values.status = "0";
        }
        values.id = this.state.viewId;
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/updateData", {
          method: "POST",
          body: JSON.stringify(values),
        })
          .then((r) => r.json())
          .then((b) => {
            if (b.code == "0") {
              message.success("保存成功！");
              this.setState({ visible: false, loading: false });
              this.getAreaSearchDetails();
              this.handleCancel();
            }
            if (b.code == "-1") {
              message.warning(b.msg);
              this.setState({ loading: false });
            }
          });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  handleCancel() {
    this.setState({ isShow: false, loading: false });
    if (window.PushData) {
      window.PushData("GisPointsEdit" + "@" + JSON.stringify(0));
    } else {
      window.GisMap.GisPointsEdit(0);
    }
  }
  getloadabsd = () => {
    return document.getElementById("rootDiv");
  };
  details(item) {
    fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/deleteData?id=" + item.id, {
      method: "get",
    })
      .then((r) => r.json())
      .then((b) => {
        if (b.code == "0") {
          message.success("删除成功！");
          this.getAreaSearchDetails();
          this.handleCancel();
        }
        if (b.code == "-1") {
          message.warning(b.msg);
        }
      });
  }
  render() {
    const { isSearch } = this.state;
    // 历史搜索
    let resultItems =
      this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
        item.index = (this.state.pageNo - 1) * this.state.pageSize + 1 + i;
        return (
          <div
            className="hist"
            key={item.id}
            onClick={this.tiaozhuan.bind(this, item.id, item.projectName)}
          >
            <div className="information">
              {item.index}.{item.pointName}
              <span className="inforight">{item.company_name}</span>
            </div>
            <div className="liebiao">
              <div
                onClick={(e) => this.updata(item.id, item, e)}
                className="details"
              >
                <div className=""></div>
                <div>修改</div>
              </div>
              <div className="details">
                <Popconfirm placement="bottomLeft" title="确定删除点位吗?"
                  onConfirm={this.details.bind(this, item)} okText="是"
                  cancelText="否">
                  <div className="bcl">删除</div>
                </Popconfirm>
              </div>
            </div>
          </div>
        );
      })
        : null;
    // 搜索显示结果
    let mhItems = this.state.searchList.map((item, i) => {
      return (
        <div
          key={"mhItems" + item.id}
          onClick={this.clickMhItemHander.bind(this, item.pointName, item.id)}
          className="mhItem"
        >
          <div className="mh-ico">
            {item.categoriesicon && item.categoriesicon != "no" ? (
              <img src={item.categoriesicon} />
            ) : null}
          </div>
          <div className="name" title={item.pointName}>
            {item.pointName}
          </div>
        </div>
      );
    });
    let searchInputButtons = (
      <div>
        <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
        <span className="jg">︱</span>
        <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
      </div>
    );
    return (
      <div className="point_info">
        <div className="point_title">点位列表</div>
        <div className="point_add" onClick={this.open.bind(this, 1)}> 新增点位 </div>
        <div className="point_input">
          <Input
            className="searchInput"
            value={this.state.name}
            onChange={this.changeSearchInput.bind(this)}
            addonAfter={searchInputButtons}
            onPressEnter={this.searchFun.bind(this)}
            placeholder="点位"
          />
        </div>
        <div className="point_list">
          {isSearch ?
            <div>

              <div className="point_table">
                <div className="point_table_title">点位</div>
                <div className="point_table_List" >
                  {resultItems}
                  {this.state.resultList.length != 0 ? (
                    <div className="point_table_page_wrap" style={{ textAlign: "center" }}>
                      <Pagination
                        size="small" s
                        pageSize={this.state.pageSize}
                        current={this.state.pageNo}
                        onChange={this.pageOnChange.bind(this)}
                        total={this.state.totalCount}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            : <div className="point_search"  >
              {mhItems}
            </div>}
        </div>
        {/* <AddPubPointPosition ref="addDepartment" viewId={1} /> */}
        {this.state.isShow ? (
          <div id="rootDiv" className="_rootDiv">
            <Modal
              title={this.state.title + "点位管理"}
              mask={false}
              zIndex={0}
              maskClosable={false}
              visible={this.state.isShow}
              className="add_modal01Long"
              onCancel={this.handleCancel.bind(this)}
              getContainer={this.getloadabsd.bind(this)}
              footer={[
                <Button
                  key="btn2" className="ant-btn ant-btn-lg"
                  onClick={this.state.title == "新增" ? this.handleOk.bind(this) : this.doUpdate.bind(this)}
                  loading={this.state.loading}
                > 保存 </Button>,
                <Button key="btn1" className="ant-btn ant-btn-lg" onClick={this.handleCancel.bind(this)} >   取 消  </Button>,
              ]}
            >
              {this.state.isShow ? <AddPubPointPosition ref="addDepartment" viewId={this.state.viewId} /> : null}
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Main;
