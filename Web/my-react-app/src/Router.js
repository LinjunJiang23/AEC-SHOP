import React, { Suspense, useState, useTransition, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Import all elements for layout & registered user's layout
import ShoppingCart from './Component/ShoppingCart';
import Login from './Component/Login';
import UserIcon from './Component/UserIcon';
import Logo from './Component/Logo';
import MerchantLogin from './Component/MerchantLogin';
import { Auth } from './Component/Auth';

// Import all pages
import Main from './Page/Main';
import ShoppingCartPage from './Page/ShoppingCartPage';
import ProductDetailPage from './Page/ProductDetailPage';
import LoginFormPage from './Page/LoginFormPage';
import RegisterFormPage from './Page/RegisterFormPage';
import MerchantLoginPage from './Page/MerchantLoginPage';
import UserDetailPage from './Page/UserDetailPage';
import MerchantDashboard from './Page/MerchantDashboard';
import EditListingPage from './Page/EditListingPage';
import OrderManagementPage from './Page/OrderManagementPage';

// Import styles
import './index.css';




// TBI: Loading animation...
const Loading = () => (<div className="loading">Loading...</div>);

// Layout for users, switch icon for logged in users
const Layout = ({ isPending, authenticated, children }) => (
	<div className="layout">
		<div className="header" style={{
			opacity: isPending ? 0.5 : 1
		}}>
			<Logo />
			{
				authenticated ? (
					<UserIcon />
				) : <Login />
			}
			<MerchantLogin />
			<ShoppingCart />
		</div>
		<div className="main">
			{children}
		</div>
		<div className="footer">
			<Logo />
			<div className="contact">
				<fieldset>
					<legend>Contact Me</legend>
					<span>Email:</span>
					<a 
					  href="mailto:goodjl233@gmail.com"
					  className="upgrade-contact-email"
					>
					goodjl233@gmail.com
					</a>
					<span>Phone:</span>
					<a
				      href="tel:7042945001"
					  className="upgrade-contact-phone"
					>
					(704)294-5001
					</a>
				</fieldset>
			</div>
		</div>
	</div>
	
);

const MerchantLayout = ({ isPending, children }) => (
	<div className="layout">
		<div className="header" style={{
			 opacity: isPending ? 0.5 : 1
		}}>
		    <Logo />
		</div>
		<div className="main">
			{children}
		</div>
		<div className="footer">
			<Logo />
			<div className="contact">
				<fieldset>
					<legend>Contact Me</legend>
					<span>Email:</span>
					<a 
					  href="mailto:goodjl233@gmail.com"
					  className="upgrade-contact-email"
					>
					goodjl233@gmail.com
					</a>
					<span>Phone:</span>
					<a
				      href="tel:7042945001"
					  className="upgrade-contact-phone"
					>
					(704)294-5001
					</a>
				</fieldset>
			</div>
		</div>
	</div>
);

// Router
const RouterComponent = () => {
	const [page, setPage] = useState('/');
	const [isAuthenticated, setAuthentication] = useState(false);
	const [isAdmin, setAdminAuth] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { authenticated, adminauth } = useContext(Auth);
	const navigate = (url) => {
		startTransition(() => {
			setPage(url);
		});
	};
	
	 useEffect(() => {
        const fetchUserAuthentication = () => {
            setAuthentication(authenticated);
			setAdminAuth(adminauth);
			console.log("Authentication status is:", isAuthenticated, adminauth);
        };

        startTransition(() => {
            fetchUserAuthentication();
        });
    }, [startTransition, authenticated, adminauth]);
	
	return (
		<Router>
			<Routes>
			  // All the following are Customer Routes
			  <Route 
				exact path="/"
				element={
					<Layout isPending={isPending}
						    authenticated={isAuthenticated}>
						<Main />
					</Layout>
				}
			  />
			  
			  <Route
				path="/loginform"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<LoginFormPage />
					</Layout>
				}
			  />
			  
			  <Route
			    path="/registerform"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<RegisterFormPage />
					</Layout>
				}
			  />
			  
			  <Route
				path="/productdetail/:id"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<ProductDetailPage />
					</Layout>
				}
			  />
			  
			  <Route
				path="/shoppingcart"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<ShoppingCartPage />
					</Layout>
				}
			  />
			  
			  <Route
			    path="/userdetail"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<UserDetailPage />
					</Layout>
				}
			  />
			  <Route
			    path="/merchantlogin"
				element={
					<Layout isPending={isPending}
							authenticated={isAuthenticated}>
						<MerchantLoginPage />
					</Layout>
				}
			  />
			  
			  // All the following are Merchant Routes
			  <Route
			    path="/dashboard"
				element={
					<MerchantLayout isPending={isPending}>
						<MerchantDashboard />
					</MerchantLayout>
				}
			  />
			  <Route
			    path="/dashboard/edit"
				element={
					<MerchantLayout isPending={isPending}>
						<EditListingPage />
					</MerchantLayout>
				}
			  />
			  <Route
			    path="/dashboard/orderdetails"
				element={
					<MerchantLayout isPending={isPending}>
						<OrderManagementPage />
					</MerchantLayout>
				}
			  />
			</Routes>
		</Router>
	);
};	

const AppRouter = () => (
	<Suspense fallback={<Loading />}>
		<RouterComponent />
	</Suspense>
);

export default AppRouter;
