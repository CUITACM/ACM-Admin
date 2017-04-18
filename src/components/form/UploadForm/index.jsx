import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Upload, Icon, message } from 'antd';
import { ResourceUsage } from 'models/resource';
import './style.less';

const FormItem = Form.Item;

class UploadForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: null,
      previewUrl: null,
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(errors => {
        if (!errors) {
          if (this.state.uploadFile == null) return;
          const formValues = this.props.form.getFieldsValue();
          this.props.onSubmit({
            ...formValues,
            usage: this.props.usage,
            path: this.state.uploadFile
          }).then(() => {
            this.props.form.resetFields();
            this.setState({ uploadFile: null });
          });
        }
      });
    };
  }

  render() {
    const { previewUrl, uploadFile } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
    const formItemLayoutWithOutLabel = { wrapperCol: { span: 16, offset: 6 } };
    const filenameDecorator = getFieldDecorator('filename', {
      rules: [{ required: true, message: '请填写图片名' }]
    });
    const uploadProps = {
      multiple: false,
      fileList: uploadFile ? [uploadFile] : [],
      beforeUpload: (file) => {
        const isImage = file.type.indexOf('image') !== -1;
        if (!isImage) {
          this.setState({ previewUrl: null });
          message.error('只允许上传图片');
          return false;
        }
        this.setState({ uploadFile: file });
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
          this.setState({ previewUrl: e.target.result });
        };
        reader.readAsDataURL(file);
        return false;
      },
      onChange: (info) => {
        const fileList = info.fileList;
        if (fileList.length === 0) {
          this.setState({ uploadFile: null, previewUrl: null });
        }
      }
    };
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="图片名">
          {filenameDecorator(
            <Input size="default" placeholder="图片名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="文件">
          <Upload {...uploadProps} >
            <Button type="ghost">
              <Icon type="upload" /> 添加文件
            </Button>
          </Upload>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel} >
          {previewUrl ? (
            <img role="presentation" className="upload-preview" src={previewUrl} />
          ) : null}
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} >
          <Button
            type="primary" htmlType="submit" disabled={uploadFile == null}
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

UploadForm.propTypes = {
  usage: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

UploadForm.defaultProps = {
  usage: ResourceUsage.OTHER
};

export default Form.create()(UploadForm);
