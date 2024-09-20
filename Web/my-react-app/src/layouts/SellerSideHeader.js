import React from 'react';

// Import all components
import Logo from './Logo/Logo';

// Import logo picture


const Header = ({ isPending, adminauth }) => {
	return (
		<div className="header" style={{
			opacity: isPending ? 0.5 : 1
		}}>
			<Logo logoSrc={''} mainLink={'/dashboard'}/>
		</div>
	);
};
		
		
export default Header;