import React from "react";

const SycsItem = function(props) {
  let item = props.item;
  return (
    <div key={item.keyId} className="xycsItem">
      <p className="xycs-title">响应措施{item.disposalProcessOrderNum}</p>
      <div className="cont">
        <p>{item.disposalProcessDesc}</p>
      </div>
    </div>
  )
}
class Sycs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sycsList: []
    }
  }
  getSycsList = (parameter) => {
    console.log(this.props,'获取响应措施');
    let faSession = JSON.parse(window.parent.sessionStorage.getItem('suddenEventInfo')) || null;
    let faActDeskId = faSession && faSession.actDeskId
    // let planIdFa = faSession && faSession.suddenEventInfo && faSession.suddenEventInfo.planId || ''
    // let eventLevelNameFa = faSession && faSession.suddenEventInfo && faSession.suddenEventInfo.eventLevelName || ''
    let {
      suddenEventInfo,
      executePlanId
    } = this.props;
    let sycsList = []
    let propActDeskId = suddenEventInfo.actDeskId;
    // let planId = suddenEventInfo.planId || executePlanId || planIdFa;
    // let eventLevelName = suddenEventInfo.eventLevelName || eventLevelNameFa;
    // let data = `planId=${planId}&eventLevel=${eventLevelName}`
    let suddenEventId = faActDeskId || propActDeskId;
    let data = `suddenEventId=${suddenEventId}`
    let url = '/zhdd-zhdd/yjzhYjzhSuddenEventDisposalProcess/getSuddenEventDisposalProcessList'
    // if (planId&&eventLevelName) {
    if (suddenEventId) {
      fetch(url,{
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data
      }).then(result => result.json())
      .then(res => {
        sycsList = res;
        this.setState({sycsList})
      },(error) =>{})
    }
  }
  componentDidMount() {
    this.getSycsList()
  }
  render() {
    const {
      sycsList
    } = this.state;
    return (
      <div className="xycs-box">
        {
          sycsList.length
          ? (
            sycsList.map(item => {
              return <SycsItem key={item.keyId} item={item}></SycsItem>
            })
          )
          : <p>暂无信息...</p>
        }
      </div>
    );
  }
}
export default Sycs;
