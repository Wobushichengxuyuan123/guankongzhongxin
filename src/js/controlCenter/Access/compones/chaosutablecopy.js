import React, { Component } from 'react'
import { Table } from 'antd';
import './style.css'
class Renyuanmenjin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: this.props.tableList,
            timer: null,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.tableList != nextProps.tableList) {
            this.setState({
                tableList: nextProps.tableList
            }, () => {
                this.InitialScroll(this.state.tableList)
            })
        }
    }
    InitialScroll(data) {
        let v = document.getElementsByClassName("ant-table-body")[0];
        if (data.length > 10) {
            let time = setInterval(() => {
                v.scrollTop += 1.2;
                if (Math.ceil(v.scrollTop) >= parseFloat(v.scrollHeight - v.clientHeight)) {
                    v.scrollTop = 0
                    // setTimeout(() => { v.scrollTop = 0 }, 1000)
                }
            }, 100)
            this.setState({
                timer: time
            })
            clearInterval(this.state.timer)
        }
    }
    acc(data) {
        this.props.carcesuCallback(data)
    }
    render() {
        const { timer, tableList } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 40,
                align: 'center',
            },
            {
                title: '道闸',
                dataIndex: 'locationAreaName',
                key: 'locationAreaName',
                width: 120,
                align: 'center',
                className: 'beijing'
            },
            {
                title: '车牌号',
                dataIndex: 'carNo',
                key: 'carNo',
                width: 120,
                align: 'center'
            },
            {
                title: '车辆类型',
                dataIndex: 'carType',
                key: 'carType',
                width: 180,
                align: 'center'

            },
            {
                title: '所属单位',
                dataIndex: 'deptName',
                key: 'deptName',
                width: 120,
                align: 'center'
            },
            {
                title: '驾驶员',
                dataIndex: 'personName',
                key: 'personName',
                width: 80,
                align: 'center'
            },
            {
                title: '速度',
                dataIndex: 'speed',
                key: 'speed',
                width: 80,
                align: 'center',
                render: text => <div style={text > 30 ? { color: 'red' } : null}>{text}</div>
            },
            {
                title: '超速时间',
                dataIndex: 'time',
                key: 'time',
                width: 160,
                align: 'center'
            },
            {
                title: '超速地点',
                dataIndex: 'areaName',
                key: 'areaName',
                width: 100,
                align: 'center'
            },
            {
                title: '联系方式',
                dataIndex: 'mobile_phone',
                key: 'mobile_phone',
                width: 120,
                align: 'center'
            }
        ];
        return (
            <div className='container' >
                <div className='overall'>
                    <div className='table' onMouseEnter={() => {
                        if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                        clearInterval(timer)
                    }} onMouseLeave={() => {
                        if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                        this.InitialScroll(tableList)
                    }} >
                        <Table
                            className='WH'
                            id="cyclicScroll"
                            scroll={{ y: 400 }}
                            dataSource={tableList}
                            columns={columns}
                            pagination={false}
                            rowClassName={(record, index) => index % 2 === 0 ? 'oddNumber' : 'evenNumbers'}
                            onRow={record => {
                                return {
                                    onClick: event => { this.acc(record) }, // 点击行     
                                }
                            }
                            }
                        />
                    </div>
                </div>
            </div >
        )
    }

}
export default Renyuanmenjin


