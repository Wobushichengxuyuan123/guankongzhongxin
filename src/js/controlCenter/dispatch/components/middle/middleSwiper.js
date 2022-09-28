import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { renderCallStatus } from '../../utils/middleData';
import 'swiper/swiper.scss';
export default class middleSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideKey: "",
      slideKeyInfo: null,
    }
  }
  onClick = (item) => {
    console.log(item);
    let { middleTrigger } = this.props
    middleTrigger({
      triggerType: 'onSwiperSlideClick',
      data: item
    })
    this.setState({
      slideKey: item.key,
      slideKeyInfo: item
    })
  }

  slideClassName = (item) => {
    let className  = 'custom_control'
    let {slideKey} = this.state
    if (item.key == slideKey) {
      className += ' swiperActive'
    } else {
      className += ' notSwiperActive'
    }
    if (item.callStatus == '6') {
      className += ' holdingMic'
    }
    return className
  }
  render() {
    let {
      currentTabPane
    } = this.props; 
    let swiperClass = 'middle-swiper hide-participant';
    // let reg = /(audioBroadCast)|(video)|(fileBroadCast)/ig
    let reg = /(fileBroadCast)|(video)/ig;
    // let reg2 = /(fileBroadCast)/ig;
    if (reg.test(currentTabPane.triggerType)) {
      swiperClass += ' ' + 'hide-swiper'
    }
    let isShowCallStatus = false;
    let callStatusReg = /(audioBroadCast)|(goToPhone)|(tallBack)/ig;
    // let callStatusReg = /(goToPhone)|(video)|(audioConference)|(videoConference)|(audioBroadCast)|(fileBroadCast)|(tallBack)/ig;
    isShowCallStatus = callStatusReg.test(currentTabPane.triggerType);
    // if (reg2.test(currentTabPane.triggerType)) {
    //   swiperClass += ' ' + 'show-swiper'
    // }
    return (
      <Swiper className={swiperClass} spaceBetween={16} slidesPerView={5} navigation >
        {
          currentTabPane.content.map((v) => {
            return (
              <SwiperSlide className={this.slideClassName(v)} onClick={this.onClick.bind(this,v)}  key={v.key}>
                <div className="swiperDivBox">
                  {
                    isShowCallStatus
                    ? <span className="callStatus">{renderCallStatus(v)}</span>
                    : null
                  }
                  <span className="name">{v.name}</span>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    )
  }
}
