import React, { Component } from 'react'
import _ from 'lodash';
import { Table, Divider, Tag } from 'antd';

const { Column } = Table;
export default class CommonTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        {
          key: '1',
          Age: 32,
          Address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          Age: 42,
          Address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          Age: 32,
          Address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ],
      columnList: [
        {
          key: '序号',
          align: 'center',
          width: 60,
          render: (text,record,index) => (
            <span>
              {index + 1}
            </span>
          )
        },
        {
          key: 'Age',
          align: 'center'
        },
        {
          key: 'Address',
          align: 'left'
        }
      ],
      tableTitle: '表格标题',
      tablePagination: false
    }
  }
  render() {
    let dataSource,columnList,tableTitle,tablePagination;
    const {
      dataInfo
    } = this.props;
    if (dataInfo) {
      dataSource = dataInfo.dataSource
      columnList = dataInfo.columnList
      tableTitle = dataInfo.tableTitle
      tablePagination = dataInfo.tablePagination
    } else {
      dataSource = [];
      columnList = [];
      tableTitle= "";
      tablePagination = false
    }
    return (
      <React.Fragment>
        <p className="table-title">{tableTitle}</p>
        <Table 
        className="CommonTable" 
        dataSource={dataSource}
        pagination={tablePagination}
        scroll={{ y: 260 }}
        bordered
        >
          {
            columnList.map(item => {
              return (
                <Column 
                align={item.align}
                title={item.title}
                dataIndex={item.dataIndex} 
                key={item.key}
                render={item.render || null}
                />
              )
            })
          }
        </Table>
      </React.Fragment>
    )
  }
}
