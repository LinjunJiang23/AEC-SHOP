// Import layout
import MerchantLayout from '../Component/SellerSideLayout/MerchantLayout';

// Import all pages from Seller Side
import MerchantDashboard from '../SellerSide/Page/MerchantDashboard';
import EditListingPage from '../SellerSide/Page/EditListingPage';
import OrderManagementPage from '../SellerSide/Page/OrderManagementPage';
import AddListingPage from '../SellerSide/Page/AddListingPage';

const SellerRouteConfig = ({ isPending, isAdmin }) => {
	
	const routes = [
	{
		path: '/dashboard',
		element: (
		  <MerchantLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
		      <MerchantDashboard />
		  </MerchantLayout>
		)
	},
	{
		path: '/dashboard/edit',
		element: (
		  <MerchantLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <EditListingPage />
		  </MerchantLayout>
		)
	},
	{
		path: '/dashboard/orderdetails',
		element: (
		  <MerchantLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <OrderManagementPage />
		  </MerchantLayout>
		)
	},
	{
		path: '/dashboard/addnewlisting',
		element: (
		  <MerchantLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <AddListingPage />
		  </MerchantLayout>
		)
	}];
	return routes;
};

export default SellerRouteConfig;