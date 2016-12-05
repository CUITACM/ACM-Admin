import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import * as articleActions from 'actions/entity/article';
import ArticleForm from 'components/form/ArticleForm';

class ArticleEdit extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      beginSubmit: false
    };
    this.onSubmitArticle = (params, id) => {
      this.setState({ beginSubmit: true });
      this.props.articleActions.updateArticle(params, id);
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.articleActions.fetchOneArticle(id);
  }

  componentWillReceiveProps(nextProps) {
    const { waitUpdate, updateSuccess, updateErrors } = nextProps;
    if (updateErrors && updateErrors !== this.props.updateErrors) {
      notification.success({
        message: '修改失败',
      });
    }
    if (this.state.beginSubmit && !waitUpdate && updateSuccess) {
      notification.success({
        message: '修改成功',
      });
      this.context.router.replace('/admin/articles');
    }
  }

  render() {
    const { article } = this.props;
    return (
      <ArticleForm onSubmit={this.onSubmitArticle} article={article} />
    );
  }
}

ArticleEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

ArticleEdit.propTypes = {
  params: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  articleActions: PropTypes.object.isRequired,
  waitUpdate: PropTypes.bool.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  updateErrors: PropTypes.string
};

function mapStateToProps(state) {
  const articleState = state.entity.article;
  return {
    article: articleState.one || {},
    waitUpdate: articleState.waitUpdate,
    updateSuccess: articleState.updateSuccess,
    updateErrors: articleState.updateErrors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    articleActions: bindActionCreators(articleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
