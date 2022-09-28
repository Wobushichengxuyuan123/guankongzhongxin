import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Table } from 'antd';
import './style.css'

const columns = [
    {
        title: '门禁',
        dataIndex: 'locationAreaName',
        key: 'locationAreaName',
        width: 60,
        align: 'center',
        className: 'beijing'
    },
    {
        title: '人员',
        dataIndex: 'personName',
        key: 'personName',
        width: 120,
        align: 'center'
    },
    {
        title: '所属单位',
        dataIndex: 'deptName',
        key: 'deptName',
        width: 220,
        align: 'center'

    },
    {
        title: '编号',
        dataIndex: 'personCode',
        key: 'personCode',
        width: 120,
        align: 'center'
    },
    {
        title: '职务',
        dataIndex: 'postName',
        key: 'postName',
        width: 120,
        align: 'center'
    },
    {
        title: '进/出',
        dataIndex: 'state',
        key: 'state',
        width: 120,
        align: 'center'
    },
    {
        title: '时间（入/出）',
        dataIndex: 'time',
        key: 'time',
        width: 220,
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

const Index = ({ dataSource,props}) => {
    const [timer, setTimer] = useState(null);  // 定时器
    
    useEffect((props) => {  // 发送数据请求 设置订阅/启动定时器 手动更改 DOM 等 ~
        // 如果有真实数据 请在数据请求后 调用此方法
        InitialScroll(dataSource)
        return () => {
            clearInterval(timer)
        }
    }, [dataSource])  // 检测数组内变量 如果为空 则监控全局
    // 开启定时器
    const InitialScroll = (data) => {
        let v = document.getElementsByClassName("ant-table-body")[0];
        if (data.length > 10) {
            let time = setInterval(() => {
                v.scrollTop += 1.5;
                if (Math.ceil(v.scrollTop) >= parseFloat(v.scrollHeight - v.clientHeight)) {
                    v.scrollTop = 0
                    // setTimeout(() => { v.scrollTop = 0 }, 1000)
                }
            }, 100)
            setTimer(time)  // 定时器保存变量 利于停止
        }
    }
    let acc = (data) => { 
      
        console.log(data);
    }


    return (
        <div className={'container'} >
            <div className={'overall'}>
                <div className={'table'} onMouseEnter={() => {
                    if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                    clearInterval(timer)
                }} onMouseLeave={() => {
                    if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                    InitialScroll(dataSource)
                }} >
                    <Table
                        id="cyclicScroll"
                        scroll={{ y: 400 }}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowClassName={(record, index) => index % 2 === 0 ? 'oddNumber' : 'evenNumbers'}
                        onRow={record => {
                            return {
                                onClick: event => { acc(record) }, // 点击行     
                            }
                        }
                        }
                    />
                </div>
            </div>
        </div >
    )
}

export default Index
