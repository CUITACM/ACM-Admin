import React, { PropTypes } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const NavbarMenu = [
];

export default function PrincipalApp(props) {
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

PrincipalApp.propTypes = {
  children: PropTypes.element.isRequired
};
