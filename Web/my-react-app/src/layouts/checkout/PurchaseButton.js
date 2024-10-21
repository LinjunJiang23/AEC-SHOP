// src/layouts/checkout/PurchaseButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Button from '../../components/Button/Button';

// Styles
import './styles/PurchaseButton.css';
import { IoBagCheckOutline } from "react-icons/io5";

const PurchaseButton = ({ total }) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/payment', { state: { total } });
  };
  
  return (
     <Button onClick={handleCheckout} className='purchase'>
		<IoBagCheckOutline 
		  size={50}/>
     </Button>
  );
};

export default React.memo(PurchaseButton);