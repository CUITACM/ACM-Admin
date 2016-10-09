import React from 'react';
import './style.less';

export default class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date()
    };
  }

  render() {
    return (
      <footer className="layout-footer">
        <p>CUIT ACM Team © 2011 - {this.state.today.getFullYear()}</p>
      </footer>
    );
  }
}
