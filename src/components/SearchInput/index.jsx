import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Button } from 'antd';
import './style.less';

const InputGroup = Input.Group;

export default class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false
    };
    this.handleInputChange = (e) => {
      this.setState({ value: e.target.value });
    };
    this.handleFocusBlur = (e) => {
      this.setState({
        focus: e.target === document.activeElement,
      });
    };
    this.handleSearch = () => {
      this.props.onSearch(this.state.value);
    };
  }

  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim()
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus
    });
    return (
      <InputGroup className={searchCls} style={style}>
        <Input
          placeholder={placeholder} value={this.state.value}
          onChange={this.handleInputChange} onFocus={this.handleFocusBlur}
          onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
        />
        <div className="ant-input-group-wrap">
          <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
        </div>
      </InputGroup>
    );
  }
}

SearchInput.propTypes = {
  style: PropTypes.object,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func
};

SearchInput.defaultProps = {
  placeholder: '搜索',
  onSearch: () => {}
};
