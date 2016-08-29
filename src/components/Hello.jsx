import React, { PropTypes } from 'react';

export default class Hello extends React.Component {
  render() {
    return (
      <h1>Hello from {this.props.framework}!</h1>
    );
  }
}

Hello.propTypes = {
  framework: PropTypes.string,
};

Hello.defaultProps = {
  framework: 'React',
};
