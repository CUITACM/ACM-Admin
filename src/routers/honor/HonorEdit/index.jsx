import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import HonorForm from 'components/form/HonorForm';

class HonorEdit extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    // todo
  }

  render() {
    return (
      <div className="edit-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin/main"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/admin/achievements">
              <Icon type="list" /> 成就列表
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            发布新成就
          </Breadcrumb.Item>
        </Breadcrumb>
        <HonorForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default HonorEdit;
