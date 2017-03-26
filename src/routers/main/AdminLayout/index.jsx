import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Header from 'components/Header';
import LayoutSider from 'components/LayoutSider';
import Footer from 'components/Footer';
import { NavbarMenu } from 'src/config';
import './style.less';

class AdminLayout extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.element,
    loading: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    if (currentUser && currentUser.id && !currentUser.is_admin) {
      window.location.href = '/site';
    }
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

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.global || false,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(AdminLayout);
