import React, { PropTypes } from 'react';
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

export default class AdminApp extends React.PureComponent {
  render() {
    return (
      <div>
        <Header menus={NavbarMenu} />
        <section className="layout-container">
          {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }
}

AdminApp.propTypes = {
  children: PropTypes.element.isRequired
};
