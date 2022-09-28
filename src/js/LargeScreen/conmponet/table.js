/* eslint-disable */
import React from 'react';
import { Table } from 'antd';
let that

class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            personList: [],
            isactive: 1,
            isalert: false

        }
        that = this

    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {

    }
    onChange1(a, b, c, d, e) {
        if (!e || e == '' || e == undefined) { e = '' }
        this.setState({
            locationAreaId: a,
            name: b,
            type: d,
            isAll: e,
            isactive: c,
            isalert: false
        }, () => {
            this.getPersonTalbe()
        })
    }
    //人员列表渲染
    getPersonTalbe = async () => {
        let res = await this.getPersonList();
        if (res) {
            this.setState({
                personList: res.list || [],
                pageNo: 1,
                pageSize: 10,
                totalCount: res.totalCount || 0
            })
        }
    }
    //获取人员列表数据
    getPersonList = () => {
        const { locationAreaId, type, isAll } = this.state
        return new Promise((resolve, reject) => {
            fetch("/nelda-smcc/public/pubStatisics/selectPersonInfoByArea",
                {
                    method: 'POST',
                    body: JSON.stringify({ pageNo: this.state.pageNo, pageSize: 20, type, isAll, locationAreaId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err)
                })
        });
    };
    chose() {
        this.props.parent.chose()
    }
    presonPaginHandler = pagination => {
        this.setState({
            pageNo: pagination.current
        }, () => {
            this.getPersonTalbe()
        })
    }
    menjinjinchu(a, b, c) {
        this.setState({
            locationAreaId: '',
            isactive: a,
            type: b,
            isAll: c,
            pageNo: 1
        }, () => {
            this.getPersonTalbe()
        })
    }
    selectRow(row) {
        this.setState({
            isalertList: row,
            isalert: true,
        })
    }
    choseisalert() {
        this.setState({
            isalert: false,
        })
    }
    render() {
        const { personList, totalCount, isactive, isalert, type, isalertList } = this.state
        const presonColumns = [
            {
                title: '道闸',
                dataIndex: 'areaName',
                key: 'areaName',
                align: 'center',
                ellipsis: true
            },
            {
                title: '车辆',
                dataIndex: 'personName',
                key: 'personName',
                align: 'center',
                ellipsis: true
            },
            {
                title: '所属单位',
                dataIndex: 'deptName',
                key: 'deptName',
                align: 'center',
                ellipsis: true
            },
            // {
            //     title: '职务',
            //     dataIndex: 'postName',
            //     key: 'postName',
            //     align: 'center',

            //     ellipsis: true
            // },
            {
                title: '进/出',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                ellipsis: true
            },
            {
                title: '时间(入/出)',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
                width: 130,
                ellipsis: true
            },
            {
                title: '联系方式',
                dataIndex: 'mobile_phone',
                key: 'mobilePhone',
                align: 'center',
            },
        ]
        const presonColumns1 = [
            {
                title: '门禁',
                dataIndex: 'areaName',
                key: 'areaName',
                align: 'center',
                ellipsis: true
            },
            {
                title: '人员',
                dataIndex: 'personName',
                key: 'personName',
                align: 'center',
                ellipsis: true
            },
            {
                title: '所属单位',
                dataIndex: 'deptName',
                key: 'deptName',
                align: 'center',
                ellipsis: true
            },
            {
                title: '职务',
                dataIndex: 'postName',
                key: 'postName',
                align: 'center',

                ellipsis: true
            },
            {
                title: '进/出',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                ellipsis: true
            },
            {
                title: '时间(入/出)',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
                width: 130,
                ellipsis: true
            },
            {
                title: '联系方式',
                dataIndex: 'mobile_phone',
                key: 'mobilePhone',
                align: 'center',
            },
        ]
        return (
            <div className="isflveDP" style={{ border: '1px solid #5CA0B7', zIndex: "1000000" }} id='fangda_five'>
                <div className='closeclick'>
                    <div className="closeone" onClick={this.chose.bind(this)}></div>
                </div>
                <Table dataSource={personList} columns={type == '1' ? presonColumns : presonColumns1} className='tableStyle'
                    rowClassName={(record, index) => {
                        let temp = ''
                        if (index % 2 == 0) temp = 'tableTh2';
                        return 'tableTh ' + temp
                    }}
                    scroll={{ y: '45vh' }}
                    pagination={{ total: totalCount, pageSize: 20 }}
                    onChange={this.presonPaginHandler}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                />
                <div className='f_tree_one' >
                    <div style={{ width: '20px', height: "20px" }} className={isactive == 1 ? 'mjjcactive' : 'mjjc'} onClick={this.menjinjinchu.bind(this, 1, 0, 'all')}></div>
                    <div style={{ width: '20px', height: "20px" }} className={isactive == 2 ? 'mjdlactive' : 'mjdl'} onClick={this.menjinjinchu.bind(this, 2, 0, '')}></div>
                    <div style={{ width: '25px', height: "21px" }} className={isactive == 3 ? 'dzjcactive' : 'dzjc'} onClick={this.menjinjinchu.bind(this, 3, 1, 'all')}></div>
                    <div style={{ width: '25px', height: "21px" }} className={isactive == 4 ? 'dzdlactive' : 'dzdl'} onClick={this.menjinjinchu.bind(this, 4, 1, '')}></div>
                </div>
                {isalert ? <div className="isalertflot">
                    <div className='chose1' onClick={this.choseisalert.bind(this)}></div>
                    {type == 0 ?
                        <div className="ryalert">
                            <div className='Rx'>
                                <div className="alertname">单位: </div>
                                <div className='alerttext'>{isalertList.deptName}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">姓名: </div>
                                <div className='alerttext'>{isalertList.personName}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">职务: </div>
                                <div className='alerttext'>{isalertList.postName}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">编号: </div>
                                <div className='alerttext'>{isalertList.personCode}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">时间: </div>
                                <div className='alerttext'>{isalertList.time}</div>
                            </div>
                        </div>
                        : <div className="ryalert">
                            <div className='Rx'>
                                <div className="alertname">单位: </div>
                                <div className='alerttext'>{isalertList.deptName}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">车牌号: </div>
                                <div className='alerttext'>{isalertList.personName}</div>
                            </div>
                            <div className='Rx'>
                                <div className="alertname">时间: </div>
                                <div className='alerttext'>{isalertList.time}</div>
                            </div>
                        </div>}
                    <div className="alertimg">
                        <img className='imgName' src={isalertList.pic} />
                    </div>

                </div> : null}
            </div>
        )
    }
}


export default (AlarmAlter);
/* eslint-enable */