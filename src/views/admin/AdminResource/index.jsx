import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Popconfirm, message } from 'antd';
import SearchInput from 'components/SearchInput';
import * as resourceActions from 'actions/entity/resource';
import './style.less';

const getColumns = (operations) => (
  [{
    title: '标题',
    dataIndex: 'title',
    sorter: true,
    width: '15%'
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    sorter: true,
    width: '15%'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Link to={`/admin/articles/edit/${record.id}`}>修改</Link>
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

class AdminResource extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchResources();
  }

  onDelete(record) {
    articleActions.deleteArticle(record.id)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((response) => {
        if (response.error_code === 0) {
          message.success('删除成功');
          this.props.fetchResources();
        }
      });
  }

  onSearch(value) {
    const { pagination } = this.props;
    this.setState({ searchKey: value });
    this.props.fetchResources({
      page: pagination.current,
      per: pagination.pageSize,
      search: value
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const params = {
      page: pagination.current,
      per: pagination.pageSize,
      search: this.state.searchKey
    };
    if (sorter && sorter.field) {
      params.sort_field = sorter.field;
      params.sort_order = sorter.order;
    }
    console.log(filters);
    this.props.fetchResources({
      ...params,
      filters
    });
  }

  render() {
    const columns = getColumns({
      onDelete: this.onDelete
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button
            type="primary"
            onClick={() => this.context.router.push('/admin/articles/create')}
          >
            发布新闻
          </Button>
          <div className="pull-right">
            <SearchInput onSearch={this.onSearch} style={{ width: 200 }} />
          </div>
        </div>
        <Table
          bordered size="small"
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          columns={columns} dataSource={this.props.resources}
          pagination={this.props.pagination} loading={this.props.loading}
        />
      </div>
    );
  }
}

AdminResource.contextTypes = {
  router: PropTypes.object.isRequired
};

AdminResource.propTypes = {
  resources: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchResources: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const resourceState = state.entity.resource;
  return {
    resources: resourceState.data || [],
    pagination: {
      total: resourceState.pagination.total_count,
      current: resourceState.pagination.current_page,
      pageSize: resourceState.pageSize
    },
    loading: resourceState.waitFetch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResources: bindActionCreators(resourceActions.fetchResources, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminResource);
