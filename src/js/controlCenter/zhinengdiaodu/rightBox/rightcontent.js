// ~ --------------------------------------------------import-------------------
import { Scrollbars } from "react-custom-scrollbars";
import React from "react";
import PropTypes from 'prop-types'
import { Tabs, Input, Collapse, Icon, Button } from "antd";
import "../css/index.scss";
import Sjxq from "./sjxq";
import Ppya from "./ppya";
import SelectList from "./selectList";
import BtnGroup from "./btnGroup";
import Sycs from "./xycs";
import TimeShaft from "./timeShaft";
// ~ --------------------------------------------------plug-in-------------------
const { TabPane } = Tabs;
// ~ --------------------------------------------------class component-------------------
class Right extends React.Component {
  // ?-------------------------------------------------constructor---------------------------
  constructor(props) {
    super(props);
    this.sjxq = React.createRef()
    this.ppya = React.createRef()
    this.xycs = React.createRef()
    this.state = {
      activeKey: 'sjxq',
      executePlanId: null
    };
  }
  // ?-----------------------------------------------------methods---------------------------
  executePlan = (parameter) => {
    let {planId:executePlanId} = parameter;
    this.setState({executePlanId})
    this.tabOnChange("xycs")
  }
  tabOnChange = (activeKey) => {
    if ( activeKey == 'zydd' ) {
      window.parent&&window.parent.zhddZydd&&window.parent.zhddZydd()
      return;
    }
    this.setState({activeKey})
    switch (activeKey) {
      case "sjxq":
        this.sjxq.current&&this.sjxq.current.getSjxqList()
        break;
      case "ppya":
        this.ppya.current&&this.ppya.current.getPpyaList()
        break;
      case "xycs":
        this.xycs.current&&this.xycs.current.getSycsList()
        break;
      default:
        break;
    }
  }
  // ? ----------------------------------------------------render-------------------------------
  render() {
    let {
      dataSource,
      columns,
      suddenEventInfo
    } = this.props;
    // ? ----------------------------------------------------ExchangeSelectBoxAndTimeShaftBox-------------------------------
    const ExchangeSelectBoxAndTimeShaftBox = () => {
      if(dataSource.length) {
        return (
          <SelectList 
            columns={ columns }
            dataSource={ dataSource }
          ></SelectList>
        )
      } else if (suddenEventInfo) {
        return (
          <TimeShaft
          suddenEventInfo={suddenEventInfo}
          ></TimeShaft>
        )
      } else {
        return (
          <SelectList 
            columns={ columns }
            dataSource={ dataSource }
          ></SelectList>
        )
      }
    }
    const isShowBtnGroup = () => {
      if (suddenEventInfo) {
        return (
          <BtnGroup
          suddenEventInfo={suddenEventInfo}
          ></BtnGroup>
        )
      } else {
        return null
      }
    }
  // ? ----------------------------------------------------return-------------------------------
    return (
      <div className="rightContent" style={{ height: window.document.documentElement.clientHeight - 64, overflow: "hidden" }}>
        {
          suddenEventInfo
          ? (
            <Tabs activeKey={this.state.activeKey} onChange={ this.tabOnChange } className="tabs">
              <TabPane tab="事件详情" key="sjxq">
                <Sjxq 
                  ref={this.sjxq}
                  suddenEventInfo={ this.props.suddenEventInfo } 
                />
              </TabPane>
              <TabPane tab="匹配预案" key="ppya">
                <Ppya
                ref={this.ppya}
                executePlan={this.executePlan}
                {
                  ...this.props
                }
                />
              </TabPane>
              <TabPane tab="响应措施" key="xycs">
                <Sycs
                ref={this.xycs}
                executePlanId={this.state.executePlanId}
                suddenEventInfo={ this.props.suddenEventInfo } 
                />
              </TabPane>
              <TabPane tab="资源调度" key="zydd">
                <h3>资源调度</h3>
              </TabPane>
            </Tabs>
          )
          : null
        }
        <div className="rightContentMiddle">
          {
            ExchangeSelectBoxAndTimeShaftBox()
          }
        </div>
        {/* <BtnGroup></BtnGroup> */}
      </div>
    );
  }
}

Right.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array
}
Right.defaultsProps = {
  columns: [],
  dataSource: []
}

export default Right;
