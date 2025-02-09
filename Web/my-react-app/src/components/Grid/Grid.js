// src/components/Grid/Grid.js
import React from 'react';
import PropTypes from 'prop-types';

import './Grid.css';

const Grid = ({ columns = 'repeat(auto-fit, minmax(100px, 1fr))', gap = '16px', children, className = '', style = {}, ...props }) => {
  return (
    <div 
      className={`container-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap,
        ...style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  columns: PropTypes.string,
  gap: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(Grid);
