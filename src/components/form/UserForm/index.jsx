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
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const nicknameProps = getFieldProps('nickname', {
      initialValue: user.nickname,
      rules: [
        { required: true, message: '请填写昵称' }
      ]
    });
    const emailProps = getFieldProps('email', {
      initialValue: user.email,
      rules: [
        { required: true, whitespace: true, message: '请填写邮箱' },
        { type: 'email', message: '请输入正确的邮箱地址' }
      ]
    });
    const genderProps = getFieldProps('gender', {
      initialValue: user.gender ? 'male' : 'female',
      rules: [
        { required: true, message: '请选择您的性别' },
      ],
    });
    const stuIdProps = getFieldProps('stu_id', {
      initialValue: user.stu_id
    });
    const schoolProps = getFieldProps('school', {
      initialValue: user.school
    });
    const collegeProps = getFieldProps('college', {
      initialValue: user.college
    });
    const majorProps = getFieldProps('major', {
      initialValue: user.major
    });
    const gradeProps = getFieldProps('grade', {
      initialValue: user.grade
    });
    const descriptionProps = getFieldProps('description', {
      initialValue: user.description
    });
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="昵称">
          <Input size="default" placeholder="昵称" {...nicknameProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          <Input size="default" placeholder="邮箱" {...emailProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          <RadioGroup {...genderProps}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="学号">
          <Input size="default" placeholder="学号" {...stuIdProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="学校">
          <Input size="default" placeholder="学校" {...schoolProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="学院">
          <Input size="default" placeholder="学院" {...collegeProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="专业年级">
          <Col span="14">
            <Input size="default" placeholder="专业年级" {...majorProps} />
          </Col>
          <Col span="10">
            <InputNumber min={2000} defaultValue={2016} {...gradeProps} />级
          </Col>
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          <Input type="textarea" size="default" placeholder="描述" {...descriptionProps} />
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
