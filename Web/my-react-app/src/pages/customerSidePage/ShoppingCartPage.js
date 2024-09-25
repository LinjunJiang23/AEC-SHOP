import React, { useState, useEffect, useContext, memo } from 'react';
import { Link } from 'react-router-dom';

// Components

// API
import { Auth } from '../../api/Auth';
import { updateCartQuantity, getCartItems, getCartTotal, getGuestCartItems } from '../../api/services/cartServices';


// Styles
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import './ShoppingCartPage.css';

const ShoppingCartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const minusQ = () => {
	const newq = quantity - 1;
	setQuantity(newq);
	updateCartQuantity(newq, item.product_id);
  };
  
  const plusQ = () => {
	const newq = quantity + 1;
	setQuantity(newq);
	updateCartQuantity(newq, item.product_id);
};
  
  return (
    <div>
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
			<span><CiSquareMinus onClick={minusQ}/></span>
			<span className="item-function-action-quantity">
			  {quantity}
			</span>
			<span><CiSquarePlus onClick={plusQ}/></span>
		</span>
		<span className="item-function-delete">
		<input 
		   className="item-function-action-delete"
	 	   type="submit"
		   value="Delete"/>
		</span>
	  </div>
    </div>
	);
};
//This prevents unnecessary rerendering.
const MemoShoppingCartItem = memo(ShoppingCartItem);


const ShoppingCartRow = ({ items }) => {
  if (items)
  {
	return (
		<ul className="shoppingcart-item-grid">
			{items.map((item, index) => (
			<li key={index}>
				<MemoShoppingCartItem item={item} />
			</li>
		))}
	</ul>
	);
  }
};
//This prevents unnecessary rerendering.
const MemoShoppingCartRow = memo(ShoppingCartRow);


const ShoppingCartPage = () => {
  const { user, isLogIn } = useContext(Auth);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0.00);
  useEffect(() => {
    // Call fetchItems to fetch items when component mounts
    const fetchData = async () => {
		if (isLogIn) {
			const items = await getCartItems();
			setItems(items);
	    } else {
			const items = await getGuestCartItems();
			setItems(items);
		}
	  /* const sub = await getCartTotal();
	  if (sub.data)
	  {
	    setSubtotal(sub.data[0].cart_total);
	  } */
    };
    fetchData();
  }, [subtotal, items]); // Include fetchItems in the dependency array

  return (
  <div className="page">
    <h1>Shopping Cart</h1>
	<MemoShoppingCartRow items={items}/>
	<div className="display-total">
		<span>Subtotal:</span>
		<span className="subtotal">
		${subtotal}
		</span>
	</div>
  </div>
  );
};

export default ShoppingCartPage;
