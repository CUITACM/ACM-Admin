import React, { PropTypes } from 'react';
import { Card, Icon } from 'antd';
import { API_ROOT } from 'constants/endpoints';
import './style.less';

export default class ProfileCard extends React.PureComponent {

  renderUserInfo(user) {
    const notWrite = '未填';
    return (
      <ul className="user-info">
        <li>
          <span className="icon"><Icon type="user" /></span>
          <span className="content">{user.gender ? '男' : '女'}</span>
        </li>
        <li>
          <span className="icon"><Icon type="mail" /></span>
          <span className="content">{user.email || notWrite}</span>
        </li>
        <li>
          <span className="icon"><Icon type="phone" /></span>
          <span className="content">{user.phone || notWrite}</span>
        </li>
        <li>
          <span className="icon"><Icon type="team" /></span>
          <span className="content">{user.school} {user.college} {user.major} {user.grade}</span>
        </li>
      </ul>
    );
  }

  render() {
    const { width, user } = this.props;
    const avatarBottom = (width / 4) + 10;
    const avatarUrl = `${API_ROOT}${user.avatar}`;
    const cardStyle = {
      width,
      minWidth: 200
    };
    return (
      <div>
        <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
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
        <Card
          style={{ ...cardStyle, marginTop: 10 }} bodyStyle={{ padding: 10 }}
          title="信息" extra={<a href="">修改</a>}
        >
          {this.renderUserInfo(user)}
        </Card>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  width: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

ProfileCard.defaultProps = {
  width: 200
};
