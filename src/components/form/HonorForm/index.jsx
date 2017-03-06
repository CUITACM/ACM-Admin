import React, { PropTypes } from 'react';
import { Form, Input, Button, Select, Upload, Icon } from 'antd';
import { HonorLevel } from 'models/honor';
import { joinCDN } from 'src/config';
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
    console.log(nextProps);
    if (nextProps.honor.images) {
      const { images } = nextProps.honor;
      const imageList = images.map((image, index) => ({
        index,
        uid: index,
        name: '',
        status: 'done',
        url: joinCDN(image.origin),
        thumb: joinCDN(image.thumb)
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
        console.log(params, this.fileList);
        const images = this.state.imageList.filter(i => i.file != null).map(i => i.file);
        this.props.onSubmit(
          honor && honor.id,
          { ...params, remove_images: this.state.removeImages },
          images
        );
      }
    });
  }

  onInsertImage(file) {
    const { imageList } = this.state;
    const isImage = file.type.indexOf('image') !== -1;
    if (!isImage) {
      message.error('只允许上传图片');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(file.name);
      const image = {
        file,
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: e.target.result
      };
      this.setState({ imageList: [...imageList, image] });
    };
    reader.readAsDataURL(file);
    return false;
  }

  render() {
    const { imageList, removeImages } = this.state;
    console.log(imageList, removeImages);
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
    const teamNameDecorator = getFieldDecorator('team_name', {
      initialValue: honor && honor.team_name
    });
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: honor && honor.description
    });
    const uploadProps = {
      multiple: true,
      listType: 'picture-card',
      fileList: imageList,
      beforeUpload: this.onInsertImage,
      onChange: ({ file, fileList }) => {
        console.log(file, fileList);
        if (file.status === 'removed' && file.index != null) {
          console.log(file.index);
          this.setState({ removeImages: [...removeImages, file.index] });
        }
        this.setState({ imageList: fileList });
      }
    };
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
            <Input type="textarea" placeholder="描述" autosize={{ minRows: 4, maxRows: 10 }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="图片资料">
          <Upload {...uploadProps} >
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">添加图片</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" onClick={e => this.onSubmit(e)}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(HonorForm);
