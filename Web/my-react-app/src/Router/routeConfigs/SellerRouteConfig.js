// Import layout
import SellerSideLayout from '../../layouts/sellerSideLayout/SellerSideLayout';

// Import all pages from Seller Side
import MerchantDashboard from '../../pages/sellerSidePage/MerchantDashboard';
import EditListingPage from '../../pages/sellerSidePage/EditListingPage';
import OrderManagementPage from '../../pages/sellerSidePage/OrderManagementPage';
import AddListingPage from '../../pages/sellerSidePage/AddListingPage';

const SellerRouteConfig = ({ isPending, isAdmin }) => {
	
	const routes = [
	{
		path: '/dashboard',
		element: (
		  <SellerSideLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
		      <MerchantDashboard />
		  </SellerSideLayout>
		)
	},
	{
		path: '/dashboard/edit',
		element: (
		  <SellerSideLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <EditListingPage />
		  </SellerSideLayout>
		)
	},
	{
		path: '/dashboard/orderdetails',
		element: (
		  <SellerSideLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <OrderManagementPage />
		  </SellerSideLayout>
		)
	},
	{
		path: '/dashboard/addnewlisting',
		element: (
		  <SellerSideLayout 
			isPending={isPending} 
			adminauth={isAdmin}>
			  <AddListingPage />
		  </SellerSideLayout>
		)
	}];
	return routes;
};

export default SellerRouteConfig;