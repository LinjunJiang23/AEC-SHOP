import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const ShoppingCart 	= () => (
		<div className="shoppingcarticon">
			<Link to="/shoppingcart">
				<FaShoppingCart />
			</Link>
		</div>
);


export default ShoppingCart;