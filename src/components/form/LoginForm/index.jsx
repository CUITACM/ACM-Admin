import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const values = this.props.form.getFieldsValue();
        console.log(values);
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const formItemCol = { span: 18, offset: 3 };
    const { getFieldDecorator } = this.props.form;
    const nicknameDecorator = getFieldDecorator('nickname', {
      rules: [{ required: true, message: '请填写用户名或学号或邮箱' }],
    });
    const passwordDecorator = getFieldDecorator('password', {
      rules: [{ required: true, whitespace: true, message: '请填写密码' }],
    });
    return (
      <Form horizontal onSubmit={e => this.onSubmit(e)} className="auth-form">
        <FormItem wrapperCol={formItemCol} >
          {nicknameDecorator(
            <Input prefix={<Icon type="user" />} size="large" placeholder="用户名或学号或邮箱" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {passwordDecorator(
            <Input prefix={<Icon type="lock" />} size="large" type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          <Button
            className="btn-auth" type="primary"
            onClick={e => this.onSubmit(e)} loading={this.props.loading}
          >
            登陆
          </Button>
        </FormItem>
        <hr />
        <p>Or <Link to="/auth/register">加入我们</Link></p>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
