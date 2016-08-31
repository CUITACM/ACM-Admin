import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import './style.less';

export default class Header extends React.PureComponent {
  renderMenu() {
    const { menus } = this.props;
    return (
      <Menu
        theme="dark" mode="horizontal"
        defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}
      >
        {menus.map(data => {
          console.log(data);
          return <Menu.Item key={data.key}><Link to={data.to}>{data.text}</Link></Menu.Item>
        })}
      </Menu>
    );
  }

  render() {
    return (
      <header className="layout-header">
        <div className="header-wrapper">
          <div className="header-logo">CUIT ACM Team</div>
          {this.renderMenu()}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  menus: PropTypes.array
};
