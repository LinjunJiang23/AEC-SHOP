import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ item_title = 'Default Item Title', img_url = 'https://via.placeholder.com/150', className = '', 
				children, ...props }) => {
  return (
    <div 
      className={`card ${className}`} 
      {...props}
    >
      <span className='card-title'>{item_title}</span>
      <img src={img_url} alt={item_title || 'Card Image'} />
      {children}
    </div>
  );
};

Card.propTypes = {
  item_title: PropTypes.string,
  img_url: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default React.memo(Card);
