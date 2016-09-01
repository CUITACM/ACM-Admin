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
  width: '20%',
}, {
  title: '性别',
  dataIndex: 'gender',
  render: isMale => (isMale ? '男' : '女'),
  width: '20%',
}, {
  title: '邮箱',
  dataIndex: 'email',
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
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  render() {
    return (
      <Table
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
  loading: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.admin.user.data || [],
    loading: state.admin.user.waitFetch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: bindActionCreators(adminUserActions.fetchUsers, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
