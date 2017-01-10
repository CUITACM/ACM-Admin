import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import UserForm from 'components/form/UserForm';
import './style.less';

class UserEdit extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onSubmit = (id, params) => {
      this.props.dispatch({
        type: 'user/update',
        payload: { id, params }
      });
    };
  }

  render() {
    const { loading, user } = this.props;
    return (
      <div className="user-edit-page">
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/main">
            <Link to="/admin/main"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/admin/users/list"><Icon type="user" /> 用户列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            编辑用户
          </Breadcrumb.Item>
        </Breadcrumb>
        <UserForm
          loading={loading} user={user} onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.models.user,
  user: user.currentItem,
});

export default connect(mapStateToProps)(UserEdit);
