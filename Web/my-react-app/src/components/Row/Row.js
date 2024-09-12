import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, ...props }) => {
	return (
		<div 
		  className={`row ${className}`} 
		  {...props}>
			{children}
		</div>
	);
};

Row.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Row.defaultProps = {
	className: '',
};

export default Row;