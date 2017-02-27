import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

const FormItem = Form.Item;

class AchievementForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    achievement: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { achievement } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const nameDecorator = getFieldDecorator('name', {
      initialValue: achievement && achievement.name,
      rules: [
        { required: true, message: '请输入成就名称' }
      ]
    });
    const scoreDecorator = getFieldDecorator('score', {
      initialValue: (achievement && achievement.score) || 1,
      rules: [
        { required: true, message: '请输入成就点' }
      ]
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: achievement && achievement.description
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="成就名称">
          {nameDecorator(
            <Input size="default" placeholder="成就名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="成就点">
          {scoreDecorator(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text">分</span>
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {descriptionDecorator(
            <Input type="textarea" placeholder="描述" autosize={{ minRows: 4, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" onClick={e => this.onSubmit(e)}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AchievementForm);
