import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, DatePicker, Icon } from 'antd';
import { HonorLevel } from 'models/honor';
import { joinCDN } from 'src/config';
import moment from 'moment';
import ImagesUpload from 'components/ImagesUpload';
import './style.less';

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
    this.state = {
      imageList: [],
      removeImages: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInsertImage = this.onInsertImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.honor.images !== this.props.honor.images) {
      const { images } = nextProps.honor;
      const imageList = images.map((image, index) => ({
        index,
        uid: index,
        name: '',
        status: 'done',
        url: joinCDN(image.thumb),
        origin: joinCDN(image.origin)
      }));
      this.setState({ imageList });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!errors) {
        const params = this.props.form.getFieldsValue();
        const honor = this.props.honor;
        const images = this.state.imageList.filter(i => i.file != null).map(i => i.file);
        const values = {
          ...params,
          contest_date: params.contest_date.format('YYYY-MM-DD'),
          remove_images: this.state.removeImages
        };
        this.props.onSubmit(honor && honor.id, values, images);
      }
    });
  }

  onInsertImage(_, fileList) {
    const readPhotos = fileList.map(file =>
      new Promise((resolve, reject) => {
        const isImage = file.type.indexOf('image') !== -1;
        if (!isImage) {
          // message.error('只允许上传图片');
          reject('只允许上传图片');
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(file.name);
            const image = {
              file, uid: file.uid, name: file.name, status: 'done', url: e.target.result
            };
            resolve(image);
          };
          reader.readAsDataURL(file);
        }
      })
    );
    Promise.all(readPhotos).then(photos => {
      console.log(photos);
      this.setState({ imageList: [...this.state.imageList, ...photos] });
    });
    return false;
  }

  render() {
    const { imageList, removeImages } = this.state;
    const { honor, form: { getFieldDecorator } } = this.props;
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
    const contestNameDecorator = getFieldDecorator('contest_name', {
      initialValue: honor && honor.contest_name,
      rules: [{ required: true, message: '请输入比赛名称' }]
    });
    const contestLevelDecorator = getFieldDecorator('contest_level', {
      initialValue: honor && honor.contest_level,
      rules: [{ required: true, message: '请选择比赛等级' }]
    });
    const contestDateDecorator = getFieldDecorator('contest_date', {
      initialValue: honor && moment(honor.contest_date, 'YYYY-MM-DD'),
      rules: [{ type: 'object', required: true, message: '请选择参赛日期' }]
    });
    const teamNameDecorator = getFieldDecorator('team_name', {
      initialValue: honor && honor.team_name,
    });
    const membersDecorator = getFieldDecorator('members', {
      initialValue: honor && honor.members,
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: honor && honor.description
    });
    const uploadProps = {
      limit: 10,
      imageList,
      beforeUpload: this.onInsertImage,
      onChange: ({ file, fileList }) => {
        if (file.status === 'removed' && file.index != null) {
          console.log(file.index);
          this.setState({ removeImages: [...removeImages, file.index] });
        }
        this.setState({ imageList: [...fileList] });
      }
    };
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="比赛名称">
          {contestNameDecorator(
            <Input size="default" placeholder="比赛名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="获奖等级">
          {contestLevelDecorator(
            <Select placeholder="请选择获奖等级">
              {Object.keys(HonorLevel).map(key =>
                <Option key={key} value={key}>{HonorLevel[key]}</Option>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="参赛日期">
          {contestDateDecorator(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="队伍名">
          {teamNameDecorator(
            <Input size="default" placeholder="队伍名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="参赛成员">
          {membersDecorator(
            <Input size="default" placeholder="参赛成员" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {descriptionDecorator(
            <Input type="textarea" placeholder="描述" autosize={{ minRows: 4, maxRows: 10 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout} label="图片资料"
          extra="最多能上传10张图片"
        >
          <ImagesUpload {...uploadProps} />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" onClick={e => this.onSubmit(e)}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(HonorForm);
