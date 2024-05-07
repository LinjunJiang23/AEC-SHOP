import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Function
import { Auth } from '../Component/Auth';
import Fetch from '../lib/Fetch';

// Styles
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import './styles/ShoppingCartPage.css';
const ShoppingCartItem = ({ item }) => (
  <>
    <Link to={`/productdetail/${item.product_id}`} style={{ textDecoration: 'none' }}>
      <div className="item">
        <img className="summary-image" src={item.img_url} alt={item.product_name} />
        <span className="item-title">{item.product_name}</span>
        <span className="item-price">${item.price}</span>
      </div>
	</Link>
	  <div className="item-function">
	    <span className="item-function-quantity">
			<span>Quantity:</span>
			<span><CiSquareMinus /></span>
			<span className="item-function-action-quantity">
			  {item.quantity}
			</span>
			<span><CiSquarePlus /></span>
		</span>
		<span className="item-function-delete">
		<input 
		   className="item-function-action-delete"
	 	   type="submit"
		   value="Delete"/>
		</span>
	  </div>
  </>
);

const ShoppingCartRow = ({ items }) => {
  if (items !== "")
  {
	return (
		<ul className="shoppingcart-item-grid">
			{items.map((item, index) => (
			<li key={index}>
				<ShoppingCartItem item={item} />
			</li>
		))}
	</ul>
	);
  }
};


const ShoppingCartPage = () => {
  const [items, setItems] = useState([]);
  const { getUserId } = useContext(Auth);
  useEffect(() => {
    // Call fetchItems to fetch items when component mounts
    const fetchData = async () => {
	  const userId = getUserId();
      const itemsData = await Fetch("shoppingcart", userId);
      setItems(itemsData);
    };
    fetchData();
  }, []); // Include fetchItems in the dependency array

  return (
  <div className="page">
    <h1>Shopping Cart</h1>
	<ShoppingCartRow items={items} />
	<div className="display-total">
		<span>Subtotal:</span>
		<span className="subtotal">0.00</span>
	</div>
  </div>
  );
};

export default ShoppingCartPage;
