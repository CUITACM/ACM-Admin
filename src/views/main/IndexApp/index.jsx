import React, { PropTypes } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const NavbarMenu = [
  {
    key: 'home',
    to: '/index/home',
    text: '主页'
  },
];

export default function IndexApp(props) {
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

IndexApp.propTypes = {
  children: PropTypes.element.isRequired
};
