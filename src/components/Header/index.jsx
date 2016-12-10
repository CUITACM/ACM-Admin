import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { CDN_ROOT } from 'src/config';
import { Menu, Dropdown, Icon } from 'antd';
import './style.less';

class Header extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    location: PropTypes.object,
    menus: PropTypes.array,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
    this.renderMenu = this.renderMenu.bind(this);
    this.renderDropdownMenu = this.renderDropdownMenu.bind(this);
    this.linkTo = (item) => {
      this.props.dispatch(routerRedux.push(item.key));
    };
  }

  componentWillMount() {
    this.setState({ selectedKeys: [this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedKeys: [nextProps.location.pathname] });
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
        selectedKeys={this.state.selectedKeys} onClick={this.linkTo}
      >
        {this.props.menus.map(data => (
          <Menu.Item key={data.to} >{data.text}</Menu.Item>
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
