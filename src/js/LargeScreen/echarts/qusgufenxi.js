import React from 'react'
import * as echarts from 'echarts';
import { Tabs } from 'antd';
const { TabPane } = Tabs
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            istype: "3"
        }
    }
    componentDidMount() {
        this.props.onRef(this)
        this.qusifenxi()
    }
    qusifenxioption = (data) => {
        return {
            title: {
                text: '趋势分析',
                left: 'center',
                textStyle: {
                    color: "white",
                    fontStyle: 'normal',
                    fontSize: 16
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            grid: {
                left: "2%",
                right: "4%",
                bottom: "2%",
                top: "22%",
                containLabel: true,
            },
            legend: {
                type: 'scroll',
                data: data.legend,
                x: 'center',
                top: 18,
                right: 5,
                textStyle: {
                    color: "#fff",
                },
                itemWidth: 18,
                itemHeight: 12,
                itemGap: 5
            },
            xAxis: {
                type: "category",
                data: data.xData,
                // left:20,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: "green",
                        width: 2,
                    },
                },
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    textStyle: {
                        fontFamily: "Microsoft YaHei",
                        color: "white",
                    },
                },
            },
            yAxis: {
                type: "value",
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "green",
                        width: 2,
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "green",
                    },
                },
                axisLabel: {
                    formatter: function () {
                        return "";
                    }
                }
            },
            series: data.series
        }
    };
    trendAnalysis = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/analysis/selectQSCount",
                {
                    method: 'post',
                    body: JSON.stringify({ type: this.state.istype }),
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                })
        });
    };
    qusifenxi = async () => {
        let chartsqusi = echarts.init(document.getElementById('trendAnalysis'))
        let res = await this.trendAnalysis();
        if (res) {
            chartsqusi.setOption(this.qusifenxioption(res));
            chartsqusi.resize()
        }
        window.addEventListener('resize', () => { chartsqusi.resize() })
    }
    callback = (type) => {
        this.setState({
            istype: type
        }, () => {
            this.qusifenxi()
        })
    }
    render() {
        const { istype } = this.state
        return (
            <>
                <div className='yearmonth'>
                    <Tabs onChange={this.callback}
                        defaultActiveKey={istype}
                        activeKey={istype}
                        type="line"
                        size='small'>
                        <TabPane tab="年" key="4"></TabPane>
                        <TabPane tab="月" key="3"></TabPane>
                        <TabPane tab="周" key="2"></TabPane>
                        <TabPane tab="日" key="1"></TabPane>
                    </Tabs>
                </div>
                <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="trendAnalysis"></div>
            </>
        )
    }
}
export default Video
