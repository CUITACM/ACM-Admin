import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import * as adminUserActions from 'actions/admin/user';
import './style.less';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  width: '20%'
}, {
  title: '性别',
  dataIndex: 'gender',
  render: isMale => (isMale ? '男' : '女'),
  width: '20%'
}, {
  title: '邮箱',
  dataIndex: 'email',
  sorter: true
}];

class AdminUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {}
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, sorter, filters);
    const params = {
      page: pagination.current,
      per: pagination.pageSize
    };
    if (sorter && sorter.field) {
      params.sort_field = sorter.field;
      params.sort_order = sorter.order;
    }
    this.props.fetchUsers({
      ...params,
      filters
    });
  }

  render() {
    return (
      <Table
        bordered
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.props.users}
        pagination={this.state.pagination}
        loading={this.props.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

AdminUser.propTypes = {
  users: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const userState = state.admin.user;
  return {
    users: userState.data || [],
    pagination: {
      total: userState.pagination.total_count,
      current: userState.pagination.current_page,
      pageSize: userState.pageSize
    },
    loading: userState.waitFetch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: bindActionCreators(adminUserActions.fetchUsers, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
