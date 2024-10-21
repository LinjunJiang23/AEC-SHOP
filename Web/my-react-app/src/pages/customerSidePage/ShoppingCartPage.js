// src/pages/customerSidePage/ShoppingCartPage.js
import React, { useState, useEffect, useContext } from 'react';

// Layouts
import ShoppingCartRow from '../../layouts/shoppingCart/ShoppingCartRow';
import PurchaseButton from '../../layouts/checkout/PurchaseButton';

// API
import { Auth } from '../../api/Auth';
import { getCartItems, getGuestCartItems, deleteFromGuestCart, deleteFromCart } from '../../api/services/cartServices';

// Styles
import './styles/ShoppingCartPage.css';


const ShoppingCartPage = () => {
  const { isLogIn } = useContext(Auth);
  const [items, setItems] = useState([]);
  const [subtotals, setSubtotals] = useState([]);
  const [total, setTotal] = useState(0.00);

  const handleSubtotalChange = (index, newSubtotal) => {

    const updatedSubtotals = [...subtotals];
    updatedSubtotals[index] = newSubtotal;
    setSubtotals(updatedSubtotals);
	
	const updatedTotal = updatedSubtotals.reduce((acc, curr) => acc + curr, 0);
	setTotal(updatedTotal);
  };

  const handleDeleteItem = async (product_id) => {
	  const updatedItems = items.filter(item => item.product_id !== product_id);
	  setItems(updatedItems);
	  if (isLogIn) {
	    await deleteFromCart(product_id);
	  } else {
		await deleteFromGuestCart(product_id);
	  }
  };


  useEffect(() => {
    // Call fetchItems to fetch items when component mounts
    const fetchData = async () => {
		let fetchedItems = [];
		if (isLogIn) {
			fetchedItems = await getCartItems();
	    } else {
			fetchedItems = await getGuestCartItems();
		}
		if (fetchedItems)
		{
			setItems(fetchedItems);
			const initialSubtotals = fetchedItems.map(item => item.price * item.quantity);
			setSubtotals(initialSubtotals);
		}
		
		
    };
	
    fetchData();
  }, [isLogIn]); // Include fetchItems in the dependency array



  useEffect(() => {

	const updatedTotal = subtotals.reduce((acc, curr) => acc + curr, 0);
	setTotal(updatedTotal);

  }, [subtotals]);  //Include subtotals as dependency array



  return (
  <div className="page">
    <h1>Shopping Cart</h1>
	{items.map((item, index) => (
	  <ShoppingCartRow 
	    key={item.product_id}
		item={item} 
		onSubtotalChange={(newSubtotal) => handleSubtotalChange(index, newSubtotal)}
		onDeleteItem={handleDeleteItem}/>
	))}
	<div className="display-total">
		<span>Total:</span>
		<span className="total">
		{total.toFixed(2)}
		</span>
	</div>
	<PurchaseButton total={total} />
  </div>
  );
};

export default ShoppingCartPage;
