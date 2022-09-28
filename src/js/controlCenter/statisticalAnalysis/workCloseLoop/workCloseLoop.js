/* eslint-disable no-lone-blocks */
import React, { Component, Fragment } from "react";
import MyBar from "../MyBar/MyBar";
import moment from 'moment';
import Style from "./workCloseLoop.module.scss";
import { DatePicker, message, Spin, Icon, Breadcrumb } from "antd";
import { getData, exportEcharts as _exportEcharts } from "../config";
import AreaInfo from "../videoComplete/AreaInfo";
import { getCurrentDayInfo } from "../week";

let defaultNow = getCurrentDayInfo(new Date())
let defaultS = new Date(`${defaultNow.year}-${defaultNow.month - 1}-${defaultNow.currentDay}`)
let defaultE = new Date();
let _this = null;
class workCloseLoop extends Component {
  constructor(props) {
    super(props);
    _this = this;
    this.state = {
      openAreaInfo: false,
      loading: false,
      sourceBtnActiveKey: "statistics",
      // sourceBtnList: [
      //   { key: "statistics", name: "统计分析" },
      //   { key: "inspection", name: "巡检出勤率" },
      // ],
      btnActiveKey: "day",
      btnList: [
        { key: "day", name: "按日统计" },
        { key: "week", name: "按周统计" },
        { key: "month", name: "按月统计" },
      ],
      echartsData: [],
      dateData: "",
      dayData: [],
      weekData: [],
      monthData: [],
      xAxis: {
        data: [],
      },
      yAxis: {
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value, index) {
            return value + "%";
          },
        },
      },
      series: [],
    };
  }
  setBtnActiveKey(v) {
    // this.setState({ btnActiveKey: v.key });
    this.updateEcharts("", v.key, this.state.dateData, "");
    console.log(this.state.dateData, "this.state.dateData");
  }
  setSourceBtnActiveKey(v) {
    this.updateEcharts("", "", this.state.dateData, v.key);
    console.log(this.state.dateData, "this.state.dateData");
  }
  updateEcharts(
    comKey1 = "",
    btnActiveKey1 = "",
    dateData1 = "",
    sourceBtnActiveKey1 = ""
  ) {
    let { yAxis } = this.state;
    let _yAxis = yAxis;
    let comKey = comKey1 || this.props.comKey;
    let btnActiveKey = btnActiveKey1 || this.state.btnActiveKey;
    let dateData = dateData1;
    let sourceBtnActiveKey =
      sourceBtnActiveKey1 || this.state.sourceBtnActiveKey;
    this.setState({
      loading: true,
    });
    getData(comKey, btnActiveKey, dateData, sourceBtnActiveKey)
      .then((res) => {
        console.log(res, 67);
        // if (btnActiveKey == 'week') {
        //   res.xAxis.data = res.xAxis.data.map(v => {
        //     v = new Date(v).Format('yyyy年MM月dd日');
        //     return v;
        //   })
        // }
        // if (btnActiveKey == 'month') {
        //   res.xAxis.data = res.xAxis.data.map(v => {
        //     v = new Date(v).Format('yyyy年MM月');
        //     return v;
        //   })
        // }
        if (this.props.comKey == 'videoComplete') {
          console.log(this.props, 64);
          this.props.barEvents('getData', res.xAxis.data)
        }
        if (res.yAxis) {
          _yAxis = res.yAxis;
        }
        this.setState({
          xAxis: res.xAxis,
          yAxis: _yAxis,
          // echartsData: res.data,
          series: res.series,
          loading: false,
          dateData,
          btnActiveKey,
          sourceBtnActiveKey,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
  dateOnChange(date, dateString) {
    if (!dateString[0]) {
      dateString = [defaultS, defaultE];
    }
    this.updateEcharts("", "", dateString);
  }
  toggleOpenAreaInfo(flag) {
    this.setState({
      openAreaInfo: flag,
    });
  }
  events(eventObj) {
    if (this.props.comKey !== 'videoComplete') {
      return true;
    }
    let { type, params } = eventObj;
    switch (type) {
      case "click":
        {
          this.toggleOpenAreaInfo(true);
          console.log(params, "点击事件的参数");
        }
        break;

      default:
        break;
    }
  }
  exportEcharts() {
    _exportEcharts({
      url: '/nelda-inspection/patrolDutyStatistics/exportExcel',
      exportFileName: '巡视任务分析报表',
      fetchBody: {
        dataType: _this.state.btnActiveKey,
        dataTime: _this.state.dateData || [defaultS, defaultE]
      }
    })
  }
  componentDidMount() {
    this.updateEcharts("", "", [defaultS, defaultE]);
  }
  render() {
    let { openAreaInfo, loading, yAxis, xAxis, series, btnList, btnActiveKey, } = this.state;
    // sourceBtnActiveKey,
    // sourceBtnList,

    let { isShowControlBtn, comKey, comName, isSupportExport = false } = this.props;
    let option = {
      xAxis,
      series,
      tooltip: {
        trigger: "axis",
      },
      yAxis,
      legend: {
        show: true,
        bottom: 0,
        type: 'scroll',
        itemGap: 8
      },
    };
    let backClassName = (v, btnActiveKey) => {
      let className =
        Style.btn + " " + (btnActiveKey === v.key ? Style.active : "");
      return className;
    };
    return (
      <div className={Style.root}>
        {false ? (
          <Fragment>
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
            <div className="content_box" style={{ padding: "8px" }}>
              <AreaInfo
                dateData={this.state.dateData}
                areaInfoId={"areaInfoId"}
                parent={this}
              ></AreaInfo>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h3>{comName}</h3>
            {
              isSupportExport
                ? (
                  <div className={Style.export_box}>
                    <span onClick={this.exportEcharts} className={Style.supportExportBtn}>导出报表</span>
                  </div>
                )
                : null
            }

            <div className={Style.dataControl}>
              {isShowControlBtn ? (
                <div className={Style.toggleData}>
                  {btnList.map((v) => {
                    return (
                      <div
                        key={v.key}
                        className={backClassName(v, btnActiveKey)}
                        onClick={this.setBtnActiveKey.bind(this, v)}
                      >
                        {v.name}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {/* {comKey === "runDay" ? (
                <div className={Style.toggleSourceData}>
                  {sourceBtnList.map((v) => {
                    return (
                      <div
                        key={v.key}
                        className={backClassName(v, sourceBtnActiveKey)}
                        onClick={this.setSourceBtnActiveKey.bind(this, v)}
                      >
                        {v.name}
                      </div>
                    );
                  })}
                </div>
              ) : null} */}
              <div className={Style.time}>
                <DatePicker.RangePicker
                  defaultValue={[moment(defaultS, 'YYYY/MM/DD'), moment(defaultE, 'YYYY/MM/DD')]}
                  onChange={this.dateOnChange.bind(this)}
                  format={"YYYY-MM-DD"}
                  className="search_ipt04"
                  placement='bottomRight'
                />
              </div>
            </div>

            <div className={Style.content}>
              <Spin size="large" spinning={loading}>
                <MyBar events={this.events.bind(this)} option={option}></MyBar>
              </Spin>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default workCloseLoop;
