import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Tag, Icon, Button } from 'antd';
import StatusPoint from 'components/StatusPoint';
import SearchInput from 'components/SearchInput';
import * as articleActions from 'actions/entity/article';
import { ArticleStatus, ArticleType } from 'constants/article';
import './style.less';

const columns = [{
  title: '标题',
  dataIndex: 'title',
  sorter: true,
  width: '15%'
}, {
  title: '状态',
  dataIndex: 'status',
  width: '8%',
  filters: [
    { text: '回收站', value: ArticleStatus.RECYCLE },
    { text: '草稿', value: ArticleStatus.DRAFT },
    { text: '发布', value: ArticleStatus.PUBLISH },
    { text: '置顶', value: ArticleStatus.PINNED }
  ],
  render: status => {
    switch (status) {
      case 0:
        return <StatusPoint>回收站</StatusPoint>;
      case 1:
        return <StatusPoint color="light-blue">草稿</StatusPoint>;
      case 2:
        return <StatusPoint color="green">发布</StatusPoint>;
      case 3:
        return <StatusPoint color="red">置顶</StatusPoint>;
      default:
        return null;
    }
  }
}, {
  title: '类型',
  dataIndex: 'article_type',
  width: '10%',
  filters: [
    { text: '新闻', value: ArticleType.NEWS },
    { text: '解题报告', value: ArticleType.SOLUTION }
  ],
  render: type => {
    switch (type) {
      case 'News':
        return <Tag color="blue">新闻</Tag>;
      case 'Solution':
        return <Tag color="green">解题报告</Tag>;
      default:
        return null;
    }
  }
}, {
  title: '作者',
  dataIndex: 'user.name',
  width: '8%',
}, {
  title: '创建时间',
  dataIndex: 'created_at',
  sorter: true,
  width: '15%',
}, {
  title: '正文',
  dataIndex: 'content'
}, {
  title: '操作',
  key: 'operation',
  render: (text, record) => (
    <span>
      <Link to={`/admin/articles/edit/${record.id}`}>修改</Link>
      <span className="ant-divider" />
      <a className="ant-dropdown-link">
        更多 <Icon type="down" />
      </a>
    </span>
  ),
}];

class AdminArtcile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  onSearch(value) {
    const { pagination } = this.props;
    this.setState({ searchKey: value });
    this.props.fetchArticles({
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
    this.props.fetchArticles({
      ...params,
      filters
    });
  }

  render() {
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
          bordered
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          columns={columns} dataSource={this.props.articles}
          pagination={this.props.pagination} loading={this.props.loading}
        />
      </div>
    );
  }
}

AdminArtcile.contextTypes = {
  router: PropTypes.object.isRequired
};

AdminArtcile.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const articleState = state.entity.article;
  return {
    articles: articleState.data || [],
    pagination: {
      total: articleState.pagination.total_count,
      current: articleState.pagination.current_page,
      pageSize: articleState.pageSize
    },
    loading: articleState.waitFetch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: bindActionCreators(articleActions.fetchArticles, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminArtcile);
