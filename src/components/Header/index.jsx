import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
import './style.less';

const dropdownMenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#app-root">个人主页</a>
    </Menu.Item>
    <Menu.Item key="2">注销</Menu.Item>
  </Menu>
);

export default class Header extends React.PureComponent {
  renderMenu() {
    return (
      <Menu
        theme="dark" mode="horizontal" defaultSelectedKeys={['admin_user']}
        style={{ lineHeight: '64px', display: 'inline-block' }}
      >
        {this.props.menus.map(data => (
          <Menu.Item key={data.key}><Link to={data.to}>{data.text}</Link></Menu.Item>
        ))}
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
          <ul className="nav nav-right">
            <li>
              <Dropdown overlay={dropdownMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#app-root">
                  <img alt="avatar" src="https://avatars3.githubusercontent.com/u/9291692?v=3&s=460" />
                  {currentUser.name} <Icon type="down" />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  menus: PropTypes.array,
  currentUser: PropTypes.object
};
