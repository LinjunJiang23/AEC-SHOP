import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../layouts/Logo/Logo';
import UserIcon from '../../layouts/UserIcon/UserIcon';
import AuthButtons from '../../layouts/AuthButtons/AuthButtons';

const Header = ({ className, isLoggedIn, onLogOut, isLoading, logoRelated, authRelated, logOutRelated, ...props }) => {
	return (
		<header 
		  className={`header ${className}`}
		  style={{
			  opacity:  isLoading ? 0.5 : 1
		  }}
		  role="banner"
		  {...props}
		>
			{/* Logo */}
			<div className="header-logo">
				{logoRelated || <Logo />}
			</div>
			{/* Authentication Section */}
			<div className="header-auth">
				{isLoggedIn ? (
				  logOutRelated || <UserIcon /> 
				  ) : ( 
					authRelated || <AuthButtons />
				)}
			</div>
		</header>
	);
};	

Header.propTypes = {
	className: PropTypes.string,
	isLoggedIn: PropTypes.bool.isRequired,
	onLogOut: PropTypes.func,
	isLoading: PropTypes.bool,
	logoRelated: PropTypes.node,
	authRelated: PropTypes.node,
};

Header.defaultProps = {
	className: '',
	isLoading: false,
	logoRelated: null,
	authRelated: null,
};

export default Header;