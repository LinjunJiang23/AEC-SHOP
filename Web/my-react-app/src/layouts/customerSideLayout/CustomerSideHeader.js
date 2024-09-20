// src/layouts/customerSideLayout/CustomerSideHeader.js
import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header/Header';

// layouts
import ShoppingCart from '../ShoppingCart';

//api
import { Auth } from '../../api/Auth';

/**
 * CustomerSideHeader
 * @param {boolean} isPending - identify whether element is loading or not
*/
const CustomerSideHeader = ({ isPending }) => {
	const { isLoggedIn } = useContext(Auth);

	useEffect(() => {}, [isLoggedIn]);
	
	return (
		<Header className="customerSide" isLoggedIn={isLoggedIn}>
			<ShoppingCart />
		</Header>
	);
};
		
		
export default CustomerSideHeader;