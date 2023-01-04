import React from "react";
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import './menu.css';
import '../container/css/container.scss'
class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
      minCHeight: '',
      mainMenu: [],
      openKeys: [],
      menuData: [],
      currentKey: '',
      alarmCount: this.props.alarmCount
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      menuData: nextProps.data,
      alarmCount: nextProps.alarmCount
    })
  }
  onOpenChange(openKeys) {
    if (openKeys.length == 1) {
      this.setState({ openKeys });
    }
    else {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      openKeys = this.getParentMenukey(latestOpenKey);
      this.setState({ openKeys });
    }
  }
  getParentMenukey(menuKey = "") {
    let menuKeys = [];
    let splitData = menuKey.split("-");
    splitData.map((item, key) => {
      let itemval = "";
      for (var i = 0; i < (key + 1); i++) {
        itemval += splitData[i] + "-"
      }
      itemval = itemval.substring(0, itemval.length - 1);
      menuKeys.push(itemval);
    })
    return menuKeys;
  }
  shauxuan(url) {
    this.props.parent.pathUrl(url)
    this.setState({
      currentKey: url.replace("/", "").split('$').at(-1)
    })
  }
  render() {
    let menus = (list = this.state.menuData, index) => {
      return list ? list.map((item, key) => {
        const keys = item.url.replace("/", "").split('$').at(-1)
        let reval
        reval = <Menu.Item key={index + "-" + (key + 1)}>
          {item.url ? <Link to={item.url} onClick={this.shauxuan.bind(this, item.url)}>
            <div className='leftdiv'>
              <div className={`${keys}${this.state.currentKey === keys ? ' active' : ''} leftBottom `}> </div>
              <span style={{ fontSize: '12px', color: '#000' }}>{item.functionName}</span>
              {item.url == '/AlarmInfo' ? <div style={{ position: 'fixed', marginLeft: '10px', marginTop: '-10px' }}><Badge count={this.state.alarmCount} ></Badge> </div> : ''}
            </div>
          </Link>
            : <span>{item.functionName}</span>}
        </Menu.Item>
        return reval
      }) : null;
    }
    return (
      <Menu
        mode="vertical"
        theme="light"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange.bind(this)}
      >
        {menus()}
      </Menu>
    );
  }
};
export default MenuList;
