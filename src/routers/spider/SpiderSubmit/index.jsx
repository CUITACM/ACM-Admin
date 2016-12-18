import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table } from 'antd';
import SearchInput from 'components/SearchInput';
import { OJ_MAP } from 'models/account';

const getColumns = (filters, operations) => (
  [{
    title: '用户名',
    dataIndex: 'user_name',
    sorter: true,
    width: '10%',
    className: 'text-center',
  }, {
    title: 'Run ID',
    dataIndex: 'run_id',
    width: '12%',
  }, {
    title: 'OJ',
    dataIndex: 'oj_name',
    width: '10%',
    filters: Object.keys(OJ_MAP).map(oj => (
      { text: OJ_MAP[oj], value: oj }
    )),
    filteredValue: filters.oj_name || [],
    render: oj => <span>{OJ_MAP[oj]}</span>,
  }, {
    title: '题目',
    dataIndex: 'pro_id',
    width: '10%'
  }, {
    title: '语言',
    dataIndex: 'lang',
    width: '10%',
  }, {
    title: '运行时间',
    dataIndex: 'run_time',
    sorter: true,
    width: '10%',
    render: time => (time < 0 ? null : <span>{time} MS</span>),
  }, {
    title: '内存',
    dataIndex: 'memory',
    sorter: true,
    width: '10%',
    render: memory => (memory < 0 ? null : <span>{memory} KB</span>),
  }, {
    title: '提交时间',
    dataIndex: 'submitted_at',
    sorter: true,
    width: '20%'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Link>代码</Link>
      </span>
    ),
  }]
);

class SpiderSubmit extends React.PureComponent {
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
    this.onSearch = this.onSearch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/spiders/submits',
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
      pathname: '/admin/spiders/submits',
      query: { ...this.props.location.query, ...params }
    }));
  }

  render() {
    const columns = getColumns(this.props.filters, {});
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
      </div>
    );
  }
}

const mapStateToProps = ({ loading, submit }) => ({
  loading: loading.models.submit,
  list: submit.list,
  filters: submit.filters,
  pagination: {
    current: submit.page,
    pageSize: submit.per,
    total: submit.totalCount,
    showQuickJumper: true,
    showTotal: total => <span>共有 {total} 条提交</span>,
  }
});

export default connect(mapStateToProps)(SpiderSubmit);
