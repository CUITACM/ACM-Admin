import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import { HumanArticleType } from 'models/article';
import { toLower } from 'utils';
import ArticleForm from 'components/form/ArticleForm';

class ArticleEdit extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    article: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = (id, params) => {
      this.props.dispatch({
        type: 'article/update',
        payload: { id, params }
      });
    };
  }

  render() {
    const { loading, article } = this.props;
    const articleType = HumanArticleType[article.article_type];
    return (
      <div className="edit-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin/main"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/admin/articles/${toLower(article.article_type)}`}>
              <Icon type="list" /> {articleType}列表
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            编辑{articleType}
          </Breadcrumb.Item>
        </Breadcrumb>
        <ArticleForm loading={loading} onSubmit={this.onSubmit} article={article} />
      </div>
    );
  }
}

const mapStateToProps = ({ loading, article }) => ({
  loading: loading.models.article,
  article: article.currentItem,
});

export default connect(mapStateToProps)(ArticleEdit);
