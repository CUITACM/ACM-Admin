import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import AchievementForm from 'components/form/AchievementForm';

class AchievementEdit extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    achievement: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(id, params) {
    if (id == null) {
      this.props.dispatch({
        type: 'achievement/create', payload: { params, goback: true }
      });
    } else {
      this.props.dispatch({
        type: 'achievement/update', payload: { id, params, goback: true }
      })
    }
  }

  render() {
    const { loading, achievement } = this.props;
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
        <AchievementForm loading={loading} onSubmit={this.onSubmit} achievement={achievement} />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, achievement }) => ({
  loading: loading.models.achievement || false,
  achievement: achievement.currentItem,
});


export default connect(mapStateToProps)(AchievementEdit);
