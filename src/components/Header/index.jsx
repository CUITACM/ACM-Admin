import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { CDN_ROOT } from 'src/config';
import { Menu, Dropdown, Icon } from 'antd';
import './style.less';

class Header extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    menus: PropTypes.array,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      hasLogout: false
    };
    this.renderMenu = this.renderMenu.bind(this);
    this.renderDropdownMenu = this.renderDropdownMenu.bind(this);
  }

  getAvatar(user) {
    if (user == null || user.avatar == null) return '';
    return CDN_ROOT + user.avatar.thumb;
  }

  renderMenu() {
    return (
      <Menu
        theme="dark" mode="horizontal"
        style={{ lineHeight: '64px', display: 'inline-block' }}
      >
        {this.props.menus.map(data => (
          <Menu.Item key={data.key} >
            <Link to={data.to}>{data.text}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  renderDropdownMenu() {
    const onMenuSelect = ({ key }) => {
      switch (key) {
        case 'logout':
          this.props.dispatch({ type: 'auth/logout' });
          break;
        default:
          break;
      }
    };
    return (
      <Menu onSelect={onMenuSelect}>
        {/* <Menu.Item key="user_home">
          <Link to={`/principal/profile/${currentUser.id}`}>个人主页</Link>
        </Menu.Item> */}
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    );
  }

  render() {
    const { currentUser } = this.props;
    return (
      <header className="layout-header">
        <div className="header-wrapper">
          <div className="header-logo">CUIT ACM Team</div>
          {this.renderMenu()}
          {currentUser ?
            (<ul className="nav nav-right">
              <li>
                <Dropdown overlay={this.renderDropdownMenu()} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#app-root">
                    <img alt="avatar" src={this.getAvatar(currentUser)} />
                    {currentUser.display_name} <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>) : null}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading.global || false,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
