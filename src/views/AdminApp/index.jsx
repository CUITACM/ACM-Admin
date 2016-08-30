import React, { PropTypes } from 'react';

export default class AdminApp extends React.Component {
  render() {
    return (
      <div>
        <h2>AdminApp</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

AdminApp.propTypes = {
  children: PropTypes.element.isRequired
};
