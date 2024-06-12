import React from 'react';

// Import all components
import Header from './Header';
import Footer from './Footer';
import SectionBar from '../SectionBar';



// Layout for users, switch icon for logged in users
const Layout = ({ isPending, children }) => {


	return (
	<div className="layout">
		<Header isPending={isPending}/>
		<SectionBar />
		<div className="main">
			{children}
		</div>
		<Footer isPending={isPending}/>
	</div>
	);
};

export default Layout;