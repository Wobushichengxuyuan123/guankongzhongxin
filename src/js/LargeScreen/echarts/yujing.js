import React from 'react'
import * as echarts from 'echarts';
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getyujing()
    }
    yujingoption = (data) => {
        return {
            title: {
                text: '应急预案',
                left: 'center',
                textStyle: {
                    color: "white",
                    fontStyle: 'normal',
                    fontSize: 16
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: function (param) {
                    return param.name + "<br>" +
                        param.marker + " " + param.seriesName + " ：" + param.value
                },
                "textStyle": {
                    "fontSize": 16
                }
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                top: 20,
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 5,
                formatter: '{name}',
                textStyle: {
                    fontSize: 12,
                    color: '#FFFFFF'
                },
                data: data.xData,
            },
            calculable: true,
            series: [
                {
                    name: '数量',
                    type: 'pie',
                    radius: '70%',//饼图的半径大小  
                    center: ['60%', '60%'],//饼图的位置 
                    label: {            //饼图图形上的文本标签
                        normal: {
                            show: true,
                            position: 'inner', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 12
                            },
                            formatter: '{d}%'
                        }
                    },
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    };
    yujing = () => {
        return new Promise((resolve) => {
            fetch("/nelda-smcc/public/analysis/selectYJYACount",
                {
                    method: 'GET'
                })
                .then(r => r.json())
                .then(res => {
                    resolve(res.data);
                })
        });
    };
    getyujing = async () => {
        let chartstree = echarts.init(document.getElementById('yujing'))
        let res = await this.yujing();
        window.addEventListener('resize', function () {
            chartstree.resize()
        })
        if (res) {
            chartstree.setOption(this.yujingoption(res));
            chartstree.resize()
        }
    }
    render() {
        return (
            <div style={{ height: '100%', border: '1px solid #5CA0B7' }} id="yujing"></div>
        )
    }
}
export default Video
