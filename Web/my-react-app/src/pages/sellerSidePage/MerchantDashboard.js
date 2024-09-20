import React from 'react';
import { Link } from 'react-router-dom';

import './MerchantDashboard.css';

const Dashboard = () => {
	return (
	  <div className="dashboard">
	  	<h1>Merchant Dashboard</h1>
		<div className="edit">
		  <Link to="/dashboard/edit">
			<span>Edit Listings</span>
		  </Link>
		</div>
		<div className="vieworders">
		  <Link to="/dashboard/orderdetails">
		    <span>Total Order:</span>
		    <span className="order-total">0</span>
		  </Link>
		</div>
	  </div>
	);
};

const MerchantDashboard = () => (
	<Dashboard />
);

export default MerchantDashboard;