import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col } from 'antd';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((errors) => {
        if (!errors) {
          const data = this.props.form.getFieldsValue();
          this.props.actions.register(data);
        }
      });
    };
  }

  componentDidMount() {
    if (authHelpers.hasLogin()) {
      this.props.actions.loadCurrentUser(authHelpers.takeCurrentUser());
    }
  }

  componentWillReceiveProps() {
    // todo
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const nameDecorator = getFieldDecorator('name', {
      rules: [
        { required: true, message: '请填写真实姓名' }
      ],
    });
    const nicknameDecorator = getFieldDecorator('nickname', {
      rules: [
        { required: true, message: '请填写用户名' }
      ],
    });
    const passwordDecorator = getFieldDecorator('password', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' }
      ],
    });
    const formItemCol = { span: 18, offset: 3 };
    return (
      <Col className="auth-box" xs={24} sm={10} md={7} lg={6} >
        <h1>加入我们</h1>
        <Form horizontal onSubmit={this.onSubmit} className="auth-form">
          <FormItem wrapperCol={formItemCol} >
            {nameDecorator(
              <Input size="large" placeholder="真实姓名" />
            )}
          </FormItem>
          <FormItem wrapperCol={formItemCol} >
            {nicknameDecorator(
              <Input size="large" placeholder="用户名" />
            )}
          </FormItem>
          <FormItem wrapperCol={formItemCol} >
            {passwordDecorator(
              <Input size="large" type="password" placeholder="密码" />
            )}
          </FormItem>
          <Row>
            <Col span="18" offset="3">
              <Button
                className="btn-auth" type="primary" htmlType="submit"
                loading={this.props.loading}
              >
                提交
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

Register.contextTypes = {
  router: PropTypes.object.isRequired
};

Register.propTypes = {
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registerSuccess: PropTypes.bool,
  registerErrors: PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    loading: auth.waitRegister,
    registerSuccess: auth.registerSuccess,
    registerErrors: auth.registerErrors
  };
}

export default connect(mapStateToProps)(
  Form.create()(Register)
);
