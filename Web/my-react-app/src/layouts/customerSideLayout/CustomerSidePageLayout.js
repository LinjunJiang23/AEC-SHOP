// src/layouts/CustomerSideLayout.js
import React from 'react';

// Import all components
import CustomerSideHeader from './CustomerSideHeader';
import CustomerSideFooter from './CustomerSideFooter';
import SectionBar from '../section/SectionBar';



// Layout for users, switch icon for logged in users
const CustomerSidePageLayout = ({ isPending, children }) => {

	return (
	<div className="layout">
		<CustomerSideHeader isPending={isPending}/>
		<SectionBar />
		<div className="main">
			{children}
		</div>
		<CustomerSideFooter isPending={isPending}/>
	</div>
	);
};

export default CustomerSidePageLayout;