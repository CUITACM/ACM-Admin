import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Tag, Button, Popconfirm } from 'antd';
import { CDN_ROOT } from 'src/config';
import SearchInput from 'components/SearchInput';
import './style.less';

const getColumns = (filters) => (
  [{
    title: '头像',
    dataIndex: 'avatar',
    width: '70px',
    render: avatar => <img alt="avatar" src={CDN_ROOT + avatar.thumb} />
  }, {
    title: '姓名',
    dataIndex: 'display_name',
    sorter: true,
    width: '100px',
    className: 'text-center',
    render: (name, record) => (
      <div>
        <h3>{ name }</h3>
        <Tag color="#108ee9">{ record.nickname }</Tag>
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
    title: '身份',
    dataIndex: 'role',
    width: '90px',
    filters: [
      { text: '管理员', value: 4 },
      { text: '教练', value: 2 },
      { text: '学生', value: 1 },
    ],
    filteredValue: filters.role || [],
    render: (role) => {
      const isStudent = role === 1;
      const isCoach = role === 2;
      const isAdmin = role === 4;
      return (
        <div>
          {isStudent ? <Tag>学生</Tag> : null}
          {isCoach ? <Tag color="#108ee9">教练</Tag> : null}
          {isAdmin ? <Tag color="#f50">管理员</Tag> : null}
        </div>
      );
    }
  }, {
    title: '邮箱',
    dataIndex: 'user_info',
    width: '18%',
    render: (_, record) => (
      <span>{record.user_info.email}</span>
    )
  }, {
    title: '学院专业年级',
    key: 'student_info',
    render: (text, record) => (
      <div>
        {record.school}<br />
        {record.college}<br />
        {record.major} {record.grade}
      </div>
    )
  }, {
    title: '创建时间',
    dataIndex: 'created_at'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Link to={`/admin/users/edit/${record.id}`}>修改</Link>
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" placement="left"
          onConfirm={() => operations.onDelete(record)}
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }]
);

class AdminUser extends React.PureComponent {
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
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/users',
      query: { ...this.props.location.query, search: value }
    }));
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
      pathname: '/admin/users',
      query: { ...this.props.location.query, ...params }
    }));
  }

  render() {
    const { search } = this.props.location.query;
    const columns = getColumns(this.props.filters);
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
  loading: loading.models.user,
  list: user.list,
  filters: user.filters,
  pagination: {
    current: user.page,
    pageSize: user.per,
    total: user.totalCount
  },
});

export default connect(mapStateToProps)(AdminUser);
