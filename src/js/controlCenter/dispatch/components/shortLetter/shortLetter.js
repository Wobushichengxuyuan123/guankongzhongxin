import React, { Component } from 'react'
import Right from './right'
import Left from './left'
export default class shortLetter extends Component {
  render() {
    return (
      <div className="alertGbBox alertDxBox">
        <Left {...this.props}></Left>
        <Right {...this.props}></Right>
      </div>
    )
  }
}
