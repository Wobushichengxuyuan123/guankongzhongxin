import React, { Component } from "react";
import Style from "./AreaInfo.module.scss";
import { Table } from "antd";
import Mock from "mockjs";

class AreaInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageNo: 1,
      day31: "1,3,5,7,8,10,12",
      totalCount: 0,
      dataSource: [],
    };
  }
  getDataSource() {
    let { columns } = this.backCol();
    function backObj() {
      let infoObj = {};
      columns.forEach((v) => {
        if (v.key == "ip") {
          infoObj["ip"] = Mock.mock("@ip");
        } else if (v.key == "area") {
          infoObj[v.key] =
            "监测点" + Mock.Random.cword("零一二三四五六七八九十", 3);
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
        title: "监控点名称",
        dataIndex: "area",
        key: "area",
        width: 200,
      },
      {
        title: "IP地址",
        dataIndex: "ip",
        key: "ip",
        width: 128,
      },
      {
        title: "录像完整率",
        dataIndex: "full",
        key: "full",
        width: 112,
      },
    ];
    let dayNum = 30;
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let isRunNian = false;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      isRunNian = true;
    } else {
      isRunNian = false;
    }
    if (isRunNian && month == 2) {
      dayNum = 29;
    } else if (this.state.day31.includes(month)) {
      dayNum = 31;
    } else {
      dayNum = 30;
    }
    let dynamicCol = new Array(dayNum).fill(1).map((v, i) => {
      let val = { title: "", key: "", dataIndex: "", width: 100 };
      v =
        (month >= 10 ? month : "0" + month) +
        "-" +
        (i + 1 >= 10 ? i + 1 : "0" + (i + 1));
      val.dataIndex = val.key = val.title = v;
      return val;
    });
    columns = columns.concat(dynamicCol);
    return { columns, dynamicCol };
  }
  pageQuery(pageNo) {
    this.setState({
      pageNo,
    });
  }
  componentDidMount() {
    console.log(this.props, "componentDidMount");
    this.getDataSource();
  }
  render() {
    let { dataSource } = this.state;
    let { columns } = this.backCol();
    let pagination = {
      pageSize: this.state.pageSize,
      current: this.state.pageNo,
      // total: this.state.totalCount,
      showQuickJumper: true,
      showTotal: (total, range) =>
        `共计 ${total} 条，当前 ${range[0]}-${range[1]} 条`,
      onChange: ((no) => {
        this.pageQuery(no);
      }).bind(this),
    };
    let { parent } = this.props;
    return (
      <div className={Style.root + " areaInfo configList"}>
        <Table
          scroll={{ x: 3440,y:400 }}
          columns={columns}
          dataSource={dataSource}
          className="table_data01"
          pagination={pagination}
          bordered
        />
      </div>
    );
  }
}

export default AreaInfo;
