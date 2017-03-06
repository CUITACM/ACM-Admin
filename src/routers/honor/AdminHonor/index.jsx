import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Table, Button, Popconfirm } from 'antd';
import SearchInput from 'components/SearchInput';
import { HonorLevel } from 'models/honor';

const getColumns = (filters, sorter, operations) => (
  [{
    title: '比赛名称',
    dataIndex: 'contest_name',
    width: '20%',
    sorter: true,
    sortOrder: sorter.field === 'contest_name' && sorter.order,
    render: contestName => <b>{contestName}</b>
  }, {
    title: '比赛等级',
    dataIndex: 'contest_level',
    width: '10%',
    render: level => HonorLevel[level]
  }, {
    title: '队伍名',
    dataIndex: 'team_name',
    width: '10%'
  }, {
    title: '描述',
    dataIndex: 'description',
    width: '20%'
  }, {
    title: '创建/更新时间',
    dataIndex: 'created_at',
    width: '20%',
    render: (createdAt, record) => (
      <div>
        创建: {createdAt}<br />
        更新: {record.updated_at}
      </div>
    )
  }, {
    title: '操作',
    width: '10%',
    render: (_, record) => (
      <div>
        <Link to={`/admin/honors/edit/${record.id}`}>修改</Link>
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" placement="left"
          onConfirm={() => operations.onDelete(record)}
        >
          <a>删除</a>
        </Popconfirm>
      </div>
    )
  }]
);

class AdminHonor extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    sorter: PropTypes.object,
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

  handleTableChange() {
    // todo
  }

  render() {
    const columns = getColumns(this.props.filters, this.props.sorter, {
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button type="primary" >
            <Link to="/admin/honors/create">发布新荣誉</Link>
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

const mapStateToProps = ({ loading, honor }) => ({
  loading: loading.models.honor || false,
  list: honor.list,
  filters: honor.filters,
  sorter: {
    order: honor.sortOrder,
    field: honor.sortField,
  },
  pagination: {
    current: honor.page,
    pageSize: honor.per,
    total: honor.totalCount
  }
});

export default connect(mapStateToProps)(AdminHonor);
