import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Icon, Row, Col } from 'antd';
import './style.less';

class Dashboard extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    dashboard: PropTypes.object.isRequired
  }

  render() {
    const { dashboard } = this.props;
    return (
      <div className="admin-dashboard">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              {dashboard.user_count}
            </Card>
          </Col>
          <Col span={6}>
            <Card>{dashboard.newcomer_count}</Card>
          </Col>
          <Col span={6}>
            <Card>{dashboard.news_count}</Card>
          </Col>
          <Col span={6}>
            <Card>{dashboard.solution_count}</Card>
          </Col>
          <Col span={6}>
            <Card>{dashboard.account_count}</Card>
          </Col>
          <Col span={6}>
            <Card>{dashboard.resource_count}</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, misc }) => ({
  loading: loading.models.misc || false,
  dashboard: misc.dashboard,
});

export default connect(mapStateToProps)(Dashboard);
