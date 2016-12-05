import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, notification } from 'antd';
import ProfileCard from 'components/ProfileCard';
import * as userActions from 'actions/entity/user';
import './style.less';

const TabPane = Tabs.TabPane;

class Profile extends React.PureComponent {

  componentDidMount() {
    const { userId } = this.props.params;
    this.props.actions.fetchOneUser(userId);
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    const success = nextProps.updateSuccess;
    const errors = nextProps.updateErrors;
    if (errors && errors !== this.props.updateErrors) {
      notification.error({ message: '修改失败', description: errors });
    }
    if (success && user && user.updated_at > this.props.user.updated_at) {
      notification.success({ message: '修改成功' });
    }
  }

  render() {
    const { user, actions } = this.props;
    return (
      <div className="profile-container">
        <ProfileCard width={240} user={user} actions={actions} />
        <div className="profile-tab">
          <Tabs defaultActiveKey="1">
            <TabPane tab="文章" key="1">选项卡一内容</TabPane>
            <TabPane tab="提交" key="2">选项卡二内容</TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  waitUpdate: PropTypes.bool.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  updateErrors: PropTypes.string
};


function mapStateToProps(state) {
  const userState = state.entity.user;
  return {
    user: userState.one || {},
    waitUpdate: userState.waitUpdate,
    updateSuccess: userState.updateSuccess,
    updateErrors: userState.updateErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

