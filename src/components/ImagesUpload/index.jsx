import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';
import './style.less';

export default class ImagesUpload extends React.PureComponent {
  static propTypes = {
    limit: PropTypes.number.isRequired,
    imageList: PropTypes.array.isRequired,
    beforeUpload: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    limit: 10,
  }

  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      previewVisible: false,
    };
    this.onPreview = (file) => {
      this.setState({
        previewImage: file.origin || file.url,
        previewVisible: true,
      });
    };
    this.onCancelPreview = () => this.setState({ previewVisible: false });
  }

  renderUploadButton() {
    return (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
  }

  render() {
    const { previewImage, previewVisible } = this.state;
    const { limit, imageList, beforeUpload, onChange } = this.props;
    console.log('ImagesUpload render', imageList);
    const uploadProps = {
      multiple: limit > 1,
      listType: 'picture-card',
      fileList: imageList,
      beforeUpload,
      onChange,
      onPreview: this.onPreview,
    };
    return (
      <div>
        <Upload {...uploadProps} >
          {imageList.length >= limit ? null : this.renderUploadButton()}
        </Upload>
        <Modal title="预览" visible={previewVisible} footer={null} onCancel={this.onCancelPreview}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
