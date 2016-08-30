import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';


class LoginBox extends React.Component {
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
        { required: true, message: '请填写用户名' }
      ],
    });
    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' }
      ],
    });
    return (
      <Col xs={{ span: 20 }} sm={{ span: 12 }}>
        <Form horizontal onSubmit={this.onSubmit} className="login-form">
          <FormItem
            label="用户名："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            hasFeedback
          >
            <Input placeholder="用户名" {...nicknameProps} />
          </FormItem>
          <FormItem
            label="密码："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            hasFeedback
          >
            <Input type="password" placeholder="密码" {...passwordProps} />
          </FormItem>
          <Row>
            <Col span="16" offset="6">
              <Button type="primary" htmlType="submit">确定</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

LoginBox.propTypes = {
  form: PropTypes.object,
  handleLogin: PropTypes.func.isRequired
};


export default Form.create()(LoginBox);
