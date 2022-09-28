import React, { Component, Fragment } from "react";
import { Tree } from "antd";
import { renderTreeLeafSipSvg,renderTitleClassName } from '../../../utils/renderTitleAndStatus'
import { getStateByProp } from "../../../redux/redux_utils";
const { TreeNode } = Tree;
export default class tree extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	onCheck = (checkedKeys,e) => {
		let {
			treeTrigger
		} = this.props;
		let data = {
			triggerType: 'onCheck',
			data: {
				checkedKeys,
				e
			}
		}
		treeTrigger(data)
	}

  renderTreeLeafTitle = data => {
    return (
      <Fragment>
        {/* <span className="leafTitle">{data.title}({data.sipNum})</span> */}
        <span className="leafTitle">{data.title}({data.sipNum})</span>
				<span className="sipSvg">{renderTreeLeafSipSvg(data.sipType)}</span>
      </Fragment>
    )
  }
  renderTreeNodes = data => {
		let iscRelationInfo = getStateByProp('iscRelationInfo');
	// 0: 离线（offline），1：在线（online），2，繁忙（busy）
    return (
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode className="notTreeLeaf" title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
				let disableCheckbox = false;
				if (((iscRelationInfo&&iscRelationInfo.personId||"")==item.personId)||(item.status==0)||(item.sipType=='DDT')) {
				// if ((item.status==0)||(item.sipType=='DDT')) {
					disableCheckbox = true;
				} else {
					disableCheckbox = false;
				}
        return (<TreeNode
					disableCheckbox={disableCheckbox} 
					key={item.key} 
					name={item.title} 
					title={this.renderTreeLeafTitle(item)} 
					sipNum={item.sipNum}
					sipType={item.sipType} 
					status={item.status||"0"} 
					personId={item.personId||""}
					personLeaf={true} 
					mobile_phone={item.mobile_phone}
					muteStatus={item.muteStatus||"0"}
					callStatus={item.callStatus}
					cmtEventId={item.cmtEventId}
					className={renderTitleClassName(item)} 
				/>)
      })
    )
  }
  render() {
		console.log('tree-render');
    let { treeData, checkedKeys } = this.props
		!treeData&&(treeData=[])
    return (
      <Tree 
				checkedKeys={checkedKeys}
				onCheck={this.onCheck}
        checkable
        showLine={true}
        className="tabsTree"
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}
