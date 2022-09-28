import React, { Component } from 'react'
import { Input } from 'antd';

const Search = Input.Search;

export default class search extends Component {
  render() {
    let {onSearch} = this.props
    return (
      <div className="searchDiv">
        <Search onSearch={onSearch} className="searchInput" placeholder="请输入搜索内容"/>
      </div>
    )
  }
}
