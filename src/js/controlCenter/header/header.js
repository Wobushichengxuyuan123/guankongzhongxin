/* eslint-disable */

import { Menu, Dropdown,  Popover, Form, Modal, Button, Input, message } from 'antd';
import Icon from '@ant-design/icons';
import React from 'react';
import { withRouter } from 'react-router-dom'
// import { redux_utils } from 'nelda-bj-dispatch';
import './header.scss';
const FormItem = Form.Item;
var that = null;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      projectName: sessionStorage.getItem("projectName"),
      visible: false,
      //导航数据
      menuList: this.props.data,
      active: 0,//导航当前高亮
      loginName: ''
    };
    that = this;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      menuList: nextProps.data
    })
  }
  componentDidMount() {
    this.getname()
    this.getNowLocation()
  }
  getname() {
    window.projectName = (data) => {
      this.setState({
        projectName: data
      })
    }
    fetch(window.SYSTEM_CONFIG_APPLICATIONAPI + "/api/userInfo/getUserName?requestname=2")
      .then(r => r.json())
      .then(b => {
        if (b.code == 0) {
          sessionStorage.setItem('projectId', b.data.projectId);
          sessionStorage.setItem('loginName', b.data.loginName);
          sessionStorage.setItem('projectName', b.data.projectName);
          this.setState({
            userName: b.data.userName,
            loginName: b.data.loginName,
            projectName: b.data.projectName
          });
        }
      })

  }

  //刷新后，当前路由对应导航高亮
  getNowLocation() {
    let path = this.props.location.pathname
    let { menuList } = this.state
    menuList.some((item, index) => {
      console.log(item);
      if (path != '/' && item.path.indexOf(path) != -1) {
        return this.setState({ active: index })
      }
    })
  }

  getUser(b) {
    fetch(window.SYSTEM_CONFIG_APPLICATIONAPI + "/systemRelateUser/getUserByUser?masterLoginName=" + b)
      .then(r => r.json())
      .then(b => {
        if (b.code == 0) {
          for (var i = 0; i < b.data.length; i++) {
            if (b.data[i].systemCode == "20000") {
              this.setState({
                position: {
                  flag: true,
                  loginName: b.data[i].loginName,
                  password: b.data[i].password
                }
              });
            } else if (b.data[i].systemCode == "30000") {
              this.setState({
                monitor: {
                  flag: true,
                  loginName: b.data[i].loginName,
                  password: b.data[i].password
                }
              });
            } else if (b.data[i].systemCode == "40000") {
              this.setState({
                entrance: {
                  flag: true,
                  loginName: b.data[i].loginName,
                  password: b.data[i].password
                }
              });
            } else if (b.data[i].systemCode == "50000") {
              this.setState({
                radio: {
                  flag: true,
                  loginName: b.data[i].loginName,
                  password: b.data[i].password
                }
              });
            }
          }
        }
      })
  }
  //导航跳转
  routeHandler(path, index, data) {
    if (this.props.location.pathname != path) {
      this.setState({ active: index })
    }
    this.props.change(data.children)
  }
  clickCancelHander() {
    fetch(window.SYSTEM_CONFIG_APPLICATIONAUTH + "/jwt/invalid", {
      method: "post",
      body: "token=" + sessionStorage.getItem("token")
    })
      .then(r => r.json())
      .then(b => {
        if (b) {
          sessionStorage.setItem("token", "");
          // window.location.href = window.LOGINPATH + "?pathUrl=" + window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.location.href = window.LOGINPATH 
        }
      })
  }
  render() {
    const { menuList, active } = this.state
    const menu = menuList.map((item, index) => {
      return <div className={`header-div ${item.url} ${active === index ? 'active' : ''}`}  onClick={this.routeHandler.bind(this, item.url, index, item)} key={item.url}>
        <div className='header-img'> <img className='h-img'  /></div>
        <div >{item.functionName}</div>
      </div>
    })
    let mens = <Menu>
      <Menu.Item key="userRightMenu">
        <div onClick={this.clickCancelHander.bind(this)}>注销登录</div>
      </Menu.Item>
    </Menu>
    return (
      <div className="header">
        <div className="borderImg c_flex jc_c ai_c">
          <div style={{ color: "rgb(115, 251, 253)", fontSize: "25px" }}>{this.state.projectName == null ? '' : sessionStorage.getItem('projectName')}</div>
        </div>
        <div className="header-menu">
          {menu}
        </div>

        <div className="header-right">
          <Dropdown overlay={mens} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="user" className='userIco' />&nbsp;&nbsp;{this.state.userName}&nbsp;&nbsp; <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
/* eslint-enable */