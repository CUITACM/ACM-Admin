import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import AuthLayout from 'components/AuthLayout';
import LoginForm from 'components/form/LoginForm';

class Login extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    nextPath: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit(values) {
    this.props.dispatch({ type: 'auth/login', payload: values });
  }

  render() {
    const { loading } = this.props;
    return (
      <AuthLayout>
        <Col className="auth-box" xs={24} sm={10} md={7} lg={6} >
          <h1>登录</h1>
          <LoginForm loading={loading} onSubmit={this.onLoginSubmit} />
        </Col>
      </AuthLayout>
    );
  }
}


const mapStateToProps = ({ loading, auth }) => ({
  loading: loading.models.auth || false,
  ...auth,
});

export default connect(mapStateToProps)(Login);
