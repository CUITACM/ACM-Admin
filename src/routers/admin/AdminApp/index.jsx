import React, { PropTypes } from 'react';
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
  },
  {
    key: 'admin_resources',
    to: '/admin/resources',
    text: '资源管理'
  }
];

export default class AdminApp extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element
  }

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
