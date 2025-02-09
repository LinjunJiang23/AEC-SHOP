// src/components/Header/Header.js
import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../components/Logo/Logo';

import UserIcon from '../../layouts/user/UserIcon';
import AuthButtons from '../../layouts/auth/AuthButtons';

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
const Header = ({ className = '', isLoggedIn = false, onLogOut, isLoading = false, logoRelated = null, authRelated = null, 
				  logOutRelated = null, style = {}, children = null, ...props }) => {
  return (
	<header 
	  className={`header ${className}`}
	  style={{...style, opacity: isLoading ? 0.5 : 1}}
	  role="banner"
	  {...props}
	>
	  <div className="header-logo">
	    { logoRelated ? logoRelated : <Logo /> }
	  </div>
	  <div 
		className="header-auth"
		aria-label={isLoggedIn ? "User Profile" : "Authentication"}
	  >
		{ isLoggedIn ? (
			logOutRelated ? logOutRelated : <UserIcon onLogOut={onLogOut} /> 
		  ) : ( 
			authRelated ? authRelated : <AuthButtons />
		  )
		}
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

export default React.memo(Header);