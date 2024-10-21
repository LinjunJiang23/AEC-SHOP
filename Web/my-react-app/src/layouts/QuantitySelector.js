// src/layouts/QuantitySelector.js
import React, { useState, useContext } from 'react';
import { Auth } from '../api/Auth';
import { updateCartQuantity, updateGuestCartQuantity } from '../api/services/cartServices';

import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

const QuantitySelector = ({ className, item, onQuantityChange }) => {
	const [quantity, setQuantity] = useState(item.quantity);
    const [warning, setWarning] = useState();
	const { isLogIn } = useContext(Auth);
    const minusQ = () => {
	  if (quantity < 2) {
		  setWarning('Cannot be less than 1!');
	  } else {
	    const newq = quantity - 1;
	    setQuantity(newq);
	    if (isLogIn) {
	      updateCartQuantity(newq, item.product_id);
	    } else {
	      updateGuestCartQuantity(item, newq);
	    }
	  onQuantityChange(newq);
	  }
    };
  
  const plusQ = () => {
	setWarning();
	const newq = quantity + 1;
	setQuantity(newq);
	if (isLogIn) {
	  updateCartQuantity(newq, item.product_id);
	} else {
	  updateGuestCartQuantity(item, newq);
	}
	onQuantityChange(newq);
  };
	
	return (
	  <div className={`quantity-selector ${className}`}>
	    <>
			<span>Quantity:</span>
			<span><CiSquareMinus onClick={minusQ}/></span>
			<span className="item-function-action-quantity">
			  {quantity}
			</span>
			<span><CiSquarePlus onClick={plusQ}/></span>
		</>
		{warning && `Warning: ${warning}`}
	  </div>
	);
};

export default React.memo(QuantitySelector);