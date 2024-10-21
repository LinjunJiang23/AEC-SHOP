import React, { useState, useContext } from 'react';

// Layout
import CustomerSidePageLayout from '../../layouts/customerSideLayout/CustomerSidePageLayout'; 

/* Pages */
import Main from '../../pages/Main';
// Product related
import ProductGeneralPage from '../../pages/customerSidePage/ProductGeneralPage';
import ProductDetailPage from '../../pages/customerSidePage/ProductDetailPage';
// Cart related
import ShoppingCartPage from '../../pages/customerSidePage/ShoppingCartPage';
// Auth related
import LoginFormPage from '../../pages/customerSidePage/LoginFormPage';
import RegisterFormPage from '../../pages/customerSidePage/RegisterFormPage';
import ResetPWPage from '../../pages/customerSidePage/RegisterFormPage';
// User related
import UserDetailPage from '../../pages/customerSidePage/UserDetailPage';
// Checkout related
import PaymentPage from '../../pages/customerSidePage/PaymentPage';


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
		path: 'products',
		element: (
		<CustomerSidePageLayout 
		    isPending={isPending}>
			  <ProductGeneralPage />
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
		path: '/resetpwform',
		element: (
		  <CustomerSidePageLayout
		    isPending={isPending}>
		      <ResetPWPage />
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
		path: '/payment',
		element: (
		  <CustomerSidePageLayout
		    isPending={isPending}>
			  <PaymentPage />
		  </CustomerSidePageLayout>
		)
	}];
	return routes;
};

export default CustomerRouteConfig;