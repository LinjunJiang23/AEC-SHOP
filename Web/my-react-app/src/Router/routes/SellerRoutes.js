import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SellerRouteConfig from '../routeConfigs/SellerRouteConfig';

const SellerRoutes = ({ isPending, isAdmin }) => {
	const routes = SellerRouteConfig(isPending, isAdmin);
	
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

export default SellerRoutes;