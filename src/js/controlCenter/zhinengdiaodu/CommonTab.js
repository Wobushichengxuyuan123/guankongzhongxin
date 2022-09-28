import React, { Component } from 'react'
import _ from 'lodash';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
export default class CommonTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "1-1"
    }
  }
  tabsClick = (activeKey) => {
    let {
      updateTableData
    } = this.props;
    let eventLevel = parseInt(activeKey.split("-").reverse().join());
    if (updateTableData) {
      updateTableData({
        eventLevel: eventLevel
      })
    }
    this.setState({ activeKey });

    console.log(activeKey,'点击的tab');
  }
  render() {
    const {
      tabPaneList
    } = this.props;
    let lastTabPaneList = tabPaneList || this.state.tabPaneList;
    return (
      <Tabs 
      className="CommonTab"
      activeKey={this.state.activeKey}
      onTabClick={this.tabsClick}
      tabBarStyle = {{
        color: '#fff',
      }}
      >
        {
          lastTabPaneList.map(item => {
            return (
              <TabPane tab={item.tab} key={item.key + ""}>
                {
                  item.value || item.childrenProp || null
                }
              </TabPane>
            )
          })
        }
      </Tabs>
    )
  }
}
