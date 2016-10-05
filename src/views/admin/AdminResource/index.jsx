import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Popconfirm, message } from 'antd';
import { withApiRoot } from 'helpers/utils';
import { ResourceUsageHuman } from 'constants/resource';
import * as resourceActions from 'actions/entity/resource';
import SearchInput from 'components/SearchInput';
import './style.less';

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

  onDelete(id) {
    resourceActions.deleteResource(id)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error('删除失败');
      })
      .then(response => {
        if (response.error_code === 0) {
          message.success('删除成功');
          this.props.fetchResources();
        } else {
          throw new Error('删除失败');
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
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

  renderResourceList() {
    return this.props.resources.map(data => (
      <Col key={data.id} xs={24} sm={8} md={8} lg={6}>
        <Card bodyStyle={{ padding: '15px' }}>
          <div className="card-content">
            <div className="card-preview">
              <img alt={data.filename} src={withApiRoot(data.file.thumb)} />
            </div>
            <aside className="card-details">
              <p className="card-id">{data.filename}</p>
              <p>用途: {ResourceUsageHuman[data.usage]}</p>
              <p>大小: {data.file_size}</p>
            </aside>
            <div className="card-operations">
              <Popconfirm
                title="确定要删除吗？" placement="right"
                onConfirm={() => this.onDelete(data.id)}
              >
                <Button size="small" icon="delete">删除</Button>
              </Popconfirm>
            </div>
          </div>
        </Card>
      </Col>
    ));
  }

  render() {
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button
            type="primary"
            onClick={() => this.context.router.push('/admin/articles/create')}
          >
            上传图片
          </Button>
          <div className="pull-right">
            <SearchInput onSearch={this.onSearch} style={{ width: 200 }} />
          </div>
        </div>
        <Row>
          {this.renderResourceList()}
        </Row>
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
    resources: resourceState.datas || [],
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
