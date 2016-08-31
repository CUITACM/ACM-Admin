import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';
import * as authActions from 'actions/auth';
import * as authHelpers from 'helpers/auth';
import LoginBox from 'components/LoginBox';

import './style.less';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageHeight: document.body.clientHeight
    };
    this.handleLogin = (nickname, password) => {
      this.props.login(nickname, password);
    };
    this.handleResize = () => {
      this.setState({ pageHeight: document.body.clientHeight });
    };
  }

  componentWillMount() {
    if (authHelpers.hasLogin()) {
      this.props.loadCurrentUser(authHelpers.takeCurrentUser());
      this.context.router.replace('/');
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
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
        description: `欢迎 ${currentUser.name}, 2秒后自动跳转首页`
      });
      console.log(currentUser);
      authHelpers.keepCurrentUser(currentUser);
      setTimeout(() => {
        this.context.router.replace('/');
      }, 2000);
      
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { pageHeight } = this.state;
    const { waitLoginIn } = this.props;
    return (
      <div className="login-page" style={{ minHeight: pageHeight }} >
        <Row className="login-row" type="flex" justify="space-around" align="middle" >
          <Col className="figure" xs={{ span: 24 }} sm={{ span: 24 }}>
            <h1>CUIT ACM Team</h1>
            <p>与世界分享你的zhuangbi</p>
          </Col>
          <LoginBox loading={waitLoginIn} handleLogin={this.handleLogin} />
        </Row>
      </div>
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
    login: bindActionCreators(authActions.login, dispatch),
    loadCurrentUser: bindActionCreators(authActions.loadCurrentUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
