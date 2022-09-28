import React, { Component } from 'react'
import { Input } from "antd";
import ListItem from './dxBoxComponents/dxBoxLeft/ListItem';
const Search = Input.Search;
export default class dxBoxLeft extends Component {
  // ~------------------------------------methods--------------------------------------------
  // #region methods
  searchFun = v => {
    let {
      sonfun
    } = this.props;
    sonfun({
      type: 'click-search',
      arg: {v}
    })
    console.log(v,"搜索的内容");
  }
  // #endregion
  render() {
    let {
      dxBoxLeftList,
      alreadySendMsgPersons
    } = this.props;
    const FxListItem = (props) => {
      let {item} = props;
      let config = {
        name : '',
        sipNum: '',
        nIDGroup: '',
        members: []
      }
      if (item['nIDGroup']) {
        config.name = "组" + item.nIDGroup;
        config.nIDGroup = item.nIDGroup
        config.sipNum = ''
        // config.members = item.members
        config.members = [item.nIDGroup]
        return (
          <ListItem alreadySendMsgPersons={alreadySendMsgPersons} sonfun={this.props.sonfun} config={config}></ListItem>
        )
      } else {
        // config.name = item.personName + item.key;
        config.name = item.key || item.sipNum;
        config.sipNum = item.key || item.sipNum;
        config.nIDGroup = ''
        config.members = []
        return (
          <ListItem alreadySendMsgPersons={alreadySendMsgPersons} sonfun={this.props.sonfun} config={config}></ListItem>
        )
      }
    }
    return (
      <div>
        <div className="searchDiv">
					<Search onSearch={this.searchFun.bind(this)} className="searchInput" placeholder={ "" }/>
				</div>
        <div className="main-content">
          {
            dxBoxLeftList.map((item,index) => {
              return <FxListItem key={index} item={item}></FxListItem>
            })
          }
        </div>
      </div>
    )
  }
}
