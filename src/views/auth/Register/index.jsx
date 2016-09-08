import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import * as authActions from 'actions/auth';
import * as authHelpers from 'helpers/auth';

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

  componentWillReceiveProps(nextProps) {
    const success = nextProps.registerSuccess;
    const error = nextProps.registerErrors;
    const waitRegister = nextProps.waitRegister;

    if (error !== this.props.registerErrors && error) {
      notification.error({ message: '登录失败', description: error });
    }

    if (!waitRegister && !error && success) {
      notification.success({
        message: '注册成功',
        description: '请等待审核'
      });
    }
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldProps } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '请填写真实姓名' }
      ],
    });
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
    const formItemCol = { span: 18, offset: 3 };
    return (
      <Col className="auth-box" xs={24} sm={10} md={7} lg={6} >
        <h1>加入我们</h1>
        <Form horizontal onSubmit={this.onSubmit} className="auth-form">
          <FormItem wrapperCol={formItemCol} >
            <Input size="large" placeholder="真实姓名" {...nameProps} />
          </FormItem>
          <FormItem wrapperCol={formItemCol} >
            <Input size="large" placeholder="用户名" {...nicknameProps} />
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(Register)
);
