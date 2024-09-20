import React, { useState, useContext } from 'react';

//Import all layout
import CustomerSidePageLayout from '../../layouts/customerSideLayout/CustomerSidePageLayout'; 




//Import all pages from Customer Side
import Main from '../../pages/Main';
import ShoppingCartPage from '../../pages/customerSidePage/ShoppingCartPage';
import ProductDetailPage from '../../pages/customerSidePage/ProductDetailPage';
import LoginFormPage from '../../pages/customerSidePage/LoginFormPage';
import RegisterFormPage from '../../pages/customerSidePage/RegisterFormPage';
import MerchantLoginPage from '../../pages/sellerSidePage/MerchantLoginPage';
import UserDetailPage from '../../pages/customerSidePage/UserDetailPage';

const CustomerRouteConfig = ({ isPending }) => {
	
	const routes = [
	{
		path: '/',
		element: (
		  <CustomerSidePageLayout 
		    isPending={isPending}>
			  <Main/>
		  </CustomerSidePageLayout>
		)
	},
	{
		path: '/loginform',
		element: (
		<CustomerSidePageLayout 
		  isPending={isPending}>
			<LoginFormPage />
		</CustomerSidePageLayout>
		)
	},
	{
		path: '/registerform',
		element: (
		  <CustomerSidePageLayout 
		    isPending={isPending}>
		      <RegisterFormPage />
	  	  </CustomerSidePageLayout>		
		)
	},
	{
		path: '/productdetail/:id',
		element: (
		  <CustomerSidePageLayout 
			isPending={isPending}>
			  <ProductDetailPage />
		  </CustomerSidePageLayout>
		)
	},
	{
		path: '/shoppingcart',
		element: (
		  <CustomerSidePageLayout 
			isPending={isPending}>
			  <ShoppingCartPage />
  		  </CustomerSidePageLayout>
		)
	},
	{
		path: '/userdetail',
		element: (
		  <CustomerSidePageLayout 
			isPending={isPending}>
			  <UserDetailPage />
		  </CustomerSidePageLayout>
		)
	},
	{
		path: '/merchantlogin',
		element: (
		  <CustomerSidePageLayout 
			isPending={isPending}>
			  <MerchantLoginPage />
		  </CustomerSidePageLayout>
		)
	}];
	return routes;
};

export default CustomerRouteConfig;