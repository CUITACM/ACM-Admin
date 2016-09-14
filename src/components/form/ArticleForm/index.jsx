import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';
import { ArticleType, ArticleStatus } from 'constants/article';
import TagInput from 'components/TagInput';
import MarkdownInput from 'components/MarkdownInput';

const FormItem = Form.Item;

class ArticleForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      contentValue: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onContentChange = (value) => {
      this.setState({ contentValue: value });
    };
  }

  onSubmit(e, isDraft = false) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        const { article } = this.props;
        this.props.onSubmit({
          ...params,
          article_type: ArticleType.NEWS,
          status: isDraft ? ArticleStatus.DRAFT : ArticleStatus.PUBLISH,
          content: this.state.contentValue || article.content,
          tags: this.state.tags || article.tags
        }, article && article.id);
      }
    });
  }

  render() {
    const { article } = this.props;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const titleProps = getFieldProps('title', {
      initialValue: article && article.title,
      rules: [
        { required: true, message: '请填写新闻标题' }
      ]
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="标题">
          <Input size="default" placeholder="标题" {...titleProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="标签">
          <TagInput
            initTags={article && article.tags}
            onChange={tags => this.setState({ tags })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="正文">
          <MarkdownInput
            initialValue={article && article.content}
            onChange={this.onContentChange}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 4 }} >
          <Button type="primary" htmlType="submit">发布</Button>
          <Button type="ghost" onClick={e => this.onSubmit(e, true)}>存到草稿</Button>
        </FormItem>
      </Form>
    );
  }
}

ArticleForm.propTypes = {
  form: PropTypes.object.isRequired,
  article: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onSubmitDraft: PropTypes.func
};

export default Form.create()(ArticleForm);
