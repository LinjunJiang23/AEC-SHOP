// src/layouts/sellerSideLayout/SellerSideHeader.js
import React from 'react';

// Import all components
import Logo from '../../components/Logo/Logo';

// Import logo picture


const SellerSideHeader = ({ isPending, adminauth }) => {
  return (
	<div className="header" style={{
	opacity: isPending ? 0.5 : 1
	}}>
	  <Logo logoSrc={''} mainLink={'/dashboard'}/>
	</div>
  );
};
			
export default React.memo(SellerSideHeader);