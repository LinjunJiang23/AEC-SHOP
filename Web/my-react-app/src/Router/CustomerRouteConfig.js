import React, { useState, useContext } from 'react';

//Import all layout
import Layout from '../Component/CustomerSideLayout/Layout'; 




//Import all pages from Customer Side
import Main from '../CustomerSide/Page/Main';
import ShoppingCartPage from '../CustomerSide/Page/ShoppingCartPage';
import ProductDetailPage from '../CustomerSide/Page/ProductDetailPage';
import LoginFormPage from '../CustomerSide/Page/LoginFormPage';
import RegisterFormPage from '../CustomerSide/Page/RegisterFormPage';
import MerchantLoginPage from '../CustomerSide/Page/MerchantLoginPage';
import UserDetailPage from '../CustomerSide/Page/UserDetailPage';

const CustomerRouteConfig = ({ isPending }) => {
	
	const routes = [
	{
		path: '/',
		element: (
		  <Layout 
		    isPending={isPending}>
			  <Main/>
		  </Layout>
		)
	},
	{
		path: '/loginform',
		element: (
		<Layout 
		  isPending={isPending}>
			<LoginFormPage />
		</Layout>
		)
	},
	{
		path: '/registerform',
		element: (
		  <Layout 
		    isPending={isPending}>
		      <RegisterFormPage />
	  	  </Layout>		
		)
	},
	{
		path: '/productdetail/:id',
		element: (
		  <Layout 
			isPending={isPending}>
			  <ProductDetailPage />
		  </Layout>
		)
	},
	{
		path: '/shoppingcart',
		element: (
		  <Layout 
			isPending={isPending}>
			  <ShoppingCartPage />
  		  </Layout>
		)
	},
	{
		path: '/userdetail',
		element: (
		  <Layout 
			isPending={isPending}>
			  <UserDetailPage />
		  </Layout>
		)
	},
	{
		path: '/merchantlogin',
		element: (
		  <Layout 
			isPending={isPending}>
			  <MerchantLoginPage />
		  </Layout>
		)
	}];
	return routes;
};

export default CustomerRouteConfig;