// ~ --------------------------------------------------import-------------------
import React, { Component } from "react";
import PropTypes from 'prop-types'; 
import { Tabs, Button } from 'antd';
// import SwiperCore, { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
// ~ --------------------------------------------------plug-in-------------------
const { TabPane } = Tabs;
// ~ --------------------------------------------------class component-------------------

class TabPaneContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      isActive: props.members.length ? (props.members[0]['key'] || '') : '',
      item: props.members.length ? (props.members[0] || '') : ''
    }
  }
  swiperClick = (params) => {
    this.setState((state,props) => {
      return {
        isActive: params
      }
    })
    this.props.groupWatchFun({
      sipNum: params.key,
      item: params
    })
  }
  componentDidMount() {
    if (this.props.groupWatchFun) {
      this.props.groupWatchFun({
        sipNum: this.state.isActive,
        item: this.state.item
      })
    }
  }
  callSwiper = (parameter) => {
    return (
      this.props.members.map((item) => {
        return (
          <SwiperSlide
          onClick={this.swiperClick.bind(this,item)}
          key={item.key}>
            <div 
              style={{cursor: 'pointer'}}
              className={this.state.isActive['key'] == item.key ? 'swiperBox swiperActive' : 'swiperBox notSwiperActive'}>
                <span className="callStatus">{item.callStatus}</span>
              <span className="name">{item.key + '-' + item.personName}</span>
            </div>
          </SwiperSlide>
        )
      })
    )
  }
  baseSwiper = (parameter) => {
    return (
      this.props.members.map((item) => {
        return (
          <SwiperSlide
            key={item.key}>
            <div>
              <span className="name">{item.key + '-' + item.personName}</span>
            </div>
          </SwiperSlide>
        )
      })
    )
  }
  render() {
    console.log(73,this.props);
    return (    
      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        navigation
      >
        {
          !/(呼叫|视频呼叫)/ig.test(this.props.paneName)
          ? this.baseSwiper()
          : this.callSwiper()
        }
      </Swiper>
    );
  }
}
class Groups extends Component {
  // ?-------------------------------------------------constructor---------------------------
  constructor(props) {
    super(props);
    this.state = {};
  }
  // ?-------------------------------------------------render---------------------------
  render() {
    // ?-------------------------------------------------return---------------------------
    return (
      <div className="groups-box">
        <Tabs
          hideAdd
          onChange={this.props.groupsTabsOnchange}
          activeKey={this.props.groupsInfoObj.activeKey}
          defaultActiveKey="1"
        >
          {this.props.groupsInfoObj.panes.map(pane => (
            <TabPane tab={pane.tem_groupName?pane.tem_groupName:((pane.name ? pane.name.split("_")[1] : '组') + pane.nIDGroup)} key={pane.nIDGroup}>
              <TabPaneContent
                paneName={pane.name}
                groupWatchFun={this.props.groupWatchFun}
                members={pane.members}
              ></TabPaneContent>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
// ~ --------------------------------------------------props-------------------
Groups.propTypes = {
  groupsTabsOnEdit: PropTypes.func.isRequired
  ,groupsTabsOnchange: PropTypes.func.isRequired
  ,groupsInfoObj: PropTypes.shape({
    activeKey: PropTypes.string.isRequired,
    panes: PropTypes.array.isRequired
  })
}
// ~ --------------------------------------------------export default-------------------
export default Groups;





