import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../layouts/Logo';
import Contact from '../../layouts/Contact';


const Footer = ({ className, isPending, logoRelated, contactRelated, ...props }) => {
	return (
		<footer
		  className={`footer ${className}`}
		  style={{
			opacity: isPending ? 0.5 : 1
		  }}
		  {...props}
		>
			{/* Logo */}
			<div className="footer-logo">
			  {logoRelated || <Logo />}
			</div>
			<div className="footer-contact">
			  {contactRelated || <Contact />}
			</div>
			  <small>
			    Copyright © 2024 May Jiang, all rights reserved.
			  </small>
		</footer>
	);
};

Footer.propTypes = {
	className: PropTypes.string,
	isPending: PropTypes.bool,
	logoRelated: PropTypes.node,
	contactRelated: PropTypes.node,
};

Footer.defaultProps = {
	className: '',
	isPending: false,
};

export default Footer;