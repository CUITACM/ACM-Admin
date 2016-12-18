import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import ArticleForm from 'components/form/ArticleForm';

class ArticleEdit extends React.PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmitArticle = (params, id) => {
    };
  }

  render() {
    const { article } = this.props;
    return (
      <ArticleForm onSubmit={this.onSubmitArticle} article={article} />
    );
  }
}


const mapStateToProps = ({ article }) => ({
  article: article.currentItem,
});

export default connect(mapStateToProps)(ArticleEdit);
