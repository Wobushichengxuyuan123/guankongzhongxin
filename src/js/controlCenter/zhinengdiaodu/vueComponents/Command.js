import React, { Component } from 'react'
import _ from 'lodash'
import CommonTable from '../CommonTable'

export default class Command extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataInfo: {
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
            title: '序号',
            width: 60,
            key: 'serial',
            dataIndex: 'serial',
            align: 'center',
            render: (text,record,index) => (
              <span>
                {index + 1}
              </span>
            )
          },
          {
            title: '机构名称',
            width: 120,
            dataIndex: 'orgName',
            key: 'orgName',
            align: 'center',
            ellipsis: true,
          },
          {
            title: '响应级别',
            width: 80,
            dataIndex: 'eventLevel',
            key: 'eventLevel',
            align: 'center',
            ellipsis: true,
          },
          {
            title: '职责描述',
            width: 200,
            dataIndex: 'teamDuty',
            key: 'teamDuty',
            align: 'center',
            ellipsis: true,
          },
          {
            title: '排序',
            // width: 800,
            dataIndex: 'orderNum',
            key: 'orderNum',
            align: 'center',
            ellipsis: true,
          }
        ],
        tableTitle: '应急指挥机构及职责',
        tablePagination: false
      }
    }
  }
  getAndUpdateTableData = (parameter) => {
    let url = '/zhdd-zhdd/yjzhYjjyEmergencyTeamDuty/getEmergencyTeamDutyList'
    let data = {
      pageIndex: 0,
      pageSize: 0
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify(data)
    }).then(result => result.json())
    .then((res) => {
      res = res.resultValue.items.map(item =>{
        item.key = item.teamPersonId
        return item
      })
      this.setState((state,props) => {
        return {
          dataInfo:Object.assign(state.dataInfo,{dataSource: res})
        }
      })
      console.log(res,'应急指挥机构及职责');
    },(error) => {})
  }
  componentDidMount() {
    this.getAndUpdateTableData({})
  }
  render() {
    let {
      dataInfo,
    } = this.state;
    return (
      <CommonTable dataInfo={dataInfo}></CommonTable>
    )
  }
}