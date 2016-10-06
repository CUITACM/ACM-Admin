import React, { PropTypes } from 'react';
import SimpleMDE from 'libs/simplemde';
import 'libs/simplemde/dist/simplemde.min.css';
import 'libs/fontawesome/css/font-awesome.min.css';
import { Input, Modal, Tabs, message } from 'antd';
import { withApiRoot } from 'helpers/utils';
import { ResourceUsage } from 'constants/resource.js';
import * as resourceActions from 'actions/entity/resource';
import UploadForm from 'components/form/UploadForm';
import './style.less';

const TabPane = Tabs.TabPane;

export default class MarkdownInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.drawImage = this.drawImage.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  componentDidMount() {
    this.editor = new SimpleMDE({
      initialValue: this.props.initialValue,
      autoDownloadFontAwesome: false,
      showIcons: ['strikethrough', 'code', 'table'],
      spellChecker: false,
      customToolbar: [{
        name: 'image',
        action: () => this.setState({ showModal: true }),
        className: 'fa fa-picture-o',
        title: 'Upload & Insert Image',
        default: true
      }]
    });
    this.editor.codemirror.on('change', () => {
      this.props.onChange(this.editor.value());
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValue !== this.props.initialValue) {
      this.editor.value(nextProps.initialValue);
    }
  }

  onImageUpload(params) {
    return resourceActions.createResource(params)
      .then(response => {
        if (response.error_code === 0) {
          return response;
        } else if (response.error_code === 2) {
          throw new Error('上传文件已存在');
        }
        throw new Error('上传失败');
      })
      .then(response => {
        const resource = response.resource;
        this.setState({ showModal: false });
        this.drawImage(withApiRoot(resource.file.url));
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
      });
  }

  drawImage(url) {
    const codemirror = this.editor.codemirror;
    const stat = SimpleMDE.getState(codemirror);
    const options = this.editor.options;
    const imageUrl = url || 'http://';
    SimpleMDE.replaceSelection(
      codemirror, stat.image,
      options.insertTexts.image, imageUrl
    );
  }

  render() {
    return (
      <div>
        <Input type="textarea" size="default" placeholder="正文" />
        <Modal
          visible={this.state.showModal} footer={null}
          onCancel={() => this.setState({ showModal: false })}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="上传图片" key="1">
              <UploadForm
                usage={ResourceUsage.ARTICLE}
                onSubmit={this.onImageUpload}
              />
            </TabPane>
            <TabPane tab="选择图片" key="2">选项卡二内容</TabPane>
            <TabPane tab="远程地址获取" key="3">选项卡三内容</TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

MarkdownInput.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func
};
