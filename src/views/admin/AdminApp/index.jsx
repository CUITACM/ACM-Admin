import React, { PropTypes } from 'react';
import { Breadcrumb } from 'antd';
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

export default function AdminApp(props) {
  return (
    <div>
      <Header menus={NavbarMenu} />
      <section className="layout-container">
        {props.children}
      </section>
      <Footer />
    </div>
  );
}

AdminApp.propTypes = {
  children: PropTypes.element
};
