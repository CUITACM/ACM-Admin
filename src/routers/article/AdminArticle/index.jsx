import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Tag, Button, Popconfirm } from 'antd';
import StatusPoint from 'components/StatusPoint';
import SearchInput from 'components/SearchInput';
import { ArticleStatus, ArticleType } from 'models/article';
import './style.less';

const getColumns = (operations, filters) => (
  [{
    title: '#',
    dataIndex: 'id',
    sorter: true,
    width: '5%',
  }, {
    title: '标题',
    dataIndex: 'title',
    sorter: true,
    width: '20%',
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '10%',
    filters: [
      { text: '回收站', value: ArticleStatus.RECYCLE },
      { text: '草稿', value: ArticleStatus.DRAFT },
      { text: '发布', value: ArticleStatus.PUBLISH },
      { text: '置顶', value: ArticleStatus.PINNED }
    ],
    filteredValue: filters.status || [],
    render: status => {
      switch (status) {
        case ArticleStatus.RECYCLE:
          return <StatusPoint color="gray">回收站</StatusPoint>;
        case ArticleStatus.DRAFT:
          return <StatusPoint color="light-blue">草稿</StatusPoint>;
        case ArticleStatus.PUBLISH:
          return <StatusPoint color="green">发布</StatusPoint>;
        case ArticleStatus.PINNED:
          return <StatusPoint color="red">置顶</StatusPoint>;
        default:
          return null;
      }
    }
  }, {
    title: '作者',
    dataIndex: 'user.name',
    width: '8%',
  }, {
    title: '更新时间',
    dataIndex: 'updated_at',
    sorter: true,
    width: '18%'
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    sorter: true,
    width: '18%'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        {record.status === ArticleStatus.RECYCLE ? (
          <span>
            <Link to={`/admin/articles/edit/${record.id}`}>还原到草稿箱</Link>
            <span className="ant-divider" />
          </span>
        ) : null}
        {record.status === ArticleStatus.DRAFT ? (
          <span>
            <Link to={`/admin/articles/edit/${record.id}`}>上线发布</Link>
            <span className="ant-divider" />
            <Link to={`/admin/articles/edit/${record.id}`}>置顶</Link>
            <span className="ant-divider" />
          </span>
        ) : null}
        {record.status === ArticleStatus.PUBLISH ? (
          <span>
            <Link to={`/admin/articles/edit/${record.id}`}>置顶</Link>
            <span className="ant-divider" />
            <Link to={`/admin/articles/edit/${record.id}`}>放入草稿箱</Link>
            <span className="ant-divider" />
          </span>
        ) : null}
        {record.status === ArticleStatus.PINNED ? (
          <span>
            <Link to={`/admin/articles/edit/${record.id}`}>取消置顶</Link>
            <span className="ant-divider" />
            <Link to={`/admin/articles/edit/${record.id}`}>放入草稿箱</Link>
            <span className="ant-divider" />
          </span>
        ) : null}
        <Link to={`/admin/articles/edit/${record.id}`}>修改</Link>
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" placement="left"
          onConfirm={() => operations.onDelete(record)}
        >
          <a>删除</a>
        </Popconfirm>
        <span className="ant-divider" />
        <Link to={`/admin/articles/edit/${record.id}`}>预览</Link>
      </span>
    ),
  }]
);

class AdminArticle extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    type: PropTypes.string,
    filters: PropTypes.object,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(record) {
    this.props.dispatch({ type: 'article/delete', payload: record.id });
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: `/admin/articles/${this.props.type}`,
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
      pathname: `/admin/articles/${this.props.type}`,
      query: { ...this.props.location.query, ...params }
    }));
  }

  render() {
    const columns = getColumns({ onDelete: this.onDelete }, this.props.filters);
    return (
      <div>
        <div className="table-operations clear-fix">
          {this.props.type === 'news' ? (
            <Button
              type="primary"
              onClick={() => this.context.router.push('/admin/articles/create')}
            >
              发布新闻
            </Button>
          ) : null}
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

const mapStateToProps = ({ loading, article }) => ({
  loading: loading.models.article,
  list: article.list,
  type: article.type,
  filters: article.filters,
  pagination: {
    current: article.page,
    pageSize: article.per,
    total: article.totalCount
  }
});

export default connect(mapStateToProps)(AdminArticle);
