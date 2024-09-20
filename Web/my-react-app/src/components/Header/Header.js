// src/components/Header/Header.js
import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../layouts/Logo/Logo';
import UserIcon from '../../layouts/UserIcon/UserIcon';
import AuthButtons from '../../layouts/AuthButtons/AuthButtons';

/**
 * Header - COMPONENT template that handles basic header function
 * @param {String} className
 * @param {boolean} isLoggedIn - required, whether user is logged in
 * @param {func} onLogOut - logic on log out
 * @param {boolean} isLoading
 * @param {element} logoRelated
 * @param {element} authRelated
 * @param {element} logOutRelated
 * @param {Object || number} style
 * @param {Object} children
 * @param ...props 
 */

const Header = ({ 
  className,
  isLoggedIn,
  onLogOut,
  isLoading,
  logoRelated,
  authRelated,
  logOutRelated,
  style,
  children,
  ...props
  }) => {
	return (
		<header 
		  className={`header ${className}`}
		  style={{...style, opacity: isLoading ? 0.5 : 1}}

		  role="banner"
		  {...props}
		>
			{/* Logo */}
			<div className="header-logo">
				{ logoRelated ? logoRelated : <Logo /> }
			</div>
			{/* Authentication Section */}
			<div 
			  className="header-auth"
			  aria-label={isLoggedIn ? "User Profile" : "Authentication"}>
				{ isLoggedIn ? (
				  logOutRelated ? logOutRelated : <UserIcon onLogOut={onLogOut}/> 
				  ) : ( 
					authRelated ? authRelated : <AuthButtons />
				)}
			</div>
			{children}
		</header>
	);
};	

Header.propTypes = {
	className: PropTypes.string,
	isLoggedIn: PropTypes.bool.isRequired,
	onLogOut: PropTypes.func,
	isLoading: PropTypes.bool,
	logoRelated: PropTypes.element,
	authRelated: PropTypes.element,
	logOutRelated: PropTypes.element,
	style: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number,
	]),
	children: PropTypes.node,
};

Header.defaultProps = {
	className: '',
	isLoggedIn: false,
	isLoading: false,
	logoRelated: null,
	authRelated: null,
	logOutRelated: null,
	style: {},
	children: null,
};

export default React.memo(Header);