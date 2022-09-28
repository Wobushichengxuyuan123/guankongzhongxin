import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { 
  renderTreeLeafSipSvg,
  renderTitleClassName,
  renderTitleTxtStatus,
  renderTreeLeafMuteSvg
} from '../../../utils/renderTitleAndStatus'
import { handleOperate } from "../../../redux/redux_utils";

class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: "1",
          name: "周请水",
          status: "0",
          sipType: "S6010",
        },
        {
          key: "2",
          name: "李振学",
          status: "0",
          sipType: "S7010",
        },
        {
          key: "3",
          name: "王路德",
          status: "0",
          sipType: "S8010",
        },
        {
          key: "4",
          name: "张国良",
          status: "0",
          sipType: "S6010",
        }
      ],
      columns: [
        {
          width: 107, //+43
          align: "center",
          title: "姓名",
          key: "name",
          className: "leafTitle",
          render: (text, record) => (
            <span>
              {text.name}
            </span>
          ),
        },
        {
          width: 107, //+43
          align: "center",
          title: "状态",
          key: "status",
          className: "leafTitle",
          render: (text, record) => (
            <span>
              {renderTitleTxtStatus(text.status)}
            </span>
          ),
        },
        {
          width: 108, //+42
          align: "center",
          title: "类型",
          key: "sipTypeTxt",
          className: "sipSvg",
          render: (text, record) => (
            <span>
              {renderTreeLeafSipSvg(text.sipType)}
            </span>
          ),
        },
        // {
        //   width: 64,
        //   align: "center",
        //   title: "禁言",
        //   key: "mute",
        //   className:"muteSvg",
        //   render: (text, record) => (
        //     <span>
        //       <a>{renderTreeLeafMuteSvg(text.muteStatus)}</a>
        //     </span>
        //   ),
        // },
        // {
        //   width: 64,
        //   align: "center",
        //   title: "请出",
        //   key: "operate",
        //   render: (text, record) => (
        //     <span onClick={this.operate.bind(this,text)}>
        //       <a>X</a>
        //     </span>
        //   ),
        // },
      ],
    };
  }
  operate = (config) => {
    let { treeCheckedNodes=[],redux_midTableData} = this.props;
    if (treeCheckedNodes.length!==0||redux_midTableData.length==0) {
      return true
    }
    handleOperate({
      triggerType: 'operate',
      data: config
    })
  }
  render() {
    let { columns } = this.state;
    let { treeCheckedNodes,redux_midTableData,treeTableDataSource=[] } = this.props;
    /* 
      当选中tree时，必定显示tree数据
      当没有选中，且middle有数据时，显示middle数据
    */
    let lastDataSource = []
    if (treeCheckedNodes.length == 0) {
      lastDataSource = redux_midTableData
    } else {
      lastDataSource = treeTableDataSource
    }
    let scrollY = (window.document.documentElement.clientHeight - 485);
    if (!this.props.suddenEventInfo) {
      /* 
        @scrollY: 顶部的高度64 + table标题的高度60 + 底部预留18
      */
      scrollY = (window.document.documentElement.clientHeight - (64 + 60 + 18));
    }
    return (
      <Table
        rowClassName={(record, index) => (renderTitleClassName(record))}
        scroll={{ y: scrollY }}
        pagination={false}
        className="react-dispatch-right-table"
        columns={columns}
        dataSource={lastDataSource}
      />
    );
  }
}
export default connect(
  state => ({
    redux_midTableData: state.dispatchReducer.middleTableDataSource,
  }),
  null
)(table)