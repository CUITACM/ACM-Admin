import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, notification } from 'antd';
import { isAdmin } from 'helpers/auth';
import { API_ROOT } from 'constants/endpoints';
import * as authActions from 'actions/auth';
import './style.less';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasLogout: false
    };
    this.renderMenu = this.renderMenu.bind(this);
    this.renderDropdownMenu = this.renderDropdownMenu.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, logoutSuccess } = nextProps;
    if (!this.state.hasLogout && logoutSuccess && currentUser.token == null) {
      this.setState({ hasLogout: true });
      notification.success({
        message: '注销成功'
      });
      this.context.router.replace('/auth/login');
    } else if (currentUser.token) {
      this.setState({ hasLogout: false });
    }
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
    const { actions, currentUser } = this.props;
    if (currentUser.token == null) {
      return <Menu />;
    }
    const onMenuSelect = ({ key }) => {
      switch (key) {
        case 'logout':
          actions.logout();
          break;
        default:
          break;
      }
    };
    return (
      <Menu onSelect={onMenuSelect}>
        <Menu.Item key="user_home">
          <Link to={`/principal/profile/${currentUser.id}`}>个人主页</Link>
        </Menu.Item>
        {isAdmin(currentUser) ?
          (<Menu.Item key="admin">
            <Link to="/admin/users">管理页</Link>
          </Menu.Item>) : null}
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    );
  }

  render() {
    const { currentUser } = this.props;
    const avatar = currentUser.avatar;
    const avatarUrl = `${API_ROOT}${avatar && avatar.thumb}`;
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
                    {avatar ? <img alt="avatar" src={avatarUrl} /> : null}
                    {currentUser.name} <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>) : null}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  menus: PropTypes.array,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  logoutSuccess: PropTypes.bool.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser || {},
    logoutSuccess: state.auth.logoutSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
