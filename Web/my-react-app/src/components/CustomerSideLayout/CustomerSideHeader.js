import React, { useState, useEffect, useContext } from 'react';

// components
import ShoppingCart from './ShoppingCart';
import UserIcon from './UserIcon';
import Logo from './Logo';
import Auth from '../NavigationBar';

/**
   A header template that organizes all the elment in a header
   @param {boolean} isPending - identify whether element is loading or not
*/
const CustomerSideHeader = ({ isPending }) => {
	const [isAuthenticated, setAuthentication] = useState(false);
	const { authenticated } = useContext(Auth);

	useEffect(() => {
      setAuthentication(authenticated);		
    }, [authenticated]);
	
	return (
		<div className="header" style={{
			opacity: isPending ? 0.5 : 1
		}}>
			<Logo logoSrc={logo} mainLink={'/'}/>
			{
				isAuthenticated ? (
					  <UserIcon />
				 ) : (
					 <NavigateIcon linkTo="/loginform" className="login">
						<div className="button-login">
			              <button>Login</button>
			            </div>
					 </NavigateIcon>
				 )
			}
			<Button linkTo="/merchantlogin" className="button-login">
				<button>Seller Login</button>
			</NavigateIcon>
			<ShoppingCart />
		</div>
	);
};
		
		
export default Header;