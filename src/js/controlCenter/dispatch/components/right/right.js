import React, { Component } from 'react'
import Tab from './components/suddenEvent/tab.js'
import TimeShaft from './components/suddenEvent/timeShaft.js'
import SonTable from './components/table.js'
import SonButton from './components/suddenEvent/button.js'
// import testData from '../../testSuddenEventInfo.js'
export default class right extends Component {
  constructor(props) {
    super(props)
    this.TimeShaftRef = React.createRef()
    this.state = {
      isOpenPopup: false,
      popupCon: ""
    }
  }
  xycsHandle = (data) => {
    let { type, con:{flag=false,item=null}={} } = data;
    switch (type) {
      case 'influence':
        this.setState({isOpenPopup:flag, popupCon: item.disposalProcessDesc})
        break;
      case 'reloadTimeShaft':
        this.TimeShaftRef.current.getTimeShaftData()
        break;
      default:
        break;
    }
  }
  tabTrigger = (config) => {
    let { from="", data=null } = config;
    switch (from) {
      case 'xycs':
        this.xycsHandle(data)
        break;
      default:
        break;
    }
  }
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  render() {
    console.log('right-render');
    let { treeCheckedNodes } = this.props;
    let { isOpenPopup, popupCon } = this.state;
    let suddenEventInfo = this.getSuddenInfo() || null
    let middleClassName = 'react-dispatch-right-middle';
    if (!suddenEventInfo) {
      middleClassName += ' ' + 'heiPer100'
    }
    return (
      <div id="react-dispatch-right" className="yixian">
        {isOpenPopup?<div className="popup"><div onClick={()=>this.setState({isOpenPopup:false})} class="popup-close">X</div><p>{popupCon}</p></div>:""}
        { suddenEventInfo?<Tab tabTrigger={this.tabTrigger}></Tab>:null }
        <div className={middleClassName}>
          { (suddenEventInfo&&treeCheckedNodes.length===0)?<TimeShaft ref={this.TimeShaftRef}></TimeShaft>:null }
          { ((suddenEventInfo&&treeCheckedNodes.length!==0) || !suddenEventInfo) ? <SonTable suddenEventInfo={suddenEventInfo} {...this.props}></SonTable>: null}
        </div>
        { suddenEventInfo?<SonButton suddenEventInfo={suddenEventInfo}></SonButton>:null }
      </div>
    )
  }
}
