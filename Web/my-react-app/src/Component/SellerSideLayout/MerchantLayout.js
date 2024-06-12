import React from 'react';

import Header from './Header';
import Footer from './Footer';

const MerchantLayout = ({ isPending, adminauth, children }) => {
	return (
	  <div className="layout">
		<Header isPending={isPending} adminauth={adminauth} />
		<div className="main">
			{children}
		</div>
		<Footer isPending={isPending} />
	  </div>
	);
};

export default MerchantLayout;