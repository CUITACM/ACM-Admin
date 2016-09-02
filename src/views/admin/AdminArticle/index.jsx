import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import * as adminArticleActions from 'actions/admin/article';
import './style.less';

const columns = [{
  title: '标题',
  dataIndex: 'title',
  sorter: true
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '类型',
  dataIndex: 'type'
}, {
  title: '正文',
  dataIndex: 'content'
}];

class AdminArtcile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchArticles();
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
    this.props.fetchArticles({
      ...params,
      filters
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.props.articles}
        pagination={this.props.pagination}
        loading={this.props.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

AdminArtcile.propTypes = {
  articles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const articleState = state.admin.article;
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
    fetchArticles: bindActionCreators(adminArticleActions.fetchArticles, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminArtcile);
