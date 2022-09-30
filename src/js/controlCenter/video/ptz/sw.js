/* eslint-disable */
import React from 'react'
import { Row, Col, Form, Checkbox, Select, Input, message } from 'antd';
import '../css/sw.scss'
const FormItem = Form.Item;
class Addsw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSw: true,
            yuzhiwei: 1,
            time: 5,
            check: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ShowList) {
            if (nextProps.ShowList[0].dataJson != null) {
                let data = JSON.parse(nextProps.ShowList[0].dataJson)
                if (data.sw == true) {
                    setTimeout(() => {
                        this.props.parent.showwang(data.yuzhiwei)
                    }, data.time * 1000);
                }
                this.setState({
                    yuzhiwei: data.yuzhiwei,
                    time: data.time,
                    check: data.sw
                })


            }
        }
    }
    handleSubmit() {
    }
    isCheckbox(e) {
        let yuzhiwei = this.props.form.getFieldValue('yuzhiwei');
        let time = this.props.form.getFieldValue('time');
        let sw = e.target.checked
        let swlist = {
            yuzhiwei: yuzhiwei,
            time: time,
            sw: sw
        }
        if (sw == true) {
            this.props.parent.shouwanglist(swlist)
        }
        this.setState({
            isSw: !sw,
            check: sw
        }, () => {
            if (this.state.isSw == false) {
                if (!time) {
                    message.warning('请填写守望时间')
                    return false
                }
                setTimeout(() => {
                    this.props.parent.showwang(yuzhiwei)
                }, time * 1000);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { yuzhiwei, time, check } = this.state
        const formItemLayout = { labelCol: { span: 18 }, wrapperCol: { span: 24 } };
        return (
            <div className="sw">
                <div className='swcheck'>
                    <Checkbox checked={check} onChange={this.isCheckbox.bind(this)} className="search_ipt01 searchInput" />
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label='守望预置位 ' colon={false}>
                                    {getFieldDecorator('yuzhiwei', { initialValue: yuzhiwei })(
                                        <Select placeholder="预置位"  >
                                            {this.props.yuzhiList.map((item, index) => {
                                                return (
                                                    <Select.Option key={item.id} value={index + 1}>
                                                        {index + 1}-{item.presetName}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={10}>
                                <FormItem {...formItemLayout} label='回归时间 ' colon={false} >
                                    {getFieldDecorator('time', {
                                        initialValue: time
                                    })(
                                        <Input className="huigui" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>)
    }
}

export default Addsw = (Addsw);
/* eslint-enable */
