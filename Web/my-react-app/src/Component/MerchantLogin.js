import * as React from 'react';
import { Link } from 'react-router-dom';

const MerchantLogin = () => {
	return (
		<Link to="/merchantlogin">
			<div className="button-login">
			  <span>Merchant Login</span>
			</div>
		</Link>
	);
};

export default MerchantLogin;