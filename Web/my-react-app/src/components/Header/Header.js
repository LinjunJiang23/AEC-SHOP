import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../layouts/LogoLayout';

const Header = ({ className, isLoggedIn, onLogout, isLoading, logoRelated, authRelated, ...props }) => {
	return (
		<header 
		  className={`header ${className}`}
		  style={{
			  opacity:  isPending ? 0.5 : 1
		  }
		  role="banner"
		  {...props}
		  }>
			{/* Logo */}
			<div className="header-logo">
				{logoRelated || <Logo />}
			</div>
			<div className="header-auth">
				{authRelated ? ( 
					authRelated
				  ) : (
				    isLoggedIn ? (
						<UserIcon />
				  ) : (
				    <AuthButtons />
				  )
				)}
			</div>
		</header>
	);
};	

Header.propTypes = {
	className: PropTypes.string,
	isLoggedIn: PropTypes.bool.isRequired;
	onLogout: PropTypes.func.isRequired,
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