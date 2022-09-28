/* eslint-disable */
import React from 'react'
import { Input, Form, Select, Table, Row, Button, Col } from 'antd';
import '../css/lx.scss'


const FormItem = Form.Item;
var that;
class AddYt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataJson: [],
            count: 1,//总数
            presetName: ''
        };
        that = this
    }
    componentDidMount() {
        if (this.props.lunxunList) {
            if (this.props.lunxunList.dataJson != '') {
                this.setState({
                    dataJson: JSON.parse(this.props.lunxunList.dataJson),
                    presetName: this.props.lunxunList.presetName,
                }, () => {
                    this.props.form.setFieldsValue({
                        presetName: this.props.lunxunList.presetName,
                        dataJson: JSON.parse(this.props.lunxunList.dataJson)
                    });
                })
            } else {
                this.props.form.setFieldsValue({
                    presetName: this.props.lunxunList.presetName,
                });
            }
        }
    }
    handleSubmit() { }
    handleRowAdd = () => {
        const { count, dataJson } = this.state;
        const newData = {
            key: count,
            yuzhiwei: 1,
            speed: 30,
            time: 15,
        };
        this.setState({
            dataJson: [...dataJson, newData],
            count: count + 1,
        });
    }
    handleRemove = () => {
        const { count, dataJson, delId } = this.state;
        console.log(delId);
        if (delId) {
            dataJson.splice(dataJson.findIndex(item => item.index === delId), 1)
            this.setState({
                dataJson: dataJson,
            });
        }

    }
    remove(value) {
        this.setState({
            delId: value.index
        })
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
        };
        const anniu = <Row gutter={16}>
            <Col span={24}>
                <Button onClick={this.handleRowAdd} >添加</Button>
                <Button onClick={this.handleRemove} >删除</Button>
            </Col>
        </Row>
        return (
            <div className="addyzw">
                <Form >
                    <FormItem {...formItemLayout} label='预置位'>
                        {getFieldDecorator('presetName', { rules: [{ required: true, message: '请输入预置位名称！' }] })(
                            <Input placeholder="预置位名称" className="search_ipt01" />
                        )}
                    </FormItem>
                    {anniu}
                    <Form.Item>
                        <Table
                            columns={[
                                {
                                    title: '预置点',
                                    dataIndex: 'yuzhiwei',
                                    width: '100px',
                                    key: 'yuzhiwei',
                                    render: (text, record, index) =>
                                        <Form.Item key={index}>
                                            {getFieldDecorator(`dataJson[${index}].yuzhiwei`)(
                                                <Select placeholder="预置位" >
                                                    {this.props.yuzhiList.map((item, index) => {
                                                        return (
                                                            <Select.Option key={item.id} value={index + 1}>
                                                                {index + 1}-{item.presetName}
                                                            </Select.Option>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                },
                                {
                                    title: '速度',
                                    dataIndex: 'speed',
                                    width: '80px',
                                    key: 'speed',
                                    render: (text, record, index) =>
                                        <Form.Item key={index}>
                                            {getFieldDecorator(`dataJson[${index}].speed`, {
                                                rules: [
                                                    {
                                                        validator: async (rule, value, callback) => {
                                                            if (value == 0) {
                                                                this.props.form.setFieldsValue({
                                                                    [rule.fullField]: 1
                                                                })
                                                            }
                                                            if (value >= 40) {
                                                                this.props.form.setFieldsValue({
                                                                    [rule.fullField]: 40
                                                                })
                                                            }
                                                        }
                                                    }],
                                                validateTrigger: "onBlur"
                                            })(
                                                <Input placeholder="请输⼊速度" />
                                            )}
                                        </Form.Item>
                                },
                                {
                                    title: '停留时间',
                                    dataIndex: 'time',
                                    width: '80px',
                                    key: 'time',
                                    render: (text, record, index) =>
                                        <Form.Item key={index}>
                                            {getFieldDecorator(`dataJson[${index}].time`, {
                                                rules: [{
                                                    validator: async (rule, value, callback) => {
                                                        if (value < 15) {
                                                            this.props.form.setFieldsValue({
                                                                [rule.field]: 15
                                                            })
                                                        }
                                                    }
                                                }],
                                                validateTrigger: "onBlur"
                                            })(
                                                <Input placeholder="请输⼊停留时间" />
                                            )}
                                        </Form.Item>
                                },
                            ]}
                            className='lunxuntable'
                            dataSource={this.state.dataJson}
                            pagination={false}
                            rowKey={(record, index) => index}
                            onRow={record => {
                                return {
                                    onClick: event => { this.remove(record) }, // 点击行     
                                }
                            }
                            }
                        />
                    </Form.Item>
                </Form>
            </div>)
    }
}
export default AddYt = Form.create()(AddYt);
/* eslint-enable */
