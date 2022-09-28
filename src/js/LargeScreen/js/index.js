/* eslint-disable */
import React from 'react';
import Top from '../conmponet/top'
import Header from '../conmponet/header';
import '../css/index.scss'

class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isgcjj: false
        }
    }
    componentDidMount() {
        this.getname()
        window.Gisinit.TimelineContainer()
    }
    //获取当前用户
    getname() {
        fetch(window.SYSTEM_CONFIG_APPLICATIONAPI + "/api/userInfo/getUserName?requestname=2")
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    this.childbottom.getvideo(b.data.loginName)
                    this.getsecurityTime(b.data.projectId)
                }
            })
    }
    getsecurityTime = (id) => {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubProject/detail?id=" + id)
            .then(r => r.json())
            .then(res => {
                if (res.data !== null) {
                    let startTime = res.data.securityTime; //开始时间
                    let currentTime = Date.parse(new Date()); //当前时间
                    let sec = currentTime - startTime;
                    let day = sec / (24 * 60 * 60 * 1000);
                    this.setState({
                        projectName: res.data.projectName,
                        projectSummary: res.data.projectSummary,
                        introduceImg: res.data.introduceImg,
                        time: parseInt(day)
                    })
                } else {
                    this.setState({
                        time: parseInt('0')
                    })
                }
            })
    }
    openimg() {
        this.setState({
            isgcjj: true
        })
    }
    chose() {
        this.setState({
            isgcjj: false
        })
    }
    render() {
        const { projectName, introduceImg, isgcjj, projectSummary, time } = this.state
        return (
            <div className='daping'>
                <Top projectName={projectName} time={time} onRef={ref => this.childtop = ref} />
                <Header parten={this} introduceImg={introduceImg} onRef={ref => this.childbottom = ref} />
                {isgcjj == true ? <div className='gcjj' >
                    <div className="chose" onClick={this.chose.bind(this)}></div>
                    <div className='conbutton' dangerouslySetInnerHTML={{ __html: projectSummary }} ></div>
                </div> : null}

            </div>
        )
    }
}


export default (AlarmAlter);
/* eslint-enable */