import React, { PropTypes } from 'react';
import Header from 'components/Header';
import LayoutSider from 'components/LayoutSider';
import Footer from 'components/Footer';
import { NavbarMenu } from 'src/config';
import './style.less';

export default class AppLayout extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.element
  }

  render() {
    return (
      <div>
        <Header menus={NavbarMenu} location={this.props.location} />
        <div className="layout-top">
          <section className="layout-container">
            <LayoutSider
              className="layout-sider"
              menus={NavbarMenu} location={this.props.location}
            />
            <div className="layout-content">
              {this.props.children}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
