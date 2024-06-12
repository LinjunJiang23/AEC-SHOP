import React, { Suspense, useState, useTransition, useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//Import Routes
import CustomerRoutes from './CustomerRoutes';
import SellerRoutes from './SellerRoutes';


// Import styles
import '../styles/index.css';

// TBI: Loading animation...
const Loading = () => (<div className="loading">Loading...</div>);

// Router
const RouterComponent = () => {
	const [isPending, startTransition] = useTransition();
	
	
	return (
		<Router>
          <CustomerRoutes isPending={isPending} />
		  <SellerRoutes isPending={isPending}/>
		</Router>
	);
};	

const AppRouter = () => (
	<Suspense fallback={<Loading />}>
		<RouterComponent />
	</Suspense>
);

export default AppRouter;
