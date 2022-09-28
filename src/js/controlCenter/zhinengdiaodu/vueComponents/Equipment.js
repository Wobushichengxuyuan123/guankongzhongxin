import React, { Component } from 'react'
import CommonTab from '../CommonTab'
import CommonTable from '../CommonTable'
export default class Equipment extends Component {
  constructor(props) {
    super(props)
    this.commonTab = React.createRef()
    this.state = {
      currentTab: 0,
      columnList1: [
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
          title: '名称',
          width: 120,
          dataIndex: 'materialName',
          key: 'materialName',
          align: 'center',
          ellipsis: true,
        },
        {
          title: '规格',
          width: 80,
          dataIndex: 'specs',
          key: 'specs',
          align: 'center',
          ellipsis: true,
        },
        {
          title: '所属物资仓库',
          // width: 800,
          dataIndex: 'emergencyStoreName',
          key: 'emergencyStoreName',
          align: 'center',
          ellipsis: true,
        }
      ],
      columnList2: [
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
          title: '名称',
          width: 120,
          dataIndex: 'emergencyEquipName',
          key: 'emergencyEquipName',
          align: 'center',
          ellipsis: true,
        },
        {
          title: '规格',
          width: 80,
          dataIndex: 'specs',
          key: 'specs',
          align: 'center',
          ellipsis: true,
        },
        {
          title: '所属物资仓库',
          width: 800,
          dataIndex: 'emergencyStoreName',
          key: 'emergencyStoreName',
          align: 'center',
          ellipsis: true,
        }
      ],
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
          }
        ],
        tableTitle: '应急物资设备清单',
        tablePagination: false
      },
      tabPaneList: [
        {
          tab: '应急物资',
          key: '1-1',
          childrenProp: ''
        },
        {
          tab: '应急装备',
          key: '1-2',
          childrenProp: ''
        }
      ]
    }
  }
  // 物资
  getAndUpdateTableData = (parameter) => {
    let {
      planId=""
    } = this.props;
    let currentTab = '';
    let { 
      eventLevel = 1,
    } = parameter;
    let url;
      switch (eventLevel) {
        case 1:
          url = '/zhdd-zhdd/yjzhYjjyEmergencyPlanRelaEmergencyMaterial/getPlanRelaEquipmentList'
          currentTab = 1
          break;
        case 2:
          url = '/zhdd-zhdd/yjzhYjjyEmergencyPlanRelaEquipment/getPlanRelaEquipmentList'
          currentTab = 2
          break;
        default:
          break;
      }
    let data = {
      pageIndex: 0,
      pageSize: 0,
      planId
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify(data)
    }).then(result => result.json())
    .then((res) => {
      res = res.resultValue.items.map(item =>{
        item.key = item.keyId
        return item
      })
      this.setState((state,props) => {
        return {
          dataInfo: Object.assign(state.dataInfo,{dataSource: res}),
          currentTab
        }
      })
    },(error) => {})
  }
  componentDidMount() {
    this.getAndUpdateTableData({})
  }
  componentWillUnmount() {
    console.log('unmount');
  }
  render() {
    let {
      dataInfo,
      tabPaneList,
      currentTab,
      columnList1,
      columnList2
    } = this.state;
    if (currentTab == 1) {
      dataInfo.columnList = columnList1
    } else {
      dataInfo.columnList = columnList2
    }
    let lastTabPaneList = tabPaneList.map(item => {
      item.childrenProp = <CommonTable dataInfo={dataInfo}></CommonTable>
      return item
    })
    return (
      <CommonTab ref={this.commonTab} updateTableData={this.getAndUpdateTableData} tabPaneList={lastTabPaneList} ></CommonTab>
    )
  }
}
