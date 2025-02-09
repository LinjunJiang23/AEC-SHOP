// Import layout
import SellerSideLayout from '../../layouts/sellerSideLayout/SellerSideLayout';

// Import all pages from Seller Side
import MerchantDashboardPage from '../../pages/sellerSidePage/MerchantDashboardPage';
import EditListingPage from '../../pages/sellerSidePage/EditListingPage';
import OrderManagementPage from '../../pages/sellerSidePage/OrderManagementPage';
import AddListingPage from '../../pages/sellerSidePage/AddListingPage';
import MerchantMainPage from '../../pages/sellerSidePage/MerchantMainPage';
import MerchantLoginPage from '../../pages/sellerSidePage/MerchantLoginPage';

const SellerRouteConfig = ({ isPending, isAdmin }) => {
  const routes = [
	{
	  path: '/seller',
	  element: (
	    <SellerSideLayout
		  isPending={ isPending }
		  adminauth={ isAdmin }
		>
		  <MerchantMainPage />
		</SellerSideLayout>
	  )
	},
	{
	  path: '/seller/login',
	  element: (
		<SellerSideLayout
		  isPending={ isPending }
		  adminauth={ isAdmin }
		>
		  <MerchantLoginPage />
		</SellerSideLayout>
	  )
	},
	{
	  path: '/dashboard',
	  element: (
		<SellerSideLayout 
		  isPending={ isPending } 
		  adminauth={ isAdmin }
		>
		  <MerchantDashboardPage />
		</SellerSideLayout>
	  )
	},
	{
	  path: '/dashboard/edit',
	  element: (
		<SellerSideLayout 
		  isPending={ isPending } 
		  adminauth={ isAdmin }
		>
		  <EditListingPage />
		</SellerSideLayout>
	  )
	},
	{
	  path: '/dashboard/orderdetails',
	  element: (
		<SellerSideLayout 
		  isPending={ isPending } 
		  adminauth={ isAdmin }
		>
		  <OrderManagementPage />
		</SellerSideLayout>
	  )
	},
	{
	  path: '/dashboard/addnewlisting',
	  element: (
		<SellerSideLayout 
		  isPending={ isPending } 
		  adminauth={ isAdmin }
		>
		  <AddListingPage />
		</SellerSideLayout>
	  )
	}
  ];
  return routes;
};

export default SellerRouteConfig;