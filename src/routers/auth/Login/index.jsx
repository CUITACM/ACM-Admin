import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import AuthLayout from 'components/AuthLayout';

class Login extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    hasLogin: PropTypes.bool.isRequired,
    loginErrors: PropTypes.string,
    nextPath: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { hasLogin, loginErrors, nextPath } = this.props;
    if (hasLogin && hasLogin !== prevProps.hasLogin) {
      console.log('hasLogin');
      notification.success({
        message: '登录成功',
        description: '将自动跳转到登录前一页',
        duration: 3
      });
      this.context.router.push({ pathname: nextPath });
    }
    if (!hasLogin && loginErrors && loginErrors !== prevProps.loginErrors) {
      notification.error({
        message: '登录失败',
        description: this.props.loginErrors
      });
    }
  }

  onLoginSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const data = this.props.form.getFieldsValue();
        this.props.dispatch({ type: 'auth/login', payload: data });
      }
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const nicknameDecorator = getFieldDecorator('nickname', {
      rules: [
        { required: true, message: '请填写用户名或学号或邮箱' }
      ],
    });
    const passwordDecorator = getFieldDecorator('password', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' }
      ],
    });
    const formItemCol = { span: 18, offset: 3 };
    return (
      <AuthLayout>
        <Col className="auth-box" xs={24} sm={10} md={7} lg={6} >
          <h1>登录</h1>
          <Form horizontal onSubmit={this.onLoginSubmit} className="auth-form">
            <FormItem wrapperCol={formItemCol} >
              {nicknameDecorator(
                <Input size="large" placeholder="用户名或学号或邮箱" />
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
                  登陆
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </AuthLayout>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.loading.models.auth || false,
  ...state.auth,
});

export default connect(mapStateToProps)(
  Form.create()(Login)
);
