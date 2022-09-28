import React, { Component } from 'react'
import CommonTab from '../CommonTab'
import CommonTable from '../CommonTable'
export default class RankTab extends Component {
  constructor(props) {
    super(props)
    this.commonTab = React.createRef()
    this.state = {
      dataInfo: {
        dataSource: [],
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
            title: '处置指挥主体',
            width: 120,
            dataIndex: 'commandOrgName',
            key: 'commandOrgName',
            align: 'center',
            ellipsis: true,
          },
          {
            title: '分级',
            width: 80,
            dataIndex: 'eventLevel',
            key: 'eventLevel',
            align: 'center',
            ellipsis: true,
          },
          {
            title: '分级标准',
            width: 800,
            dataIndex: 'eventLevelStandard',
            key: 'eventLevelStandard',
            align: 'center',
            ellipsis: true,
            // textWrap: 'word-break',
          }
        ],
        tableTitle: '事件分级',
        tablePagination: false
      },
      tabPaneList: [
        {
          tab: '一级',
          key: '1-1',
          childrenProp: ''
        },
        {
          tab: '二级',
          key: '1-2',
          childrenProp: ''
        },
        {
          tab: '三级',
          key: '1-3',
          childrenProp: ''
        },
        {
          tab: '四级',
          key: '1-4',
          childrenProp: ''
        },
      ]
    }
  }
  // ~------------------------------------methods--------------------------------------------
  // #region methods
  getAndUpdateTableData = (parameter) => {
    let {
      planId=""
    } = this.props;
    let url = '/zhdd-zhdd/yjzhYjjyEmergencyPlanEventLevel/getEmergencyPlanEventLevelListByPlanIdAndEventLevel'
    let {
      eventLevel='一级',
    } = parameter;
    if (!Number.isNaN(eventLevel)) {
      switch (eventLevel) {
        case 1:
          eventLevel = '一级'
          break;
        case 2:
          eventLevel = '二级'
          break;
        case 3:
          eventLevel = '三级'
          break;
        case 4:
          eventLevel = '四级'
          break;
        default:
          break;
      }
    }
    let data = `eventLevel=${eventLevel}&planId=${planId}`;
    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data
    }).then(result => result.json())
    .then((res) => {
      res = res.map(item =>{
        item.key = item.keyId
        return item
      })
      this.setState((state,props) => {
        return {
          dataInfo:Object.assign(state.dataInfo,{dataSource: res})
        }
      })
      console.log(res,'事件等级');
    },(error) => {})
  }
  // #endregion
  componentDidMount() {
    this.getAndUpdateTableData({})
  }
  render() {
    let {
      dataInfo,
      tabPaneList
    } = this.state;
    let lastTabPaneList = tabPaneList.map(item => {
      item.childrenProp = <CommonTable dataInfo={dataInfo}></CommonTable>
      return item
    })
    return (
      <CommonTab ref={this.commonTab} updateTableData={this.getAndUpdateTableData} tabPaneList={lastTabPaneList} ></CommonTab>
    )
  }
}
