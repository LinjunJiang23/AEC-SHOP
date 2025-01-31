// src/layouts/customerSideLayout/CustomerSideHeader.js
import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header/Header';

// layouts
import ShoppingCartIcon from '../shoppingCart/ShoppingCartIcon';

//api
import { Auth } from '../../api/Auth';

/**
 * CustomerSideHeader
 * @param {boolean} isPending - identify whether element is loading or not
*/
const CustomerSideHeader = ({ isPending }) => {
  const { isLogIn } = useContext(Auth);
	
  return (
	<Header className="customerSide" isLoggedIn={isLogIn}>
	  <ShoppingCartIcon />
	</Header>
  );
};
		
		
export default CustomerSideHeader;