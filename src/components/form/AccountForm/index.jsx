import React, { PropTypes } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { OJ_MAP } from 'models/account';

const FormItem = Form.Item;
const Option = Select.Option;

class AccountForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    account: PropTypes.object,
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { account } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const ojNameDecorator = getFieldDecorator('oj_name', {
      initialValue: account.oj_name,
      rules: [
        { required: true, message: '请选择OJ' }
      ]
    });
    const nicknameDecorator = getFieldDecorator('nickname', {
      initialValue: account.nickname,
      rules: [
        { required: true, message: '请填写账号昵称' }
      ]
    });
    const passwordDecorator = getFieldDecorator('password', {
      rules: [
        { required: true, message: '请填写账号密码' }
      ]
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="OJ">
          {ojNameDecorator(
            <Select placeholder="请选择OJ">
              {Object.keys(OJ_MAP).map(ojKey =>
                <Option key={ojKey} value={ojKey}>{OJ_MAP[ojKey]}</Option>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="账号昵称">
          {nicknameDecorator(
            <Input size="default" placeholder="账号昵称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="账号密码">
          {passwordDecorator(
            <Input size="default" type="password" placeholder="账号密码" />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" onClick={e => this.onSubmit(e)}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AccountForm);
