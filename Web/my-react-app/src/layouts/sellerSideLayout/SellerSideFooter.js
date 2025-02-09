// src/layouts/sellerSideLayout/SellerSideFooter.js
import React from 'react';

import Logo from '../../components/Logo/Logo';


const SellerSideFooter = ({ isPending }) => {
  return (	
	<div className="footer" style={{
		opacity: isPending ? 0.5 : 1
		}}>
		<>
			<Logo logoSrc={''} mainLink={'/dashboard'} />
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

export default SellerSideFooter;