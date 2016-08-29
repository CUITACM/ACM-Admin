import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const FormItem = Form.Item;

const propTypes = {
  form: PropTypes.object,
  login: PropTypes.func,
  currentUser: PropTypes.object,
  waitLoginIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const waitLoginIn = nextProps.waitLoginIn;
    const currentUser = nextProps.currentUser;

    if (error !== this.props.loginErrors && error) {
      notification.error({
        message: 'Login Fail',
        description: error
      });
    }

    if (!waitLoginIn && !error && currentUser) {
      notification.success({
        message: 'Login Success',
        description: `Welcome${currentUser.name}`
      });
    }

    if (currentUser) {
      // this.context.router.replace('/home');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    this.props.login(data.user, data.password);
  }

  render() {
    console.log(this.props.form);
    const { getFieldProps } = this.props.form;
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form horizontal onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              label="用户名："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="admin" {...getFieldProps('user')} />
            </FormItem>
            <FormItem
              label="密码："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input type="password" placeholder="123456" {...getFieldProps('password')} />
            </FormItem>
            <Row>
              <Col span="16" offset="6">
                <Button type="primary" htmlType="submit">确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

function mapStateToProps(state) {
  const { auth } = state;
  if (auth.currentUser) {
    return {
      currentUser: auth.currentUser,
      waitLoginIn: auth.waitLoginIn,
      loginErrors: ''
    };
  }
  return {
    currentUser: null,
    waitLoginIn: auth.waitLoginIn,
    loginErrors: auth.loginErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(Login)
);
