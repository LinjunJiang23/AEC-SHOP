import React from 'react';

import Logo from '../Logo';

// Import logo picture
import logo from './logo.png';

const Footer = ({ isPending }) => {
  return (  
	<div className="footer" style={{
		opacity: isPending ? 0.5 : 1
		}}>
		<>
			<Logo logoSrc={logo} mainLink={'/'}/>
			<div className="contact">
				<fieldset>
					<legend>Contact Me</legend>
					<span>Email:</span>
					<a 
					  href="mailto:goodjl233@gmail.com"
					  className="upgrade-contact-email"
					>
					goodjl233@gmail.com
					</a>
					<span>Phone:</span>
					<a
				      href="tel:7042945001"
					  className="upgrade-contact-phone"
					>
					(704)294-5001
					</a>
				</fieldset>
			</div>
		</>
	</div>
	);
};

export default Footer;