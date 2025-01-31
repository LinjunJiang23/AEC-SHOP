import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/** 
 * 
 */
 
const MerchantMainPage = () => {
  const navigate = useNavigate();
  return (
	<div className="merchantMain">
	  <h1>Join and Become a Merchant Today!</h1>
	  <Button onClick={() => navigate('/seller/signup')}>
	    Sign Up
	  </Button>
	</div>
  );
};