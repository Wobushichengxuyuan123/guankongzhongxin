import './css/video.scss';
import {Input, Collapse, Spin} from 'antd';

import VideoItem from './videoItem';
import {Scrollbars} from 'react-custom-scrollbars';
import React from 'react';

const Search = Input.Search;
const Panel = Collapse.Panel;
/* eslint-disable */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: [],
      videoList: [],
      sname: null,
      isLoding: true,
      resNum: 0
    }
  }

  componentDidMount() {
    this.getVideoInfo();
  }

  getVideoInfo(name) {
    if (!name) {
      name = "";
    }
    this.setState({sname: name});
    fetch(window.BASICS_SYSTEM + "/pubVideoSearch/videoInfo?name=" + name)
      .then(r => r.json())
      .then(b => {
        if (b.msg === "success") {
          this.setState({areaList: b.data});
        }
      })
  }

  videoInfoByAreaId(id) {
    if (id) {
      this.setState({isLoding: true, resNum: this.state.resNum + 1})
      var seqname = this.state.sname === null ? "" : "&eqment_name=" + this.state.sname;
      fetch(window.BASICS_SYSTEM + "/pubVideoSearch/videoInfoByAreaId?area_id=" + id + seqname)
        .then(r => r.json())
        .then(b => {
          if (b.data) {
            if (b.msg === "success") {
              this.setState({videoList: b.data, isLoding: false});
            }
          } else {
            if (this.state.resNum < 3) {
              this.videoInfoByAreaId(id)
            } else {
              this.setState({resNum: 0})
              // message.error('服务器异常!请稍后再试!')
            }
          }
        })
    }
  }

  changeCollapse(id) {
    this.setState({videoList: []});
    setTimeout((() => {
      this.videoInfoByAreaId(id);
    }).bind(this), 200);
  }

  render() {
    let items = this.state.videoList.map((item, i) => {
      item.index = i + 1;
      return <VideoItem key={"VideoItem" + i} data={item}/>
    })
    let panels = this.state.areaList.map(item => {
      return <Panel header={item.LOCATION_AREA_name + "(" + item.count + ")"} key={item.LOCATION_AREA_id}>
        <div className="videoList">
          {this.state.isLoding ? <div style={{textAlign: 'center', margin: '10px 0'}}><Spin tip="加载中..."/>
          </div> : items}
        </div>
      </Panel>
    })
    return (<div className="video">
      <div className="title">视频监控</div>
      <div>
        <div className="searchDiv">
          <Search className="videoSearchInput searchInput" placeholder="请输入视频名称"
                  onSearch={this.getVideoInfo.bind(this)}/>
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
/* eslint-disable */