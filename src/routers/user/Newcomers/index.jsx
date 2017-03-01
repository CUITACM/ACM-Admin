import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Tag, Popconfirm } from 'antd';
import { CDN_ROOT } from 'src/config';
import SearchInput from 'components/SearchInput';
import { UserRole, UserStatus } from 'models/user';
import './style.less';

const getColumns = (filters, operations) => (
  [{
    title: '姓名',
    dataIndex: 'display_name',
    sorter: true,
    width: '100px',
    className: 'text-center',
    render: (name, record) => (
      <div>
        <h3>{ name }</h3>
        <Tag color="blue-inverse">{ record.nickname }</Tag>
      </div>
    ),
  }, {
    title: '性别',
    dataIndex: 'gender',
    width: '60px',
    className: 'text-center',
    filters: [
      { text: '男', value: 1 },
      { text: '女', value: 0 }
    ],
    filteredValue: filters.gender || [],
    render: isMale => (isMale ? '男' : '女')
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '90px',
    filters: [
    ],
    filteredValue: filters.status || [],
    render: (status) => (
      <div>
        {status === UserStatus.APPLY ? <Tag color="green">排队中</Tag> : null}
        {status === UserStatus.REJECT ? <Tag color="red">拒绝</Tag> : null}
      </div>
    )
  }, {
    title: '基本信息',
    key: 'description',
    width: '40%',
  }, {
    title: '申请时间',
    dataIndex: 'created_at'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Popconfirm
          title="确定要通过申请吗？" placement="left"
          onConfirm={() => operations.on(record)}
        >
          <a>通过申请</a>
        </Popconfirm>
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" placement="left"
          onConfirm={() => operations.onDelete(record)}
        >
          <a>拒绝</a>
        </Popconfirm>
      </span>
    ),
  }]
);

class Newcomers extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    pagination: PropTypes.object,
    filters: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/users/newcomers',
      query: { ...this.props.location.query, search: value }
    }));
  }

  onDelete(record) {
    console.log('onDelete');
    this.props.dispatch({
      type: 'user/delete',
      payload: {
        id: record.id,
        redirect: { pathname: '/admin/users/newcomers', query: this.props.location.query }
      }
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const params = {
      page: pagination.current,
      filters: JSON.stringify(filters)
    };
    if (sorter && sorter.field) {
      params.sortField = sorter.field;
      params.sortOrder = sorter.order;
    }
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/users/newcomers',
      query: { ...this.props.location.query, ...params }
    }));
  }

  render() {
    const { search } = this.props.location.query;
    const columns = getColumns(this.props.filters, {
      onDelete: this.onDelete,
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <div className="pull-right">
            <SearchInput
              placeholder={search || '搜索'}
              onSearch={this.onSearch} style={{ width: 200 }}
            />
          </div>
        </div>
        <Table
          bordered size="small"
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          columns={columns} dataSource={this.props.list}
          pagination={this.props.pagination} loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.models.user || false,
  list: user.list,
  filters: user.filters,
  pagination: {
    current: user.page,
    pageSize: user.per,
    total: user.totalCount
  },
});

export default connect(mapStateToProps)(Newcomers);
