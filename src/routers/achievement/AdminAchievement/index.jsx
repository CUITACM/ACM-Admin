import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Table, Button, Tag, Popconfirm
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
      <span>
        <Link to={`/admin/achievements/edit/${record.id}`}>修改</Link>
        {/*<span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" 
          placement="left"
          onConfirm={() => operations.onDelete(record)}>
            <a>删除</a>
          </Popconfirm>*/}
      </span>
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
    this.onDelete = this.onDelete.bind(this);
  }

  onSearch(value) {
    // todo
  }

  onDelete(record) {
    console.log(record.id)
    this.props.dispatch({ type: 'achievement/delete', payload: record.id });
  }

  render() {
    const columns = getColumns(this.props.filters, {
      onDelete: this.onDelete
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
