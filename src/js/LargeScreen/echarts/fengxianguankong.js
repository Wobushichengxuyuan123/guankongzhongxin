import React from 'react'
import * as echarts from 'echarts';
let that
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        that = this
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getfengxianguankong()
    }
    fengxianguankongoption = (data) => {
        return {
            title: {
                text: '风险管控',
                left: 'center',
                textStyle: {
                    color: "white",
                    fontStyle: 'normal',
                    fontSize: 16
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'tong ji'        // 默认为直线，可选为：'line' | 'shadow'
                },

            },
            grid: {
                left: "2%",
                right: "4%",
                bottom: "-6",
                top: "22%",
                containLabel: true,
            },
            legend: {
                type: 'scroll',
                top: 20,
                // right: 5,
                x: 'center',
                y: 'bottom',
                textStyle: {
                    fontSize: 12,
                    color: "#fff",
                },
                itemWidth: 18,
                itemHeight: 12,
                itemGap: 5,
                data: data.legend
            },
            xAxis: {
                type: "category",
                data: data.xData,
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
                axisLabel: { show: true },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "green",
                    },
                },
            },
            series: data.series
        }
    };
    fengxianguankong = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/analysis/selectAlarmFXTJ",
                {
                    method: 'GET'
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                })
        });
    }
    getfengxianguankong = async () => {
        let fengxian = echarts.init(document.getElementById('fengxianguankong'))
        let res = await this.fengxianguankong();
        window.addEventListener('resize', () => { fengxian.resize() })
        if (res) {
            fengxian.setOption(this.fengxianguankongoption(res));
            fengxian.resize()
        }
     
        fengxian.off('click');
        fengxian.on('click', function (params) {
            let data = params.data.name;
            that.props.parent.isfengxian(data)
        })
    }
    render() {
        return (
            <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="fengxianguankong"></div>
        )
    }
}
export default Video
