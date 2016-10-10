import React, { PropTypes } from 'react';
import { Card, Icon, Modal } from 'antd';
import UserForm from 'components/form/UserForm';
import AvatarUpload from 'components/AvatarUpload';
import './style.less';

export default class ProfileCard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibleEditUserModal: false
    };
    this.showEditUserModal = () => {
      this.setState({ visibleEditUserModal: true });
    };
    this.hideEditUserModal = () => {
      this.setState({ visibleEditUserModal: false });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.hideEditUserModal();
    }
  }

  renderUserInfo(user) {
    const notWrite = '未填';
    const userInfo = user.user_info || {};
    return (
      <ul className="user-info">
        <li>
          <span className="icon"><Icon type="smile" /></span>
          <span className="content">{user.gender ? '男' : '女'}</span>
        </li>
        <li>
          <span className="icon"><Icon type="team" /></span>
          <span className="content">{userInfo.stu_id || notWrite}</span>
        </li>
        <li>
          <span className="icon"><Icon type="mail" /></span>
          <span className="content">{userInfo.email || notWrite}</span>
        </li>
        <li>
          <span className="icon"><Icon type="environment" /></span>
          <span className="content">
            {userInfo.school} {userInfo.college} {userInfo.major} {userInfo.grade}
          </span>
        </li>
      </ul>
    );
  }

  render() {
    const { width, user, actions } = this.props;
    const avatarBottom = (width / 4) + 10;
    const cardStyle = {
      width,
      minWidth: 200
    };
    return (
      <div>
        <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
          <div className="custom-card-avatar" style={{ marginBottom: avatarBottom }}>
            <AvatarUpload user={user} />
          </div>
          <div className="custom-card-body">
            <h3>{ user.name }</h3>
            <p className="description">
              { user.description ? user.description : '这个人很懒，什么都没有留下' }
            </p>
          </div>
        </Card>
        <Card
          title="信息" style={{ ...cardStyle, marginTop: 10 }} bodyStyle={{ padding: 10 }}
          extra={<a onClick={this.showEditUserModal}>修改</a>}
        >
          {this.renderUserInfo(user)}
        </Card>
        <Modal
          title="修改用户信息" visible={this.state.visibleEditUserModal} footer={null}
          onCancel={this.hideEditUserModal} style={{ top: 20 }}
        >
          <UserForm onSubmit={actions.updateUser} user={user} />
        </Modal>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  width: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ProfileCard.defaultProps = {
  width: 200
};
