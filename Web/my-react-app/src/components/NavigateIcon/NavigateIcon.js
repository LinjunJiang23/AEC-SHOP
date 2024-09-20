// src/components/NavigateIcon/NavigateIcon
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/**
 * NavigateIcon - A icon that navigate to certain location
 * @param {string} className
 * @param {string} linkTo - the destination the icon links to
 * @param {Object} addLogic - additional logic
 * @param {Object} children 
 */
const NavigateIcon = ({ className, linkTo, addLogic, children, style, ...props }) => {
	
	const log = () => {
		addLogic();
	};
	
	return (
	    <div 
		  className={`navigate ${className}`}
		  style={style}
		  {...props}
		>
		  <Link to={linkTo}>
			  {children}
		  </Link>
		</div>
	);
};

NavigateIcon.propTypes = {
	className: PropTypes.string,
	linkTo: PropTypes.string.isRequired,
	addLogic: PropTypes.node,
	children: PropTypes.node,
	style: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number
	]),
};



export default NavigateIcon;