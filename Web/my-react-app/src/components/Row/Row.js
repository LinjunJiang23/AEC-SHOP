// src/components/Row/Row.js
import React from 'react';
import PropTypes from 'prop-types';

import './Row.css';

const Row = ({ title, img_url, children, className, ...props }) => {
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

Row.defaultProps = {
  title: 'Default Title',
  img_url: 'https://via.placeholder.com/150', // Placeholder image URL as default
  className: '',
};

export default React.memo(Row);
