import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row, Col, Card, Button, Popconfirm, Spin,
  Pagination, Modal, message
} from 'antd';
import SearchInput from 'components/SearchInput';
import UploadForm from 'components/form/UploadForm';
import { ResourceUsage, ResourceUsageHuman } from 'models/resource';
import { createResource } from 'services/resource';
import { joinCDN } from 'src/config';
import './style.less';

class AdminResource extends React.PureComponent {
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
      showModal: false,
      showPictureModal: false,
      activeRecord: null,
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onPreview = this.onPreview.bind(this);
  }

  onImageUpload(params) {
    return createResource(params)
      .then(response => {
        if (response.meta && response.meta.error_code === 0) {
          return response;
        } else if (response.error_code === 2) {
          throw new Error('文件名已存在');
        }
        throw new Error('上传失败');
      })
      .then(response => {
        const newResource = response.resource;
        this.props.dispatch({ type: 'resource/createSuccess', payload: newResource });
        this.setState({ showModal: false });
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
      });
  }

  onDelete(id) {
    this.props.dispatch({ type: 'resource/delete', payload: id });
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/resources',
      query: { ...this.props.location.query, search: value }
    }));
  }

  onPreview(picture) {
    this.setState({ showPictureModal: true, activeRecord: picture });
  }

  onPageChange(page) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/resources',
      query: { ...this.props.location.query, page }
    }));
  }

  renderResourceList() {
    return this.props.list.map(data => (
      <Col key={data.id} xs={24} sm={8} md={8} lg={8}>
        <div style={{ padding: '5px' }}>
          <Card bodyStyle={{ padding: '0' }}>
            <div className="card-preview">
              <img alt={data.filename} src={joinCDN(data.path.thumb)} />
            </div>
            <aside className="card-details">
              <p className="card-id">{data.filename}</p>
              <p>用途: {ResourceUsageHuman[data.usage]}</p>
              <p>大小: {data.file_size}</p>
            </aside>
            <div className="card-operations">
              <Button.Group>
                <Popconfirm
                  title="确定要删除吗？" placement="right"
                  onConfirm={() => this.onDelete(data.id)}
                >
                  <Button size="small" icon="delete">删除</Button>
                </Popconfirm>
                <Button size="small" icon="picture" onClick={() => this.onPreview(data)}>
                  查看大图
                </Button>
              </Button.Group>
            </div>
          </Card>
        </div>
      </Col>
    ));
  }

  render() {
    const paginationProps = {
      ...this.props.pagination,
      onChange: this.onPageChange,
      showTotal: total => `共${total}条`
    };
    const { showModal, showPictureModal, activeRecord } = this.state;
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
          <Pagination {...paginationProps} />
        </div>
        <Modal
          title="图片上传" visible={showModal} footer={null}
          onCancel={() => this.setState({ showModal: false })}
        >
          <UploadForm
            usage={ResourceUsage.OTHER}
            onSubmit={this.onImageUpload}
          />
        </Modal>
        <Modal
          closable maskClosable
          title="查看大图" visible={showPictureModal} footer={null}
          style={{ top: 20 }} height={180}
          onCancel={() => this.setState({ showPictureModal: false })}
        >
          {activeRecord ? (
            <img alt={activeRecord.filename} src={joinCDN(activeRecord.path.origin)} />
          ) : null}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, resource }) => ({
  loading: loading.models.resource,
  list: resource.list,
  filters: resource.filters,
  pagination: {
    current: resource.page,
    pageSize: resource.per,
    total: resource.totalCount
  }
});

export default connect(mapStateToProps)(AdminResource);
