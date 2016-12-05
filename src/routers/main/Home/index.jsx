import React, { PropTypes } from 'react';


export default class Home extends React.PureComponent {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

Home.propTypes = {
  children: PropTypes.element
};
