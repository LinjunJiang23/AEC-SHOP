import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// components
import ShoppingCartLayouts from '../ShoppingCart';
import CSUserIconLayouts from '../UserIcon';
import CSLogoLayouts from '../Logo';
import CSNavigationBarLayouts from '../Navigation';


// static lib
import logo from './logo.png';

//services
import { Auth } from '../../lib/Auth';

/**
   A header template that organizes all the elment in a header
   @param {boolean} isPending - identify whether element is loading or not
*/
const Header = ({ isPending }) => {
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
			<NavigateIcon linkTo="/merchantlogin" className="button-login">
				<button>Seller Login</button>
			</NavigateIcon>
			<ShoppingCart />
		</div>
	);
};
		
		
export default Header;