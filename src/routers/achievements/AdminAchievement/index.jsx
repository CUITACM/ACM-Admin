import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Table, Button, Popconfirm, Modal, Dropdown, Icon, Menu, Tag
} from 'antd';

class AdminAchievement extends React.PureComponent {
  render() {
    return (
      <div>AdminAchievement</div>
    );
  }
}
const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(AdminAchievement);
