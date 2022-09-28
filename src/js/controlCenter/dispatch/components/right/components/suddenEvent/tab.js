import React, { Component } from 'react'
import { Tabs } from 'antd';
import Sjxq from './sjxq';
import Ppya from './ppya';
import Xycs from './xycs';
import Zydd from './zydd';
const { TabPane } = Tabs;
export default class tab extends Component {
  tabOnChange = (key) => {
    switch (key) {
      case 'zydd':
        window.parent&&window.parent.zhddZydd&&window.parent.zhddZydd()
        break;
    
      default:
        break;
    }
  }
  render() {
    return (
      <div className="react-dispatch-right-tab">
        <Tabs onChange={ this.tabOnChange }>
          <TabPane tab="事件详情" key="sjxq">
            <Sjxq></Sjxq>
          </TabPane>
          <TabPane tab="匹配预案" key="ppya">
            <Ppya></Ppya>
          </TabPane>
          <TabPane tab="响应措施" key="xycs">
            <Xycs {...this.props}></Xycs>
          </TabPane>
          <TabPane tab="资源调度" key="zydd">
            <Zydd></Zydd>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
