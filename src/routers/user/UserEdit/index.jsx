import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserForm from 'components/form/UserForm';

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
      <UserForm
        loading={loading} user={user} onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.models.user,
  user: user.currentItem,
});

export default connect(mapStateToProps)(UserEdit);
