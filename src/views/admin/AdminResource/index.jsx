import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row, Col, Card, Button, Popconfirm, Spin,
  Pagination, Modal, message
} from 'antd';
import { withApiRoot } from 'helpers/utils';
import { ResourceUsage, ResourceUsageHuman } from 'constants/resource';
import * as resourceActions from 'actions/entity/resource';
import SearchInput from 'components/SearchInput';
import UploadForm from 'components/form/UploadForm';
import './style.less';

class AdminResource extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      searchKey: ''
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchResources();
  }

  onImageUpload(params) {
    return resourceActions.createResource(params)
      .then(response => {
        if (response.error_code === 0) {
          return response;
        } else if (response.error_code === 2) {
          throw new Error('上传文件已存在');
        }
        throw new Error('上传失败');
      })
      .then(response => {
        console.log(response);
        this.setState({ showModal: false });
        this.props.fetchResources();
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
      });
  }

  onDelete(id) {
    resourceActions.deleteResource(id)
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
        <div style={{ padding: '5px' }}>
          <Card bodyStyle={{ padding: '0' }}>
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
          </Card>
        </div>
      </Col>
    ));
  }

  render() {
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button
            type="primary"
            onClick={() => this.setState({ showModal: true })}
          >
            上传图片
          </Button>
          <div className="pull-right">
            <SearchInput onSearch={this.onSearch} style={{ width: 200 }} />
          </div>
        </div>
        <Spin tip="加载中..." spinning={this.props.loading}>
          <Row>
            {this.renderResourceList()}
          </Row>
        </Spin>
        <div className="page-row">
          <Pagination total={50} showTotal={total => `共${total}条`} />
        </div>
        <Modal
          title="图片上传" visible={this.state.showModal} footer={null}
          onCancel={() => this.setState({ showModal: false })}
        >
          <UploadForm
            usage={ResourceUsage.OTHER}
            onSubmit={this.onImageUpload}
          />
        </Modal>
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
