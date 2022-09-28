/* eslint-disable */
import React from 'react';
class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
        this.timer = null
    }
    componentDidMount() {
        // this.props.onRef(this)
        this.timer = setInterval(() => {
            this.updateTime()
        }, 100);
    }
    updateTime() {
        this.setState({
            time: new Date()
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    render() {
        return (
            <div className='top'>
                <div className='top-LF'>
                    <div className='top-LF-L'></div>
                    <div className='top-LF-R'>
                        <div className='top-LF-R-center'>{this.props.projectName}</div>
                    </div>
                </div>
                <div className='top-C'>
                    <strong style={{ color: '#fff', fontSize: '38px' }}>安全智能管控中心</strong>
                </div>
                <div className='top-R'>
                    <div className='top_RG_L'>
                        <div className='top_RG_L_L'>
                            <span>安全生</span>
                            <span>产天数</span>
                        </div>
                        <div className='top_RG_L_C'>{this.props.time || 0}</div>
                        <div className='top_RG_L_R'>天</div>
                    </div>
                    <div className='top-RG-R'>
                        <div> {this.state.time.toLocaleDateString().replace(/\//g, '-')}</div>
                        <div>  {this.state.time.toLocaleTimeString()}</div>

                        {/* <h3></h3> */}
                    </div>
                </div>
            </div>


        )
    }
}


export default (AlarmAlter);
/* eslint-enable */