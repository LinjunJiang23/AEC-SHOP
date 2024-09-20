import React from 'react';

import SellerSideHeader from './SellerSideHeader';
import SellerSideFooter from './SellerSideFooter';

const SellerSideLayout = ({ isPending, adminauth, children }) => {
	return (
	  <div className="layout">
		<SellerSideHeader isPending={isPending} adminauth={adminauth} />
		<div className="main">
			{children}
		</div>
		<SellerSideFooter isPending={isPending} />
	  </div>
	);
};

export default SellerSideLayout;