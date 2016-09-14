import React, { PropTypes } from 'react';
import { Input } from 'antd';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import 'assets/fontawesome/css/font-awesome.min.css';
import './style.less';

export default class MarkdownInput extends React.PureComponent {
  componentDidMount() {
    console.log('new MarkdownInput didMount');
    this.editor = new SimpleMDE({
      initialValue: this.props.initialValue,
      autoDownloadFontAwesome: false,
      showIcons: ['strikethrough', 'code', 'table'],
      spellChecker: false
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

  render() {
    return (
      <Input type="textarea" size="default" placeholder="正文" />
    );
  }
}

MarkdownInput.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func
};
