import React from 'react';
import PropTypes from 'prop-types';
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
