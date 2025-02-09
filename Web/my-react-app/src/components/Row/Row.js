// src/components/Row/Row.js
import React from 'react';
import PropTypes from 'prop-types';

import './Row.css';

const Row = ({ title = "Default Title", img_url = 'https://via.placeholder.com/150', children, className = '', ...props }) => {
  return (
    <div 
      className={`row ${className}`} 
      {...props}>
      <span>{title}</span>
	  <img src={img_url} alt={title || 'Row Image'} />
      {children}
    </div>
  );
};

Row.propTypes = {
  title: PropTypes.string,
  img_url: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default React.memo(Row);
