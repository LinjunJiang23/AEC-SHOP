import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CustomerRouteConfig from '../routeConfigs/CustomerRouteConfig';

const CustomerRoutes = ({ isPending }) => {
	const routes = CustomerRouteConfig(isPending);
	return (
	  <Routes>
	      {routes.map((route, index) => (
		    <Route 
			  key={index}
		      path={route.path}
		      element={React.cloneElement(route.element, { isPending })} 
			/>
		  ))}
	  </Routes>
	);
};

export default CustomerRoutes;