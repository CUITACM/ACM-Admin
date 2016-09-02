import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import * as authActions from 'actions/auth';
import * as authHelpers from 'helpers/auth';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((errors) => {
        if (!errors) {
          const data = this.props.form.getFieldsValue();
          this.props.actions.login(data.nickname, data.password);
          return;
        }
      });
    };
  }

  componentWillMount() {
    if (authHelpers.hasLogin()) {
      this.props.actions.loadCurrentUser(authHelpers.takeCurrentUser());
    }
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const waitLoginIn = nextProps.waitLoginIn;
    const currentUser = nextProps.currentUser;

    if (error !== this.props.loginErrors && error) {
      notification.error({ message: '登录失败', description: error });
    }

    if (!waitLoginIn && !error && currentUser && currentUser.token) {
      notification.success({
        message: '登录成功',
        description: `欢迎 ${currentUser.name}, 即将自动跳转`
      });
      authHelpers.keepCurrentUser(currentUser);
      setTimeout(() => {
        // this.context.router.replace(this.props.location.query.next || '/');
      }, 1000);
    }
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
      <Col className="auth-box" xs={24} sm={10} md={7} lg={6} >
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
                className="btn-auth" type="primary" htmlType="submit"
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

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loginErrors: PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    currentUser: auth.currentUser,
    loading: auth.waitLoginIn,
    loginErrors: auth.loginErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(Login)
);
