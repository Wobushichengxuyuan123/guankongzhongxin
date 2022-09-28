import React from "react";
import PropTypes from 'prop-types'
import { Table, Tag, Space } from "antd";

class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="select-list-box">
        <p className="select-title">选中列表</p>
        <div className="select-list">
          <Table 
          pagination={false}
          scroll={{ y: 406 }}
          columns={ this.props.columns } dataSource={ this.props.dataSource } />
        </div>
      </div>
    );
  }
}
SelectList.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array
}
export default SelectList;