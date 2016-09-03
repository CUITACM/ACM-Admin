import React, { PropTypes } from 'react';
import './style.less';

const StatusPoint = (props) => {
  const className = `status-point ${props.color}`;
  return <span className={className} >{props.children}</span>;
};

StatusPoint.propTypes = {
  color: PropTypes.oneOf(['gray', 'blue', 'yellow', 'red', 'green', 'light-blue']),
  children: PropTypes.node
};

StatusPoint.defaultProps = {
  color: 'gray'
};

export default StatusPoint;
