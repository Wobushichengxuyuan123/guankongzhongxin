import React from 'react'
import { Input, Form } from 'antd';
const FormItem = Form.Item;
class AddYt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.data) {
            this.props.form.setFieldsValue({ presetName: this.props.data });
        }
    }
    handleSubmit() {
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
        return (
            <div className="addyzw">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem {...formItemLayout} label='预置位'>
                        {getFieldDecorator('presetName', { rules: [{ required: true, message: '请输入预置位名称！' }] })(
                            <Input placeholder="预置位名称" className="search_ipt01" />
                        )}
                    </FormItem>

                </Form>
            </div>)
    }
}

export default AddYt = (AddYt);
