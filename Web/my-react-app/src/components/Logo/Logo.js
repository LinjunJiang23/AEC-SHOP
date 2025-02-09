// src/layouts/Logo/Logo.js
import React from 'react';
import PropTypes from 'prop-types';

import NavigateIcon from '../../components/NavigateIcon/NavigateIcon';

/**
 * Logo
 * @param {string} logoSrc - the source of logo
 * @param {string} linkTo
 * @param {string} className
 * @param {string} style - style for NavigateIcon
 * @param ...props
 */
const Logo = ({ logoSrc = '', linkTo = '/', className = '', style = {}, ...props }) => {
  return (
    <div 
	    className={`logo ${className}`}
		{...props}
	  >
        <NavigateIcon linkTo={linkTo} style={style}>
            <img 
                src={logoSrc}
                alt="logo"
            />
        </NavigateIcon>
      </div>
	);
};

Logo.propTypes = {
	logoSrc: PropTypes.string,
	linkTo: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number
	]),
};

export default Logo;
