import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Tag, Popconfirm, Modal } from 'antd';
import StatusPoint from 'components/StatusPoint';
import SearchInput from 'components/SearchInput';
import AccountForm from 'components/form/AccountForm';
import { AccountStatus, OJ_MAP } from 'models/account';

const getColumns = (filters, operations) => (
  [{
    title: '账号',
    dataIndex: 'nickname',
    sorter: true,
    width: '15%',
    className: 'text-center',
    render: (nickname, record) => (
      <div><h3>{nickname}</h3><Tag>{record.user.name}</Tag></div>
    )
  }, {
    title: 'OJ平台',
    dataIndex: 'oj_name',
    width: '120px',
    className: 'text-center',
    filters: Object.keys(OJ_MAP).map(key => ({ text: OJ_MAP[key], value: key })),
    render: oj => <Tag color="blue-inverse">{OJ_MAP[oj]}</Tag>,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '12%',
    filters: [
      { text: '未初始化', value: AccountStatus.NOT_INIT },
      { text: '正常', value: AccountStatus.NORMAL },
      { text: '排队', value: AccountStatus.QUEUE },
      { text: '更新中', value: AccountStatus.UPDATING },
      { text: '更新错误', value: AccountStatus.UPDATE_ERROR },
      { text: '账号错误', value: AccountStatus.ACCOUNT_ERROR },
      { text: '终止', value: AccountStatus.STOP },
    ],
    render: status => {
      switch (status) {
        case AccountStatus.NOT_INIT:
          return <StatusPoint color="gray">未初始化</StatusPoint>;
        case AccountStatus.NORMAL:
          return <StatusPoint color="green">正常</StatusPoint>;
        case AccountStatus.QUEUE:
          return <StatusPoint color="light-blue">排队</StatusPoint>;
        case AccountStatus.UPDATING:
          return <StatusPoint color="blue">更新中</StatusPoint>;
        case AccountStatus.UPDATE_ERROR:
          return <StatusPoint color="red">更新错误</StatusPoint>;
        case AccountStatus.ACCOUNT_ERROR:
          return <StatusPoint color="red">账号错误</StatusPoint>;
        case AccountStatus.STOP:
          return <StatusPoint color="gray">终止</StatusPoint>;
        default:
          return null;
      }
    },
  }, {
    title: '信息',
    dataIndex: 'solved',
    width: '20%',
    render: (solved, record) => {
      const isRating = ['cf', 'bc'].indexOf(record.oj_name) >= 0;
      return (
        <div>
          {isRating ? 'Rating' : 'Accepted'}: <b>{ solved }</b><br />
          {isRating ? 'MaxRating' : 'Submitted'}: <b>{ record.submitted }</b>
        </div>
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'updated_at',
    sorter: true,
    width: '20%'
  }, {
    title: '操作',
    key: 'operation',
    width: '100px',
    render: (text, record) => (
      <span>
        <Link onClick={() => operations.onEdit(record)}>修改</Link>
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

class SpiderAccount extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    filters: PropTypes.object,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      activeRecord: null,
    };
    this.onSearch = this.onSearch.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/spiders/accounts',
      query: { ...this.props.location.query, search: value }
    }));
  }

  onUpdate(id, params) {
    this.props.dispatch({
      type: 'account/update',
      payload: { id, params },
      callback: () => this.setState({ showEditModal: false })
    });
  }

  onDelete(record) {
    this.props.dispatch({ type: 'account/delete', payload: record.id });
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
      pathname: '/admin/spiders/accounts',
      query: { ...this.props.location.query, ...params }
    }));
  }

  render() {
    const { showEditModal, activeRecord } = this.state;
    const columns = getColumns(this.props.filters, {
      onEdit: (r) => this.setState({ showEditModal: true, activeRecord: r })
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <div className="pull-right">
            <SearchInput onSearch={this.onSearch} style={{ width: 200 }} />
          </div>
        </div>
        <Table
          bordered size="small"
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          columns={columns} dataSource={this.props.list}
          pagination={this.props.pagination} loading={this.props.loading}
        />
        <Modal
          title="账号修改" visible={showEditModal} footer={null}
          onCancel={() => this.setState({ showEditModal: false })}
        >
          <AccountForm account={activeRecord} onSubmit={this.onUpdate} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, account }) => ({
  loading: loading.models.account,
  list: account.list,
  filters: account.filters,
  pagination: {
    current: account.page,
    pageSize: account.per,
    total: account.totalCount,
    showQuickJumper: true,
    showTotal: total => <span>共有 {total} 个OJ账号</span>,
  }
});

export default connect(mapStateToProps)(SpiderAccount);
