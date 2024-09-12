import React, { useState, useContext } from 'react';

//Import all layout
import CustomerSideLayout from '../../layouts/CustomerSideLayout'; 




//Import all pages from Customer Side
import Main from '../../pages/Main';
import ShoppingCartPage from '../../pages/customerSidePage/ShoppingCartPage';
import ProductDetailPage from '../../pages/customerSidePage/ProductDetailPage';
import LoginFormPage from '../../pages/customerSidePage/LoginFormPage';
import RegisterFormPage from '../../pages/customerSidePage/RegisterFormPage';
import MerchantLoginPage from '../../pages/customerSidePage/MerchantLoginPage';
import UserDetailPage from '../../pages/customerSidePage/UserDetailPage';

const CustomerRouteConfig = ({ isPending }) => {
	
	const routes = [
	{
		path: '/',
		element: (
		  <CustomerSideLayout 
		    isPending={isPending}>
			  <Main/>
		  </CustomerSideLayout>
		)
	},
	{
		path: '/loginform',
		element: (
		<CustomerSideLayout 
		  isPending={isPending}>
			<LoginFormPage />
		</CustomerSideLayout>
		)
	},
	{
		path: '/registerform',
		element: (
		  <CustomerSideLayout 
		    isPending={isPending}>
		      <RegisterFormPage />
	  	  </CustomerSideLayout>		
		)
	},
	{
		path: '/productdetail/:id',
		element: (
		  <CustomerSideLayout 
			isPending={isPending}>
			  <ProductDetailPage />
		  </CustomerSideLayout>
		)
	},
	{
		path: '/shoppingcart',
		element: (
		  <CustomerSideLayout 
			isPending={isPending}>
			  <ShoppingCartPage />
  		  </CustomerSideLayout>
		)
	},
	{
		path: '/userdetail',
		element: (
		  <CustomerSideLayout 
			isPending={isPending}>
			  <UserDetailPage />
		  </CustomerSideLayout>
		)
	},
	{
		path: '/merchantlogin',
		element: (
		  <CustomerSideLayout 
			isPending={isPending}>
			  <MerchantLoginPage />
		  </CustomerSideLayout>
		)
	}];
	return routes;
};

export default CustomerRouteConfig;