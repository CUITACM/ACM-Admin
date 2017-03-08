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
    console.log(currentUser.is_admin);
    if (currentUser && currentUser.id && !currentUser.is_admin) {
      window.location.href = '/403';
    }
  }

  render() {
    const { loading, currentUser } = this.props;
    return (
      <Spin spinning={loading} delay={500}>
        <Header menus={NavbarMenu} location={this.props.location} />
        {currentUser && currentUser.id && currentUser.is_admin ? (
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
        ) : null}
        <Footer />
      </Spin>
    );
  }
}

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.models.user || false,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(AdminLayout);
