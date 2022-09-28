import React, { Component } from 'react'

export default class Zydd extends Component {
  componentDidMount() {
    console.log('run');
    window.parent&&window.parent.zhddZydd&&window.parent.zhddZydd()
  }
  componentWillUnmount() {
    console.log(12);
  }
  render() {
    console.log('render');
    return (
      <div className="zydd">
        
      </div>
    )
  }
}
