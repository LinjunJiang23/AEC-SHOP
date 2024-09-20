import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from "react-icons/md";

import './AddToCartButton.css';


const postToCart = (ProductId, quantity) => {
	fetch(`http://localhost:3001/CustomerRoute/addToCart/${ProductId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ quantity: quantity }),
		credentials: 'include'
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to add item to cart');
		}
		return response.json();
	})
	.then(data => {
		console.log(data.message);
	})
	.catch(error => {
		console.error('Error adding item to cart:', error);
	});
};

const AddToCartButton = ({ ProductId, quantity }) => (
	  <div 
	    className="button-addtocart" 
		onClick={ () => postToCart(ProductId, quantity) }
	  >
			<MdAddShoppingCart 
			    className="cart-icon" 
			    size={50} // Adjust the size of the icon as needed
			    color="#fff" />
      </div>
);

export default AddToCartButton;
