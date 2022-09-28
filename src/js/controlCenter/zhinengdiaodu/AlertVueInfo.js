import React, { Component } from 'react'
import { Modal,Tabs } from 'antd';
import CommonTab from './CommonTab';
import './css/index.scss'
import Command from './vueComponents/Command';
import Organization from './vueComponents/Organization';
import RankTab from './vueComponents/RankTab';
import Response from './vueComponents/Response';
import Equipment from './vueComponents/Equipment';
const { TabPane } = Tabs;
export default class AlertVueInfo extends Component {
  constructor(props) {
    super(props)
    this.rankTab = React.createRef()
    this.command = React.createRef()
    this.organization = React.createRef()
    this.response = React.createRef()
    this.equipment = React.createRef()
    this.activeKey = "1"
    this.state = {
      tabPaneList: [
        {
          tab: "事件分级",
          key: "1",
          value: "",
          CommonTab: 1,
          childrenProp: <RankTab ></RankTab>
        },
        {
          tab: "应急指挥机构及职责",
          key: "2",
          value: "",
          CommonTable:1,
          childrenProp: <Command ></Command>
        },
        {
          tab: "应急机构职员",
          key: "3",
          value: "",
          CommonTable:1,
          childrenProp: <Organization ></Organization>
        },
        {
          tab: "各级事件响应措施",
          key: "4",
          value: "",
          CommonTab: 1,
          childrenProp: <Response ></Response>
        },
        {
          tab: "应急物资装备清单",
          key: "5",
          value: "",
          CommonTab: 1,
          childrenProp: <Equipment ></Equipment>
        },
      ]
    }
  }
  // ~------------------------------------methods--------------------------------------------
  // #region methods
  onCancel = () => {
    this.props.cancelFun(false)
  }
  tabsClick = (activeKey) => {
    activeKey -= 0;
    switch (activeKey) {
      case 1:
        console.log(this);
        break;
      case 2:
        console.log(this.command);
        this.command.current && this.command.current.getAndUpdateTableData({});
        break;
      case 3:
        console.log(this.organization);
        this.organization.current && this.organization.current.getAndUpdateTableData({});
        break;
      case 4:
        console.log(this);
        break;
      case 5:
        console.log(this);
        break;
      default:
        console.log(this,'default');
        break;
    }
    this.activeKey = activeKey + ""
    let one = this.rankTab.current;
    let four = this.response.current;
    let five = this.equipment.current;
    one&&(one.commonTab.current.state.activeKey = '0');
    four&&(four.commonTab.current.state.activeKey = '0');
    five&&(five.commonTab.current.state.activeKey = '0');
    this.setState({})
  }
  initTabActiveKey = (flag) => {
    // tab order
    let one = this.rankTab.current;
    let four = this.response.current;
    let five = this.equipment.current;
    if (!flag) {
      this.activeKey = "0"
      one&&(one.commonTab.current.state.activeKey = '0');
      four&&(four.commonTab.current.state.activeKey = '0');
      five&&(five.commonTab.current.state.activeKey = '0');
    }
  }
  // #endregion
  // ~------------------------------------render--------------------------------------------
  // #region render
  render() {
    let {
      modalTitle,
      visible
    } = this.props;
    this.initTabActiveKey(visible)
    return (
      <Modal
        wrapClassName="AlertVueInfo"
        title={modalTitle}
        visible={visible}
        onCancel={this.onCancel}
        footer={null}
        width={'90%'}
        style={{ 
          top: '15vh',
          left: '5%',
          marginLeft: '0',
        }}
      >
        <Tabs
        activeKey={this.activeKey}
        onTabClick={this.tabsClick}
        >
          <TabPane tab="事件分级" key="1">
            <RankTab ref={this.rankTab} {...this.props}></RankTab>
          </TabPane>
          <TabPane tab="应急指挥机构及职责" key="2">
            <Command ref={this.command} {...this.props}></Command>
          </TabPane>
          <TabPane tab="应急机构职员" key="3">
            <Organization ref={this.organization} {...this.props}></Organization>
          </TabPane>
          <TabPane tab="各级事件响应措施" key="4">
            <Response ref={this.response} {...this.props}></Response>
          </TabPane>
          <TabPane tab="应急物资装备清单" key="5">
            <Equipment ref={this.equipment} {...this.props}></Equipment>
          </TabPane>
        </Tabs>,
        {/* <CommonTab watchFun={this.watchFun} tabPaneList={tabPaneList}>

        </CommonTab> */}
      </Modal>
    )
  }
  // #endregion
}
