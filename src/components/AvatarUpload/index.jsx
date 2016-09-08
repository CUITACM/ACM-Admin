import React, { PropTypes } from 'react';
import { Upload, message } from 'antd';
import { withToken } from 'helpers/auth';
import { API_ROOT, UPDATE_USER } from 'constants/endpoints';
import './style.less';

export default class AvatarUpload extends React.PureComponent {

  render() {
    const { user } = this.props;
    const avatarUrl = `${API_ROOT}${user.avatar}`;
    const uploadProps = {
      name: 'avatar',
      action: UPDATE_USER.endpoint(user.id),
      headers: withToken(),
      showUploadList: false,
      onChange(info) {
        if (info.file.status === 'done') {
          const newUser = info.file.response.user;
          if (newUser) {
            message.success('头像上传成功');
          }
        } else if (info.file.status === 'error') {
          message.error('头像上传失败');
        }
      },
    };
    return (
      <div className="clearfix avatar-upload">
        <Upload {...uploadProps}>
          <div className="upload-img">
            <img alt="avatar" src={avatarUrl} />
            <div className="upload-mask"><span>上传头像</span></div>
          </div>
        </Upload>
      </div>
    );
  }
}

AvatarUpload.propTypes = {
  user: PropTypes.object
};
