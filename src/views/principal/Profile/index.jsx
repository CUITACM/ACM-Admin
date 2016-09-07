import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import ProfileCard from 'components/ProfileCard';
import { isAdmin } from 'helpers/auth';
import * as userActions from 'actions/entity/user';
import './style.less';

const TabPane = Tabs.TabPane;

class Profile extends React.PureComponent {

  componentDidMount() {
    const { userId } = this.props.params;
    this.props.userActions.fetchOneUser(userId);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="profile-container">
        <ProfileCard width={240} user={user} />
        <div className="profile-tab" >
          <Tabs defaultActiveKey="1">
            <TabPane tab="信息" key="1">选项卡三内容</TabPane>
            <TabPane tab="文章" key="2">选项卡一内容</TabPane>
            <TabPane tab="提交" key="3">选项卡二内容</TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    user: state.entity.user.one || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

