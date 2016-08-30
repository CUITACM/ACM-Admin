import React, { PropTypes } from 'react';
import { Row, notification } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login as loginAction } from 'actions/auth';
import LoginBox from 'components/LoginBox';
import { keepCurrentUser, takeCurrentUser } from 'helpers/auth';
import './style.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    console.log(takeCurrentUser());
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const waitLoginIn = nextProps.waitLoginIn;
    const currentUser = nextProps.currentUser;

    if (error !== this.props.loginErrors && error) {
      notification.error({
        message: '登录失败',
        description: error
      });
    }

    if (!waitLoginIn && !error && currentUser) {
      notification.success({
        message: '登录成功',
        description: `Welcome ${currentUser.name}`
      });
    }

    if (currentUser && currentUser.token) {
      console.log(currentUser);
      keepCurrentUser(currentUser);
      // this.context.router.replace('/home');
    }
  }

  handleLogin(nickname, password) {
    console.log(this);
    this.props.login(nickname, password);
  }

  render() {
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <LoginBox handleLogin={this.handleLogin} />
      </Row>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

Login.propTypes = {
  login: PropTypes.func,
  currentUser: PropTypes.object,
  waitLoginIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    currentUser: auth.currentUser,
    waitLoginIn: auth.waitLoginIn,
    loginErrors: auth.loginErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(loginAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
