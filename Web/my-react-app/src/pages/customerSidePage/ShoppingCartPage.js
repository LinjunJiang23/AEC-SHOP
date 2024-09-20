import React, { useState, useEffect, useContext, memo } from 'react';
import { Link } from 'react-router-dom';

// Function
import { Auth } from '../../api/Auth';

// Styles
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import './ShoppingCartPage.css';

const updateQuantity = async (quantity, productId) => {
  try {
    const response = await fetch(`http://localhost:3001/CustomerRoute/updateCartQuantity`, {
      method: 'POST',
	  headers: {
			'Content-Type': 'application/json',
		},
	  body: JSON.stringify({ quantity, productId }),
	  credentials: 'include'    
	});
    if (!response.ok) {
      throw new Error('Failed to update product quantity');
    }
    const data = await response.json();
    console.log(data); // Log success message or handle response accordingly
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

const ShoppingCartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const minusQ = () => {
	const newq = quantity - 1;
	setQuantity(newq);
	updateQuantity(newq, item.product_id);
  };
  
  const plusQ = () => {
	const newq = quantity + 1;
	setQuantity(newq);
	updateQuantity(newq, item.product_id);
  };
  return (
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
    </>
	);
};
//This prevents unnecessary rerendering.
const MemoShoppingCartItem = memo(ShoppingCartItem);


const ShoppingCartRow = ({ items }) => {
  if (items !== "")
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
  const [items, setItems] = useState([]);
  const { getUserId } = useContext(Auth);
  const [subtotal, setSubtotal] = useState(0.00);
  const [user, setId] = useState();
  useEffect(() => {
    // Call fetchItems to fetch items when component mounts
    const fetchData = async () => {
	  const userId = getUserId();
	  setId(userId);
      const itemsData = await Fetch("shoppingcart", userId);
      setItems(itemsData);
	  const sub = await Fetch("carttotal", userId);
	  console.log(sub);
	  setSubtotal(sub[0].cart_total);
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
