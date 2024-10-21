import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

import './styles/ShoppingCartIcon.css';

const ShoppingCartIcon 	= () => (
		<div className="shoppingcarticon">
			<Link to="/shoppingcart">
				<FaShoppingCart />
			</Link>
		</div>
);


export default React.memo(ShoppingCartIcon);