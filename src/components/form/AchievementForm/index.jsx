import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Button, Select, Col, Icon } from 'antd';
import { OJ_MAP } from 'models/account';
import {
  AchievementType, HumanAchievementType, HumanAmountType
} from 'models/achievement';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;

class AchievementForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    achievement: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      achievementType: null,
      problemsInputCount: 1,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { achievement } = nextProps;
    if (achievement && achievement.achievement_type) {
      this.setState({ achievementType: achievement.achievement_type });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { achievement } = this.props;
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        console.log(params);
        this.props.onSubmit(achievement ? achievement.id : null, params);
      }
    });
  }

  renderAmountCondition(formItemLayout) {
    const { getFieldDecorator } = this.props.form;
    const { conditions } = this.props.achievement;
    const amountTypeDecorator = getFieldDecorator('conditions[amount_type]', {
      initialValue: conditions && conditions.amount_type,
      rules: [{ required: true, message: '请选择数量级类型' }]
    });
    const totalDecorator = getFieldDecorator('conditions[total]', {
      initialValue: conditions && conditions.total,
      rules: [{ required: true, message: '请选择达成数量' }]
    });
    return (
      <div>
        <FormItem {...formItemLayout} label="数量级类型">
          {amountTypeDecorator(
            <Select placeholder="请选择数量级类型">
              {Object.keys(HumanAmountType).map(key =>
                <Option key={key} value={key}>{HumanAmountType[key]}</Option>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="达成数量">
          {totalDecorator(<InputNumber min={1} />)}
        </FormItem>
      </div>
    );
  }

  renderSubjectCondition(formItemLayout) {
    const { conditions: { problems = [] } } = this.props.achievement;
    const { problemsInputCount } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 16, offset: 6 },
    };
    const problemsLength = Math.max(problemsInputCount, problems.length);
    return (
      <div>
        {Array.from({ length: problemsLength }, (v, i) => i).map((_, index) =>
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            key={index} label={index === 0 ? '专题题目' : ''}
          >
            <Col span={6}>
              <FormItem>
                {getFieldDecorator(`conditions[problems][${index}][oj]`, {
                  initialValue: problems[index] && problems[index].oj
                })(
                  <Select placeholder="请选择OJ">
                    {Object.keys(OJ_MAP).map(ojKey =>
                      <Option key={ojKey} value={ojKey}>{OJ_MAP[ojKey]}</Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={10} offset={1}>
              <FormItem>
                {getFieldDecorator(`conditions[problems][${index}][pid]`, {
                  initialValue: problems[index] && problems[index].pid
                })(
                  <Input size="default" placeholder="题目ID" />
                )}
              </FormItem>
            </Col>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={problemsInputCount <= 1}
              onClick={() => {
                if (problemsInputCount > 1) {
                  this.setState({ problemsInputCount: problemsInputCount - 1 });
                }
              }}
            />
          </FormItem>
        )}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button
            type="dashed" style={{ width: '60%' }}
            onClick={() => this.setState({ problemsInputCount: problemsInputCount + 1 })}
          >
            <Icon type="plus" /> 添加新题目
          </Button>
        </FormItem>
      </div>
    );
  }

  renderCondition(formItemLayout) {
    const { achievementType } = this.state;
    switch (achievementType) {
      case AchievementType.AMOUNT:
        return this.renderAmountCondition(formItemLayout);
      case AchievementType.SUBJECT:
        return this.renderSubjectCondition(formItemLayout);
      default:
        return null;
    }
  }

  render() {
    const { loading, achievement } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const nameDecorator = getFieldDecorator('name', {
      initialValue: achievement && achievement.name,
      rules: [{ required: true, message: '请输入成就名称' }]
    });
    const scoreDecorator = getFieldDecorator('score', {
      initialValue: (achievement && achievement.score) || 1,
      rules: [{ required: true, message: '请输入成就点' }]
    });
    const achievementTypeDecorator = getFieldDecorator('achievement_type', {
      initialValue: achievement && achievement.achievement_type,
      rules: [{ required: true, message: '请选择成就类型' }]
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: achievement && achievement.description
    });
    return (
      <Form>
        <FormItem {...formItemLayout} label="成就名称">
          {nameDecorator(
            <Input size="default" placeholder="成就名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="成就点">
          {scoreDecorator(<InputNumber min={1} max={10} />)}
          <span className="ant-form-text">分</span>
        </FormItem>
        <FormItem {...formItemLayout} label="成就类型">
          {achievementTypeDecorator(
            <Select
              placeholder="请选择成就类型"
              onChange={v => this.setState({ achievementType: v })}
            >
              {Object.keys(HumanAchievementType).map(key =>
                <Option key={key} value={key}>{HumanAchievementType[key]}</Option>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {descriptionDecorator(
            <Input type="textarea" placeholder="描述" autosize={{ minRows: 4, maxRows: 6 }} />
          )}
        </FormItem>
        {this.renderCondition(formItemLayout)}
        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
          <Button loading={loading} type="primary" onClick={e => this.onSubmit(e)}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AchievementForm);
