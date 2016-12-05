import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { createArticle } from 'actions/entity/article';
import ArticleForm from 'components/form/ArticleForm';

class ArticleCreate extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmitArticle = (params) => {
      this.props.createArticle(params);
    };
  }

  componentWillReceiveProps(nextProps) {
    const { waitCreate, createSuccess, createErrors } = nextProps;
    if (createErrors && createErrors !== this.props.createErrors) {
      notification.success({
        message: '创建失败',
      });
    }
    if (!waitCreate && createSuccess) {
      notification.success({
        message: '创建成功',
      });
      this.context.router.replace('/admin/articles');
    }
  }

  render() {
    return (
      <ArticleForm onSubmit={this.onSubmitArticle} />
    );
  }
}

ArticleCreate.contextTypes = {
  router: PropTypes.object.isRequired
};

ArticleCreate.propTypes = {
  waitCreate: PropTypes.bool.isRequired,
  createSuccess: PropTypes.bool.isRequired,
  createErrors: PropTypes.string,
  createArticle: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const articleState = state.entity.article;
  return {
    waitCreate: articleState.waitCreate,
    createSuccess: articleState.createSuccess,
    createErrors: articleState.createErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createArticle: bindActionCreators(createArticle, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate);
