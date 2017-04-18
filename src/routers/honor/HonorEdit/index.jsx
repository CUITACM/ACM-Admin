import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import HonorForm from 'components/form/HonorForm';

class HonorEdit extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    honor: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(id, params, images) {
    console.log(id, params);
    const { dispatch } = this.props;
    if (id == null) {
      dispatch({ type: 'honor/create', payload: { params, images, goback: true } });
    } else {
      dispatch({ type: 'honor/update', payload: { id, params, images, goback: true } });
    }
  }

  render() {
    const { honor } = this.props;
    return (
      <div className="edit-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin/main"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/admin/honors">
              <Icon type="list" /> 荣誉列表
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>发布新荣誉</Breadcrumb.Item>
        </Breadcrumb>
        <HonorForm onSubmit={this.onSubmit} honor={honor} />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, honor }) => ({
  loading: loading.global,
  honor: honor.currentItem,
});

export default connect(mapStateToProps)(HonorEdit);
