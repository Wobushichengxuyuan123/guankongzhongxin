import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import MiddleSwiper from './middleSwiper';
const { TabPane } = Tabs;
class middle extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  onTabClick = (currentTabPaneKey) => {
    let {middleTrigger} = this.props;
    middleTrigger({
      triggerType: 'onTabClick',
      data: currentTabPaneKey
    })
  }
  renderTabPane = (array=[]) => {
    return array.map((v,i) => {
      return (
        <TabPane tab={v.tabTitle + v.groupId||""} key={v.tabId}>
          <MiddleSwiper middleTrigger={this.props.middleTrigger} currentTabPane={v}></MiddleSwiper>
        </TabPane>
      )
    })
  }
  render() {
    console.log('middle-render');
    let { redux_middleTabData, redux_midTabActive } = this.props;
    let middleClass = "";
    return (
      <div id="react-dispatch-middle" className={middleClass}>
        <div className="tabs">
          <Tabs onTabClick={this.onTabClick} activeKey={redux_midTabActive}>
            {
              this.renderTabPane(redux_middleTabData)
            }
          </Tabs>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    redux_midTabActive: state.dispatchReducer.middleTabPaneActiveKey,
    redux_middleTabData: state.dispatchReducer.middleTabData,
  }),
  null
)(middle)
