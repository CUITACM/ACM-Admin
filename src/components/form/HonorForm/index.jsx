import React, { PropTypes } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { HonorLevel } from 'models/honor';

const FormItem = Form.Item;
const Option = Select.Option;

class HonorForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    honor: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        console.log(params);
      }
    });
  }

  render() {
    const { honor } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const contestNameDecorator = getFieldDecorator('contest_name', {
      initialValue: honor && honor.contest_name,
      rules: [
        { required: true, message: '请输入比赛名称' }
      ]
    });
    const contestLevelDecorator = getFieldDecorator('contest_level', {
      initialValue: honor && honor.contest_level,
      rules: [
        { required: true, message: '请选择比赛等级' }
      ]
    });
    const teamNameDecorator = getFieldDecorator('team_name', {
      initialValue: honor && honor.team_name
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: honor && honor.description
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="比赛名称">
          {contestNameDecorator(
            <Input size="default" placeholder="比赛名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="OJ">
          {contestLevelDecorator(
            <Select placeholder="请选择比赛等级">
              {Object.keys(HonorLevel).map(key =>
                <Option key={key} value={key}>{HonorLevel[key]}</Option>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="队伍名">
          {teamNameDecorator(
            <Input size="default" placeholder="队伍名" />
          )}
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

export default Form.create()(HonorForm);
