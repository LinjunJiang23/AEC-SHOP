// src/layouts/AddToCartButton.js
import { useContext } from 'react';
import { MdAddShoppingCart } from "react-icons/md";

import Button from '../components/Button/Button';


import { Auth } from '../api/Auth';
import { addToCart, addToGuestCart } from '../api/services/cartServices';

import './AddToCartButton.css';

const AddToCartButton = ({ item, quantity }) => {
	const { isLogIn } = useContext(Auth);
	const handleAddToCart = async () => {
		if (isLogIn) {
			addToCart(item.product_id, quantity);
		} else {	
			const cartItem = {
			  product_id: item.product_id,
			  product_name: item.product_name,
			  price: item.price,
			  img_url: item.img_url,
			  quantity: quantity,
			};
			addToGuestCart(cartItem, quantity);
		}
	};
	  
	return (
	  <Button 
	    className={"add-to-cart"} 
		onClick={ () => handleAddToCart(item, quantity) }
	  >
			<MdAddShoppingCart 
			    className="cart-icon" 
			    size={50} // Adjust the size of the icon as needed
			    color="#fff" />
      </Button>
	);
};

export default AddToCartButton;
