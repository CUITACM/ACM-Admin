import React, { PropTypes } from 'react';
import { Card } from 'antd';
import { API_ROOT } from 'constants/endpoints';
import './style.less';

export default function ProfileCard(props) {
  const { width, user } = props;
  const avatarBottom = (width / 4) + 10;
  const avatarUrl = `${API_ROOT}${user.avatar}`;
  return (
    <Card style={{ width }} bodyStyle={{ padding: 0 }}>
      <div className="custom-card-avatar" style={{ marginBottom: avatarBottom }}>
        <img alt="example" src={avatarUrl} />
      </div>
      <div className="custom-card-body">
        <h3>{ user.name }</h3>
        <p className="description">
          { user.description ? user.description : '这个人很懒，什么都没有留下' }
        </p>
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {
  width: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

ProfileCard.defaultProps = {
  width: 200
};
