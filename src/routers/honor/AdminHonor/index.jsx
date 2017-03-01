import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Button } from 'antd';
import SearchInput from 'components/SearchInput';

const getColumns = (filters, operations) => (
  []
);

class AdminHonor extends React.PureComponent {
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
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(value) {
    // todo
  }

  handleTableChange() {
    // todo
  }

  render() {
    const columns = getColumns(this.props.filters, {
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
      </div>
    );
  }
}

const mapStateToProps = ({ loading, honor }) => ({
  loading: loading.models.honor || false,
  list: honor.list,
  filters: honor.filters,
  pagination: {
    current: honor.page,
    pageSize: honor.per,
    total: honor.totalCount
  }
});

export default connect(mapStateToProps)(AdminHonor);
