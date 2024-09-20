// src/components/Button/Button.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button - Template for buttons
 * @param {string} className
 * @param {Object} onClick - logic for onClick
 * @param {Object} disabled - logic for disabled
 * @param {Object} children
 * @param {string} style
 * @param ...props 
 */
const Button = ({ className, onClick, disabled, children, style, ...props }) => {
	
	return (
	  <div 
	    className={`button ${className}`}
		style={style}
		{...props}
	  >
		<button onClick={onClick} disabled={disabled}>
			{children}
		</button>
	  </div>
	);

};

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.node,
	disabled: PropTypes.node,
	children: PropTypes.node,
	style: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number,
	]),
};

export default React.memo(Button);