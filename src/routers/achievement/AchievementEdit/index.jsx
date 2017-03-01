import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Form, Breadcrumb, Icon } from 'antd';
import AchievementForm from 'components/form/AchievementForm';

class AchievementEdit extends React.PureComponent {

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
        <AchievementForm onSubmit={() => null} />
      </div>
    );
  }
}

export default AchievementEdit;
