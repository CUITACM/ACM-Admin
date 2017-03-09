import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Button, Popconfirm, Tag, Modal } from 'antd';
import SearchInput from 'components/SearchInput';
import { HonorLevel } from 'models/honor';
import { translateTextarea } from 'src/utils';
import { joinCDN } from 'src/config';
import './style.less';

const getColumns = (filters, sorter, operations) => (
  [{
    title: '比赛名称',
    dataIndex: 'contest_name',
    width: '20%',
    className: 'text-center',
    sorter: true,
    sortOrder: sorter.field === 'contest_name' && sorter.order,
    render: (contestName, record) => (
      <div>
        <b>{contestName}</b><br />
        <Tag>{record.team_name || '未知'}</Tag>
      </div>
    )
  }, {
    title: '比赛等级',
    dataIndex: 'contest_level',
    width: '10%',
    render: level => HonorLevel[level]
  }, {
    title: '队伍名',
    dataIndex: 'team_name',
    width: '10%'
  }, {
    title: '创建/更新时间',
    dataIndex: 'created_at',
    width: '20%',
    render: (createdAt, record) => (
      <div>
        创建: {createdAt}<br />
        更新: {record.updated_at}
      </div>
    )
  }, {
    title: '操作',
    width: '10%',
    render: (_, record) => (
      <div>
        <a onClick={e => operations.onPreview(e, record)}>预览</a>
        <span className="ant-divider" />
        <Link to={`/admin/honors/edit/${record.id}`}>修改</Link>
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除吗？" placement="left"
          onConfirm={() => operations.onDelete(record)}
        >
          <a>删除</a>
        </Popconfirm>
      </div>
    )
  }]
);

class AdminHonor extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    sorter: PropTypes.object,
    filters: PropTypes.object,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showPreviewModal: false,
      activeRecord: null,
    };
    this.onDelete = this.onDelete.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onDelete(record) {
    this.props.dispatch({ type: 'honor/delete', payload: record.id });
  }

  onPreview(e, record) {
    e.preventDefault();
    this.setState({ showPreviewModal: true, activeRecord: record });
  }

  onSearch(value) {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/honors/list',
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
      pathname: '/admin/honors/list',
      query: { ...this.props.location.query, ...params }
    }));
  }

  renderPreviewModal() {
    const { showPreviewModal, activeRecord } = this.state;
    return (
      <Modal
        closable maskClosable title="预览"
        visible={showPreviewModal} footer={null}
        style={{ top: 20 }} width={640}
        onCancel={() => this.setState({ showPreviewModal: false })}
      >
        {activeRecord ? (
          <div>
            <h5>描述</h5>
            <article
              className="honor-description"
              dangerouslySetInnerHTML={{ __html: translateTextarea(activeRecord.description) }}
            />
            <hr />
            <h5>图片资料</h5>
            <div className="honor-images">
              {activeRecord.images.map(image =>
                <img key={image.origin} role="presentation" src={joinCDN(image.origin)} />
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    );
  }

  render() {
    const columns = getColumns(this.props.filters, this.props.sorter, {
      onPreview: this.onPreview,
      onDelete: this.onDelete,
    });
    return (
      <div>
        <div className="table-operations clear-fix">
          <Button type="primary" >
            <Link to="/admin/honors/create">发布新荣誉</Link>
          </Button>
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
        {this.renderPreviewModal()}
      </div>
    );
  }
}

const mapStateToProps = ({ loading, honor }) => ({
  loading: loading.models.honor || false,
  list: honor.list,
  filters: honor.filters,
  sorter: {
    order: honor.sortOrder,
    field: honor.sortField,
  },
  pagination: {
    current: honor.page,
    pageSize: honor.per,
    total: honor.totalCount
  }
});

export default connect(mapStateToProps)(AdminHonor);
