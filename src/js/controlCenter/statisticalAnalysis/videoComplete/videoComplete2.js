/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Style from "./videoComplete2.module.scss";
import { Table } from "antd";
import Mock from "mockjs";
import WorkCloseLoop from "../workCloseLoop/workCloseLoop";

class videoComplete extends Component {
  constructor(props) {
    super(props);
    this.tableFRef = React.createRef();
    this.tableScrollY = 80;
    this.state = {
      tableLoading: true,
      nowAreaName: "",
      dataSource: [],
      columns: [],
    };
  }
  getDataSource(cols) {
    console.log(cols,1818);
    let { columns } = this.backCol(cols);
    function backObj(rowIndex) {
      let infoObj = {};
      let eqName = ['高清摄像机','红外热成像摄像机','机器人摄像机1','红外热成像摄像机-通道2','高清摄像机']
      columns.forEach((v) => {
        if (v.key == "equName") {
          infoObj[v.key] =  eqName[rowIndex] //Mock.mock("@county");
        } else {
          infoObj[v.key] = Mock.mock("@integer(10, 99)") + "%";
        }
        infoObj["id"] = Mock.mock("@guid");
      });
      return infoObj;
    }
    let r = new Array(5).fill(1);
    let res = [];
    r.forEach((v,i) => {
      let infoObj = backObj(i);
      res.push(infoObj);
    });
    setTimeout(() => {
      this.setState({
        dataSource: res,
        tableLoading: false
      });
    },1000)
  }
  backCol(cols) {
    let columns = [
      {
        title: "摄像机名称",
        dataIndex: "equName",
        key: "equName",
        width: 200,
        render: (text, obj) => {
          return (
            <div style={{ color: "#096dd9" }}>{text}</div>
          );
        },
      },
      {
        title: "录像完整率",
        dataIndex: "full",
        key: "full",
        width: 160,
      },
    ];
    let dynamicCol = [];
    dynamicCol = cols.map((v, i) => {
      let val = { title: "", key: "", dataIndex: "", width: 80 };
      val.dataIndex = val.key = val.title = v;
      return val;
    });
    // let dynamicCol = new Array(37).fill(1).map((v, i) => {
    //   let val = { title: "", key: "", dataIndex: "", width: 80 };
    //   v = new Date(new Date().getTime() - (7 - i) * 1000 * 60 * 60 * 24).Format(
    //     "MM-dd"
    //   );
    //   val.dataIndex = val.key = val.title = v;
    //   return val;
    // });
    columns = columns.concat(dynamicCol);
    this.setState({
      columns
    })
    return { columns, dynamicCol };
  }
  barEvents(type,params) {
    switch (type) {
      case 'getData':
        {
          this.setState({
            tableLoading: true
          })
          console.log(93);
          this.getDataSource(params)
        }
        break;
    
      default:
        break;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    let dom = this.tableFRef.current;
    if (dom) {
      this.tableScrollY = dom.offsetHeight - 64;
    }
    return true;
  }
  componentDidMount() {
    // this.getDataSource();
  }
  render() {
    let { columns,dataSource,tableLoading } = this.state;
    return (
      <div className={Style.root}>
        {
          <div className="content_box">
            <div className="content">
              <div className="chart_box">
                <WorkCloseLoop
                  barEvents={this.barEvents.bind(this)}
                  key={"videoComplete"}
                  comKey="videoComplete"
                  comName="录像完整率统计"
                ></WorkCloseLoop>
              </div>
              <div className="sm_table">
                <p className="table_title">录像完整率统计明细</p>
                <div
                  ref={this.tableFRef}
                  className="init_table_scroll configList"
                >
                  <Table
                    loading={tableLoading}
                    scroll={{ x: 400, y: this.tableScrollY }}
                    pagination={false}
                    columns={columns}
                    rowKey="id"
                    dataSource={dataSource}
                    className="table_data01"
                    bordered
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default videoComplete;
