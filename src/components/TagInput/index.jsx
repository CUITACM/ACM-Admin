import React, { PropTypes } from 'react';
import { Tag, Popover, Button, Input, message } from 'antd';
import './style.less';

const InputGroup = Input.Group;

export default class TagInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      newTagValue: '',
      visiblePopover: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initTags !== this.props.initTags) {
      this.setState({ tags: nextProps.initTags });
    }
  }

  renderTags() {
    const handleClose = (tag) => {
      const findIndex = this.state.tags.indexOf(tag);
      if (findIndex !== -1) {
        this.state.tags.splice(findIndex, 1);
        this.setState({ tags: this.state.tags });
        this.props.onChange(this.state.tags);
      }
    };
    return (
      <div className="contain-tags">
        {this.state.tags.map((tag, index) => (
          <Tag key={index} color="blue" closable onClose={() => handleClose(tag)} >
            {tag}
          </Tag>
        ))}
      </div>
    );
  }

  renderPopoverContent() {
    const onTagAdd = () => {
      const value = this.state.newTagValue.trim();
      if (!value) return;
      if (this.state.tags.indexOf(value) === -1) {
        const newTags = this.state.tags.concat([value]);
        this.setState({
          tags: newTags,
          newTagValue: '',
          visiblePopover: false
        });
        this.props.onChange(newTags);
      } else {
        message.error('请不要重复添加!');
      }
    };
    return (
      <InputGroup className="tag-create">
        <Input
          placeholder="新标签" value={this.state.newTagValue}
          onChange={(e) => this.setState({ newTagValue: e.target.value })}
        />
        <div className="ant-input-group-wrap">
          <Button
            className="tag-create-btn" onClick={onTagAdd}
            disabled={!this.state.newTagValue}
          >
            添加
          </Button>
        </div>
      </InputGroup>
    );
  }

  render() {
    return (
      <div className="tag-input">
        {this.renderTags()}
        <Popover
          title="输入添加新标签" trigger="click"
          visible={this.state.visiblePopover}
          onVisibleChange={v => this.setState({ visiblePopover: v })}
          content={this.renderPopoverContent()}
        >
          <Button size="small" type="dashed" icon="plus" >添加</Button>
        </Popover>
      </div>
    );
  }
}

TagInput.propTypes = {
  initTags: PropTypes.array,
  onChange: PropTypes.func
};

TagInput.defaultProps = {
  initTags: [],
  onChange: (tags) => console.log('[TagInput] current tags: ', tags)
};
