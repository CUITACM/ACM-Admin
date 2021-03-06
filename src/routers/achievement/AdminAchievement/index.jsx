import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Table, Button, Tag
} from 'antd';
import SearchInput from 'components/SearchInput';
import { HumanAchievementType } from 'models/achievement';

const getColumns = (filters, operations) => (
  [{
    title: '名称',
    dataIndex: 'name',
    sorter: true,
    width: '15%',
    render: name => <b>{name}</b>
  }, {
    title: '成就类型',
    dataIndex: 'achievement_type',
    width: '10%',
    render: type => <Tag color="blue-inverse">{HumanAchievementType[type]}</Tag>
  }, {
    title: '成就点',
    dataIndex: 'score',
    width: '8%',
  }, {
    title: '描述',
    dataIndex: 'description',
    width: '20%',
  }, {
    title: '成就条件',
    dataIndex: 'conditions',
    width: '27%',
    render: (conditions) => JSON.stringify(conditions)
  }, {
    title: '操作',
    width: '20%',
    render: (_, record) => (
      <Link to={`/admin/achievements/edit/${record.id}`}>修改</Link>
    )
  }]
);

class AdminAchievement extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    type: PropTypes.string,
    filters: PropTypes.object,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(value) {
    // todo
  }

  render() {
    const columns = getColumns(this.props.filters, {
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button type="primary" >
            <Link to="/admin/achievements/create">发布新成就</Link>
          </Button>
          <div className="pull-right">
            <SearchInput onSearch={this.onSearch} style={{ width: 200 }} />
          </div>
        </div>
        <Table
          bordered
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          columns={columns} dataSource={this.props.list}
          pagination={this.props.pagination} loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, achievement }) => ({
  loading: loading.models.achievement,
  list: achievement.list,
  filters: achievement.filters,
  pagination: {
    current: achievement.page,
    pageSize: achievement.per,
    total: achievement.totalCount
  }
});

export default connect(mapStateToProps)(AdminAchievement);
