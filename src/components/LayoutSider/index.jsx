import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import './style.less';

export default class LayoutSider extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    className: PropTypes.string,
    menus: PropTypes.array,
    location: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      routeIndex: 0,
      selectedKeys: []
    };
    this.linkTo = (item) => {
      this.context.router.push(item.key);
    };
  }

  componentWillMount() {
    const { menus, location } = this.props;
    const routeIndex = this.computeRouteIndex(menus, location);
    this.computeActiveRoute(routeIndex, location);
  }

  componentWillReceiveProps(nextProps) {
    const { menus, location } = nextProps;
    const routeIndex = this.computeRouteIndex(menus, location);
    this.computeActiveRoute(routeIndex, location);
  }

  computeRouteIndex(menus, location) {
    for (let i = 0; i < menus.length; ++i) {
      if (location.pathname.indexOf(menus[i].to) === 0) {
        this.setState({ routeIndex: i });
        return i;
      }
    }
    return 0;
  }

  computeActiveRoute(routeIndex, location) {
    const menu = this.props.menus[routeIndex].children || [];
    for (let i = 0; i < menu.length; ++i) {
      if (location.pathname.indexOf(menu[i].to) === 0) {
        this.setState({ selectedKeys: [menu[i].to] });
        return;
      }
    }
  }

  render() {
    const { routeIndex } = this.state;
    const menu = this.props.menus[routeIndex].children || [];
    return (
      <aside className={this.props.className}>
        <Menu mode="inline" selectedKeys={this.state.selectedKeys} onClick={this.linkTo}>
          {menu.map(child =>
            <Menu.Item key={child.to}><Icon type={child.icon} />{child.text}</Menu.Item>
          )}
        </Menu>
      </aside>
    );
  }
}
