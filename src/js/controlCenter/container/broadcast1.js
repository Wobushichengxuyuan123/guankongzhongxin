import './css/broadcast.scss';
import {Input, Collapse, Spin} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';
import BroadcastItem from './broadcastItem';
import React from 'react';

/* eslint-disable */
const Search = Input.Search;
const Panel = Collapse.Panel;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      broadcastList: [],
      sname: null,
      visible: false,
      isLoding: true,
      resNum: 0
    }
  }

  componentDidMount() {
    this.getBroadcastInfo();
  }

  getBroadcastInfo(name) {
    if (!name) {
      name = "";
    }
    this.setState({sname: name});
    fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubBroadcastSearch/broadcastInfo?name=" + name)
      .then(r => r.json())
      .then(b => {
        if (b.msg == "success") {
          this.setState({areaList: b.data});
        }
      })
  }

  broadcastInfoByAreaId(id) {
    if (id) {
      this.setState({isLoding: true, resNum: this.state.resNum + 1})
      var seqname = this.state.sname == null ? "" : "&eqment_name=" + this.state.sname;
      fetch(window.SYSTEM_CONFIG_BASICS + "/public/pubBroadcastSearch/broadcastInfoByAreaId?area_id=" + id + seqname)
        .then(r => r.json())
        .then(b => {
          if (b.data) {
            if (b.msg == "success") {
              this.setState({broadcastList: b.data, isLoding: false});
            }
          } else {
            if (this.state.resNum < 3) {
              this.broadcastInfoByAreaId(id)
            } else {
              this.setState({resNum: 0})
              // message.error('服务器异常!请稍后再试!')
            }
          }
        })
    }
  }

  changeCollapse(id) {
    this.setState({broadcastList: []});
    setTimeout((() => {
      this.broadcastInfoByAreaId(id);
    }).bind(this), 200);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  };

  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    let items = this.state.broadcastList.map((item, i) => {
      item.index = i + 1;
      return <BroadcastItem key={"BroadcastItem" + i} data={item}/>
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="broadcastList" onClick={this.showModal.bind(this)}>
          {this.state.isLoding ? <div style={{textAlign: 'center', margin: '10px 0'}}><Spin tip="加载中..."/>
          </div> : items}
        </div>

      </Panel>
    })
    return (<div className="broadcast">
      <div className="title">应急广播</div>
      <div>
        <div className="searchDiv">
          <Search className="broadcastSearchInput searchInput" placeholder="请输入广播名称"
                  onSearch={this.getBroadcastInfo.bind(this)}/>
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