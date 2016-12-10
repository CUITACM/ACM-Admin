import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Tag } from 'antd';
import { CDN_ROOT } from 'src/config';
import SearchInput from 'components/SearchInput';
import './style.less';

const columns = [{
  title: '头像',
  dataIndex: 'avatar',
  width: '70px',
  render: avatar => <img alt="avatar" src={CDN_ROOT + avatar.thumb} />
}, {
  title: '姓名',
  dataIndex: 'display_name',
  sorter: true,
  width: '10%',
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
  render: isMale => (isMale ? '男' : '女'),
  width: '5%',
  className: 'text-center'
}, {
  title: '身份',
  dataIndex: 'role',
  width: '15%',
  render: (role) => {
    const isStudent = role & 1;
    const isCoach = role & 2;
    const isAdmin = role & 4;
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
  dataIndex: 'email',
  width: '18%'
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
}];

class AdminUser extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    pagination: PropTypes.object,
    query: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/users',
      query: { ...this.props.query, search: value }
    }));
  }

  handleTableChange(pagination, filters, sorter) {
    const params = {
      page: pagination.current,
    };
    if (sorter && sorter.field) {
      params.sortField = sorter.field;
      params.sortOrder = sorter.order;
    }
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/users',
      query: { ...this.props.query, ...params }
    }));
  }

  render() {
    const { search } = this.props.query;
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

const mapStateToProps = state => ({
  loading: state.loading.models.user,
  list: state.user.list,
  pagination: {
    current: state.user.page,
    pageSize: state.user.per,
    total: state.user.totalCount
  },
  query: {
    page: state.user.page,
    search: state.user.search,
    sortField: state.user.sortField,
    sortOrder: state.user.sortOrder,
  }
});

export default connect(mapStateToProps)(AdminUser);
