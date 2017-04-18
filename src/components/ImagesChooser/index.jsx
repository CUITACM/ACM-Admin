import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin, Pagination } from 'antd';
import { connect } from 'dva';
import { joinCDN } from 'src/config';
import './style.less';

class ImagesChooser extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    filters: PropTypes.object,
    pagination: PropTypes.object,
    onChoose: PropTypes.func.isRequired,
  }

  static fetchImages(props, page = 1) {
    props.dispatch({
      type: 'resource/fetchList',
      payload: { page },
    });
  }

  componentDidMount() {
    ImagesChooser.fetchImages(this.props);
  }

  renderResourceList() {
    return this.props.list.map(data => (
      <Col key={data.id} span={6}>
        <div className="image-item" onClick={() => this.props.onChoose(data.path.origin)}>
          <img alt={data.filename} src={joinCDN(data.path.thumb)} />
          <p className="image-name">{data.filename}</p>
        </div>
      </Col>
    ));
  }

  render() {
    const paginationProps = {
      ...this.props.pagination,
      onChange: page => ImagesChooser.fetchImages(this.props, page),
      showTotal: total => `共${total}条`
    };
    return (
      <div className="images-chooser">
        <Spin tip="加载中..." spinning={this.props.loading}>
          <Row>
            {this.renderResourceList()}
          </Row>
          <div className="page-row">
            <Pagination {...paginationProps} />
          </div>
        </Spin>
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

export default connect(mapStateToProps)(ImagesChooser);
