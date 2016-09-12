import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';
import { ArticleType, ArticleStatus } from 'constants/article';
import MarkdownInput from 'components/MarkdownInput';

const FormItem = Form.Item;

class ArticleForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentValue: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDraft = this.onSubmitDraft.bind(this);
    this.onContentChange = (value) => {
      this.setState({ contentValue: value });
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        const { article } = this.props;
        this.props.onSubmit({
          ...params,
          article_type: ArticleType.NEWS,
          status: ArticleStatus.PUBLISH,
          content: this.state.contentValue
        }, article && article.id);
      }
    });
  }

  onSubmitDraft() {
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        const { article } = this.props;
        this.props.onSubmit({
          ...params,
          article_type: ArticleType.NEWS,
          status: ArticleStatus.DRAFT,
          content: this.state.contentValue
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
        <FormItem {...formItemLayout} label="正文">
          <MarkdownInput
            initialValue={article && article.content}
            onChange={this.onContentChange}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 4 }} >
          <Button type="primary" htmlType="submit">发布</Button>
          <Button type="ghost" onClick={this.onSubmitDraft}>存到草稿</Button>
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
