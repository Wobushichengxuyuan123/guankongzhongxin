import React, { Component } from "react";
import Style from "./videoComplete.module.scss";
import { Table, Button, DatePicker, Tabs, Icon, Breadcrumb } from "antd";
import Bar from "./Bar";
import Mock from "mockjs";
import AreaInfo from "./AreaInfo";
const { TabPane } = Tabs;

class videoComplete extends Component {
  constructor(props) {
    super(props);
    this.tableFRef = React.createRef();
    this.tableScrollY = 80;
    this.state = {
      dateData: "",
      nowAreaName: "",
      statisticsMethod: "time",
      openAreaInfo: false,
      areaInfoId: "",
      dataSource: [],
    };
  }
  backMain() {
    this.toggleOpenAreaInfo(false);
  }
  openAreaInfo(text, obj) {
    this.setState({
      nowAreaName: text,
      areaInfoId: obj.id,
    });
    console.log(text, obj, "openAreaInfo");
    this.toggleOpenAreaInfo(true);
  }
  getDataSource() {
    let { columns } = this.backCol();
    function backObj() {
      let infoObj = {};
      columns.forEach((v) => {
        if (v.key == "area") {
          infoObj[v.key] = Mock.mock("@county");
        } else {
          infoObj[v.key] = Mock.mock("@integer(10, 99)") + "%";
        }
        infoObj["id"] = Mock.mock("@guid");
      });
      return infoObj;
    }
    let r = new Array(36).fill(1);
    let res = [];
    r.forEach((v) => {
      let infoObj = backObj();
      res.push(infoObj);
    });
    this.setState({
      dataSource: res,
    });
  }
  backCol() {
    let columns = [
      {
        title: "所在区域",
        dataIndex: "area",
        key: "area",
        width: 200,
        render: (text, obj) => {
          return (
            <div
              style={{ color: "#096dd9", cursor: "pointer" }}
              onClick={this.openAreaInfo.bind(this, text, obj)}
            >
              {text}
            </div>
          );
        },
      },
      {
        title: "录像完整率",
        dataIndex: "full",
        key: "full",
        width: 80,
      },
    ];
    let dynamicCol = new Array(7).fill(1).map((v, i) => {
      let val = { title: "", key: "", dataIndex: "", width: 80 };
      v = new Date(new Date().getTime() - (7 - i) * 1000 * 60 * 60 * 24).Format(
        "MM-dd"
      );
      val.dataIndex = val.key = val.title = v;
      return val;
    });
    columns = columns.concat(dynamicCol);
    return { columns, dynamicCol };
  }
  toggleOpenAreaInfo(flag) {
    this.setState({
      openAreaInfo: flag,
    });
  }
  dateOnChange(date, dateString) {
    console.log(date, dateString);
    this.setState({
      dateData: dateString,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    let dom = this.tableFRef.current;
    if (dom) {
      this.tableScrollY = dom.offsetHeight-40;
    }
    return true
  }
  componentDidMount() {
    this.getDataSource();
  }
  render() {
    let { dateData, areaInfoId, statisticsMethod, dataSource, openAreaInfo } =
      this.state;
    let { columns } = this.backCol();
    return (
      <div className={Style.root}>
        <div className="breadcrumb_box">
          {openAreaInfo ? (
            <div
              onClick={this.toggleOpenAreaInfo.bind(this, false)}
              className="backIcon"
            >
              <Icon type="left-circle" />
            </div>
          ) : null}
          <div className="r">
            <Breadcrumb className="bread" separator=">">
              <Breadcrumb.Item>统计分析</Breadcrumb.Item>
              <Breadcrumb.Item>录像完整率统计</Breadcrumb.Item>
            </Breadcrumb>
            {openAreaInfo ? (
              <div className="nowArea">
                <span>所属区域: </span>
                <span>{this.state.nowAreaName || "空"}</span>
              </div>
            ) : null}
          </div>
        </div>
        {this.state.openAreaInfo ? (
          <div className="content_box" style={{ padding: "8px" }}>
            <AreaInfo
              dateData={dateData}
              areaInfoId={areaInfoId}
              parent={this}
            ></AreaInfo>
          </div>
        ) : (
          <div className="content_box">
            <div className="content">
              <div className="search_box">
                <Tabs tabBarGutter={0} defaultActiveKey="time">
                  <TabPane tab="按时间段" key="time"></TabPane>
                </Tabs>
                <div className="tabContent">
                  {/* <p className="search_title">统计时间</p> */}
                  <div className="search_v">
                    {statisticsMethod == "month" ? (
                      <DatePicker.MonthPicker
                        onChange={this.dateOnChange.bind(this)}
                        format={"YYYY-MM"}
                      />
                    ) : (
                      <DatePicker.RangePicker
                        onChange={this.dateOnChange.bind(this)}
                        format={"YYYY-MM-DD"}
                        className="search_ipt04"
                      />
                    )}
                    <Button className="search_btn" type="primary">
                      统计
                    </Button>
                  </div>
                </div>
              </div>
              <div className="chart_box">
                <Bar comName={"录像完整率top10"}></Bar>
              </div>
              <div className="sm_table">
                <p className="table_title">录像完整率统计明细</p>
                <div ref={this.tableFRef} className="init_table_scroll configList">
                  <Table
                    scroll={{ x: 840, y: this.tableScrollY }}
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                    className="table_data01"
                    bordered
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default videoComplete;
