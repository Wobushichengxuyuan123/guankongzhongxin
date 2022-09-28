import './css/entranceGuard.scss';
import {Input, Collapse, Spin} from 'antd/lib/index';
import {Scrollbars} from 'react-custom-scrollbars';
import EntranceGuardItem from './entranceGuardItem';
import React from 'react';


const Search = Input.Search;
const Panel = Collapse.Panel;
/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      entranceGuardList: [],
      sname: null,
      isLoding: true,
      resNum: 0
    }
  }

  componentDidMount() {
    this.getEntranceGuardInfo();
  }

  getEntranceGuardInfo(name) {
    if (!name) {
      name = "";
    }
    this.setState({sname: name});
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfo?name=" + name)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          this.setState({areaList: b.data});
        }
      })
  }

  entranceGuardInfoByAreaId(id) {
    if (id) {
      this.setState({isLoding: true, resNum: this.state.resNum + 1})
      var seqname = this.state.sname === null ? "" : "&eqment_name=" + this.state.sname;
      fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubEntranceGuardSearch/entranceGuardInfoByAreaId?area_id=" + id + seqname)
        .then(r => r.json())
        .then(b => {
          if (b.data) {
            if (b.msg === "success") {
              this.setState({entranceGuardList: b.data, isLoding: false});
            }
          } else {
            if (this.state.resNum < 3) {
              this.entranceGuardInfoByAreaId(id)
            } else {
              this.setState({resNum: 0})
              // message.error('服务器异常!请稍后再试!')
            }
          }
        })
    }
  }

  changeCollapse(id) {
    this.setState({entranceGuardList: []});
    setTimeout((() => {
      this.entranceGuardInfoByAreaId(id);
    }).bind(this), 200);
  }

  render() {
    let items = this.state.entranceGuardList.map((item, i) => {
      item.index = i + 1;
      return <EntranceGuardItem key={"EntranceGuardItem" + i} data={item}/>
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="entranceGuardList">
          {this.state.isLoding ? <div style={{textAlign: 'center', margin: '10px 0'}}><Spin tip="加载中..."/>
          </div> : items}
        </div>
      </Panel>
    })
    return (<div className="entranceGuard">
      <div className="title">洞室进度</div>
      <div>
        <div className="searchDiv" style={{paddingTop: 20}}>
          <Search className="entranceGuardSearchInput searchInput" placeholder="请输入进度名称"
                  onSearch={this.getEntranceGuardInfo.bind(this)}/>
        </div>
        <div style={{height: (window.document.documentElement.clientHeight - 200)}}>
          <Scrollbars>
            {panels ?
              <Collapse accordion onChange={this.changeCollapse.bind(this)}>
                {panels}
              </Collapse>
              : null}
          </Scrollbars>
        </div>
      </div>
    </div>);
  }
}

export default Main;
/* eslint-enable */