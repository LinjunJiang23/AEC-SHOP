import React, { Suspense, useTransition } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//Import Routes
import CustomerRoutes from './routes/CustomerRoutes';
import SellerRoutes from './routes/SellerRoutes';


// Import styles
import '../index.css';

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
