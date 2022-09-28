import React from 'react'
import * as echarts from 'echarts';
let that
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        that= this
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getpaimingfenxi()
    }
    paimingfenxioption = (data) => {
        let legendData = ['预警数量']
        let x = data.xData || []
        let y = data.seriesData || []
        return {
            title: {
                text: '智能预警',
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
                bottom: "1%",
                top: "18%",
                containLabel: true,
            },
            legend: {

                data: legendData,
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
                data: x,
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
                    rotate: 35,
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
            series: [{
                realtimeSort: true,
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                name: '预警数量',
                type: "bar",
                barGap: 0,
                barWidth: "50%",
                itemStyle: {
                    barBorderRadius: [5, 5, 0, 0],
                    color: function (params) {
                        //数组定义的一种颜色
                        var colorList = [
                            ['#004c68', '#05a1d2', '#004c68']
                        ];
                        // var index = params.dataIndex;
                        // if (params.dataIndex >= colorList.length) {
                        //     index = params.dataIndex % colorList.length;
                        // }

                        return new echarts.graphic.LinearGradient(1, 0, 0, 0,
                            [{
                                offset: 0,
                                color: colorList[0][0]
                            },
                            {
                                offset: 0.5,
                                color: colorList[0][1]
                            },
                            {
                                offset: 1,
                                color: colorList[0][2]
                            }
                            ]);
                    },
                },
                data: y,
            }]
        }
    };
    paimingfenxi = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/analysis/selectAlarmPMCount",
                {
                    method: 'GET'
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                })
        });
    };
    getpaimingfenxi = async () => {
        let chartspaiming = echarts.init(document.getElementById('paimingfenxi'))
        let res = await this.paimingfenxi();
        window.addEventListener('resize', function () {
            chartspaiming.resize()
        })
        if (res) {
            chartspaiming.setOption(this.paimingfenxioption(res));
            chartspaiming.resize()
        }
        chartspaiming.off('click');
        chartspaiming.on('click', function (params) {
            if (params.type == 'click') {
                let alarmComfrom = params.data.code;
                that.props.isyujing(alarmComfrom)
                // setalarminformation(alarmComfrom);
                // getAlarmCountPM(alarmComfrom);
                // setishiddenDanger(false);
                // setiswaring(false);
                // setisalarm(false);
                // setisranking(true)
            }
        })
    }
    render() {
        return (
            <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="paimingfenxi"></div>
        )
    }
}
export default Video
