import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import './style.less';

class LoginBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const data = this.props.form.getFieldsValue();
        this.props.handleLogin(data.nickname, data.password);
        return;
      }
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldProps } = this.props.form;
    const nicknameProps = getFieldProps('nickname', {
      rules: [
        { required: true, message: '请填写用户名或学号或邮箱' }
      ],
    });
    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' }
      ],
    });
    const formItemCol = { span: 18, offset: 3 };
    return (
      <Col className="login-box" xs={24} sm={10} md={7} lg={6} >
        <Form horizontal onSubmit={this.onSubmit} className="login-form">
          <FormItem wrapperCol={formItemCol} >
            <Input size="large" placeholder="用户名或学号或邮箱" {...nicknameProps} />
          </FormItem>
          <FormItem wrapperCol={formItemCol} >
            <Input size="large" type="password" placeholder="密码" {...passwordProps} />
          </FormItem>
          <Row>
            <Col span="18" offset="3">
              <Button
                className="btn-login" type="primary" htmlType="submit"
                loading={this.props.loading}
              >
                登陆
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

LoginBox.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired
};


export default Form.create()(LoginBox);
