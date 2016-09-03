import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import * as authActions from 'actions/auth';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.less';

const NavbarMenu = [
  {
    key: 'admin_users',
    to: '/admin/users',
    text: '用户管理'
  },
  {
    key: 'admin_articles',
    to: '/admin/articles',
    text: '文章管理'
  }
];

class AdminApp extends React.PureComponent {

  componentWillMount() {
    this.props.actions.loadCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, logoutSuccess } = nextProps;
    if (logoutSuccess && currentUser.token == null) {
      notification.success({
        message: '注销成功'
      });
      this.context.router.replace('/auth/login');
    }
  }

  render() {
    const { currentUser, actions } = this.props;
    return (
      <div>
        <Header
          authActions={actions} menus={NavbarMenu}
          currentUser={currentUser}
        />
        <section className="layout-container">
          {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }
}

AdminApp.propTypes = {
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  logoutSuccess: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

AdminApp.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser || {},
    logoutSuccess: state.auth.logoutSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp);
