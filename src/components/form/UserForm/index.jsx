import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Button, Radio, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((errors) => {
        if (!errors) {
          const params = this.props.form.getFieldsValue();
          params.gender = params.gender === 'male';
          this.props.onSubmit(
            this.props.user.id,
            params
          );
        }
      });
    };
  }

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const nicknameDecorator = getFieldDecorator('nickname', {
      initialValue: user.nickname,
      rules: [
        { required: true, message: '请填写昵称' }
      ]
    });
    const emailDecorator = getFieldDecorator('email', {
      initialValue: user.user_info.email,
      rules: [
        { required: true, whitespace: true, message: '请填写邮箱' },
        { type: 'email', message: '请输入正确的邮箱地址' }
      ]
    });
    const genderDecorator = getFieldDecorator('gender', {
      initialValue: user.gender ? 'male' : 'female',
      rules: [
        { required: true, message: '请选择您的性别' },
      ],
    });
    const stuIdDecorator = getFieldDecorator('stu_id', {
      initialValue: user.user_info.stu_id
    });
    const schoolDecorator = getFieldDecorator('school', {
      initialValue: user.user_info.school
    });
    const collegeDecorator = getFieldDecorator('college', {
      initialValue: user.user_info.college
    });
    const majorDecorator = getFieldDecorator('major', {
      initialValue: user.user_info.major
    });
    const gradeDecorator = getFieldDecorator('grade', {
      initialValue: user.user_info.grade
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: user.description
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="昵称">
          {nicknameDecorator(
            <Input size="default" placeholder="昵称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          {emailDecorator(
            <Input size="default" placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          {genderDecorator(
            <RadioGroup>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="学号">
          {stuIdDecorator(
            <Input size="default" placeholder="学号" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="学校">
          {schoolDecorator(
            <Input size="default" placeholder="学校" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="学院">
          {collegeDecorator(
            <Input size="default" placeholder="学院" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="专业年级">
          <Col span="14">
            {majorDecorator(
              <Input size="default" placeholder="专业年级" />
            )}
          </Col>
          <Col span="10">
            {gradeDecorator(
              <InputNumber min={2000} />
            )}级
          </Col>
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {descriptionDecorator(
            <Input type="textarea" size="default" rows="3" placeholder="描述" />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} >
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form.create()(UserForm);
