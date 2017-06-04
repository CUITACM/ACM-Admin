import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Col } from 'antd';
import AuthLayout from 'components/AuthLayout';
import RegisterForm from 'components/form/RegisterForm';

class Register extends React.PureComponent {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch({ type: 'auth/register', payload: values });
  }

  render() {
    const { loading } = this.props;
    return (
      <AuthLayout>
        <Col className="auth-box" xs={24} sm={10} md={8} lg={8} >
          <h1>注册</h1>
          <RegisterForm loading={loading} onSubmit={this.onSubmit} />
        </Col>
      </AuthLayout>
    );
  }
}


const mapStateToProps = ({ loading, auth }) => ({
  loading: loading.models.auth || false,
  ...auth,
});

export default connect(mapStateToProps)(Register);
