import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import * as adminArticleActions from 'actions/admin/article';
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
  sorter: true
}];

class AdminArtcile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {}
    };
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
        pagination={this.state.pagination}
        loading={this.props.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

AdminArtcile.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const articleState = state.admin.article;
  return {
    articles: articleState.data || [],
    pagination: {
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
