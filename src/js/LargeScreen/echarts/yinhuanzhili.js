import React from 'react'
import * as echarts from 'echarts';
let that
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        that=this

    }
    componentDidMount() {
        this.props.onRef(this)
        this.getyinhuanzhili()
    }
    yinhuanzhiliOption = (data) => {
        let x = data.xData || []
        let y = data.data || []
        let legendData = ['已处理', '未处理']
        var colorList = [
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
        let series = legendData.map((item, index) => {
            return {
                name: item,
                type: "bar",
                barGap: 0,
                barWidth: "20%",
                itemStyle: {
                    barBorderRadius: [20, 20, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, colorList[index]),
                },
                data: y[index],
            }
        })
        return {
            title: {
                text: '隐患治理',
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
                    rotate: 20,
                    textStyle: {
                        fontFamily: "Microsoft YaHei",
                        color: "white",
                    },
                    clickable: true,//并给图表添加单击事件  根据返回值判断点击的是哪里
                    interval: 0,
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
    yinhuanzhili = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/analysis/selectYHCount",
                {
                    method: 'GET'
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                })
        });
    };
    getyinhuanzhili = async () => {
        let chartsyinhuan = echarts.init(document.getElementById('yinhuanzhili'))
        let res = await this.yinhuanzhili();
        if (res) {
            chartsyinhuan.setOption(this.yinhuanzhiliOption(res));
            chartsyinhuan.resize()
        }
        chartsyinhuan.off('click');
        chartsyinhuan.on('click', function () {
            that.props.onyh()
        })
        window.addEventListener('resize', () => { chartsyinhuan.resize() })
    }
    render() {
        return (
            <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="yinhuanzhili" ></div>
        )
    }
}
export default Video
