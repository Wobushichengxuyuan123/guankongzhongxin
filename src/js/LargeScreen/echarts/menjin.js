import React from 'react'
import * as echarts from 'echarts';
let that

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        that = this
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getBar()
    }
    selectPersonOutEnterTjOption = (data) => {
        let legendData = ["进", '逗留', '出']
        let x = data.areaList || []
        // let x = data.numList[0] || []
        let y = data.numList || []
        let obj = [],
            colorList = [
                [
                    {
                        offset: 0,
                        color: "#AB33FF",
                    },
                    {
                        offset: 1,
                        color: "#FF2074",
                    },
                ],
                [
                    {
                        offset: 0,
                        color: "#4197A5",
                    },
                    {
                        offset: 1,
                        color: "#67E5F9",
                    },
                ],
                [
                    {
                        offset: 0,
                        color: "#F6CA46",
                    },
                    {
                        offset: 1,
                        color: "#E78A55",
                    },
                ],
            ]
        x.map(item => {
            obj.push(item)
        })

        let series = legendData.map((item, index) => {
            return {
                name: item,

                type: "bar",
                stack: "总量",
                barWidth: "25%",
                itemStyle: {
                    barBorderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, colorList[index]),
                },
                data: y[index],

            }
        })
        return {
            title: {
                text: '人员',
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
                top: "16%",
                containLabel: true,
            },
            legend: {
                data: legendData,
                top: 20,
                right: 20,
                textStyle: {
                    color: "#fff",
                },
                itemWidth: 18,
                itemHeight: 12,
                // itemGap: 35
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
                    rotate: 0,
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
            series: series
        }
    };
    selectPersonOutEnterTj = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/pubStatisics/selectPersonOutEnterTj?type=0",
                {
                    method: 'GET',

                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);

                })
        });
    };
    getBar = async () => {
        let myChart = echarts.init(document.getElementById('selectPersonOutEnterTj'));
        let res = await this.selectPersonOutEnterTj();
        window.addEventListener('resize', function () {
            myChart.resize()
        })
        if (res) {
            myChart.setOption(this.selectPersonOutEnterTjOption(res));
            myChart.resize()
            myChart.off('click');
            myChart.on('click', function (params) {
                if (params.type == 'click') {
                    let locationAreaId = params.data.id;
                    let seriesName = params.seriesName
                    if (seriesName == '逗留') {
                        that.props.onDaozha(locationAreaId, seriesName, 2, 0, '')
                    } else if (seriesName == '进') {
                        that.props.onDaozha(locationAreaId, seriesName, 1, 0, 'all')
                    } else if (seriesName == ('出')) {
                        that.props.onDaozha(locationAreaId, seriesName, 1, 0, 'all')
                    }
                }
            })
        }
    }
    render() {
        return (
            <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="selectPersonOutEnterTj"></div>
        )
    }
}
export default Video
