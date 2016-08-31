import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'actions/auth';
import { takeCurrentUser } from 'helpers/auth';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.less';

const NavbarMenu = [
  {
    key: 'admin_user',
    to: '/admin/users',
    text: '用户管理'
  }
];

class AdminApp extends React.PureComponent {

  componentWillMount() {
    this.props.loadCurrentUser(takeCurrentUser());
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header menus={NavbarMenu} />
        <section className="layout-container">
          {this.props.children}
          {currentUser ? currentUser.nickname : null }
        </section>
        <Footer />
      </div>
    );
  }
}

AdminApp.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.element.isRequired
};

AdminApp.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCurrentUser: bindActionCreators(authActions.loadCurrentUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp);
