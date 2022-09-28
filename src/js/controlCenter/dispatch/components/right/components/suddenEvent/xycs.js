import React from "react";


class Sycs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sycsList: []
    }
  }
  backExecuteClassName = (item) => {
    if (item.isCompleteFlag == 1) {
      return "item-btn execute isCompleteFlag"
    } else {
      return "item-btn execute"
    }
  }
  Influence = (item) => {
    let { tabTrigger } = this.props;
    tabTrigger({ from: 'xycs', data: { type: 'influence', con:{flag: true, item} } } )
  }
  Execute = (item) => {
    if (item.isCompleteFlag == 1) {
      return
    }
    let fetchData = {keyId: item.keyId}
    let url = window.ZHDD + "/yjzhYjzhSuddenEventDisposalProcess/implementDisposalProcessDesc"
    fetch(url,{
      method: "POST",
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
    .then(res => {
      // 刷新 时间轴
      let { tabTrigger } = this.props;
      tabTrigger({ from: 'xycs', data: { type: 'reloadTimeShaft'}})
      this.getSycsList()
    },err => {
      console.log(err);
    })
  }   
  getSuddenInfo = () => {
    let s = window.sessionStorage.getItem('suddenEventInfo')
    let res = s&&JSON.parse(s);
    return res
  }
  getSycsList = () => {
    let suddenEventInfo = this.getSuddenInfo();
    if (!suddenEventInfo) return true;
    let faActDeskId = suddenEventInfo && suddenEventInfo.actDeskId
    let sycsList = []
    let propActDeskId = suddenEventInfo.actDeskId; 
    let suddenEventId = faActDeskId || propActDeskId;
    let data = `suddenEventId=${suddenEventId}&eventLevel=一级`
    let url = window.ZHDD + '/yjzhYjzhSuddenEventDisposalProcess/getSuddenEventDisposalProcessList'
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
    const { sycsList} = this.state;
    return (
      <div className="xycs-box">
        {
          sycsList.length
          ? (
            sycsList.map(item => {
              return (
                <div key={item.keyId} className="xycsItem">
                <div className="head">
                  <p className="xycs-title">响应措施{item.disposalProcessOrderNum}</p>
                  <div className="r">
                    <span className="item-btn" onClick={this.Influence.bind(this,item)}>影响</span>
                    <span className={this.backExecuteClassName.bind(this,item)()} onClick={this.Execute.bind(this,item)}>执行</span>
                  </div>
                </div>
                <div className="cont">
                  <p>{item.disposalProcessDesc}</p>
                </div>
              </div>
              )
            })
          )
          : <p>暂无信息...</p>
        }
      </div>
    );
  }
}
export default Sycs;
