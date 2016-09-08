import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class UserForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.props.form);
    };
  }
  render() {
    const { user } = this.props;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '请填写昵称' }
      ],
    });
    const emailProps = getFieldProps('email', {
      rules: [
        { required: true, whitespace: true, message: '请填写邮箱' }
      ],
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="昵称">
          <Input size="default" placeholder="昵称" {...nameProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          <Input size="default" placeholder="邮箱" {...emailProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="学号">
          <Input size="default" placeholder="学号" {...emailProps} />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} >
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object,
  onSubmit: PropTypes.func
};

export default Form.create()(UserForm);
