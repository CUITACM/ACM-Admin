import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Form, Input, Button, Icon, Radio } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LoginForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
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

  checkConfirmPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次填写密码不一致!');
    } else {
      callback();
    }
  }

  render() {
    const formItemCol = { span: 18, offset: 3 };
    const { getFieldDecorator } = this.props.form;
    const displayNameDecorator = getFieldDecorator('display_name', {
      rules: [{ required: true, message: '请填写真实姓名' }],
    });
    const nicknameDecorator = getFieldDecorator('nickname', {
      rules: [{ required: true, message: '请填写用户名' }],
    });
    const passwordDecorator = getFieldDecorator('password', {
      rules: [{ required: true, whitespace: true, message: '请填写密码' }],
    });
    const password2Decorator = getFieldDecorator('password2', {
      rules: [
        { required: true, whitespace: true, message: '请二次填写确认密码' },
        { validator: this.checkConfirmPassword }
      ],
    });
    const genderDecorator = getFieldDecorator('gender', {
      rules: [
        { required: true, whitespace: true, message: '选择性别' }
      ],
    });
    const descriptionDecorator = getFieldDecorator('description', {
      rules: [{ required: true, whitespace: true, message: '请填写个人简短介绍' }],
    });
    return (
      <Form className="auth-form">
        <FormItem wrapperCol={formItemCol} >
          {displayNameDecorator(
            <Input prefix={<Icon type="user" />} size="large" placeholder="真实姓名" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {nicknameDecorator(
            <Input prefix={<Icon type="smile-o" />} size="large" placeholder="用户名" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {passwordDecorator(
            <Input prefix={<Icon type="lock" />} size="large" type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {password2Decorator(
            <Input prefix={<Icon type="lock" />} size="large" type="password" placeholder="确认密码" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {genderDecorator(
            <RadioGroup>
              <RadioButton value="1">男</RadioButton>
              <RadioButton value="0">女</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          {descriptionDecorator(
            <Input type="textarea" rows={4} placeholder="个人简短介绍" />
          )}
        </FormItem>
        <FormItem wrapperCol={formItemCol} >
          <Button
            className="btn-auth" type="primary"
            onClick={e => this.onSubmit(e)} loading={this.props.loading}
          >
            提交注册申请
          </Button>
        </FormItem>
        <hr />
        <p>Or <Link to="/site">回到首页</Link></p>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
