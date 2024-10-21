// src/pages/customerSidePage/PaymentPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


// API
import { verifyPayment } from '../../api/services/checkoutServices';


// Layouts
import PaymentForm from '../../layouts/checkout/PaymentForm';



const stripePromise = loadStripe('pk_test_51Q307SP1qHg19sZl9E0v27JPtHOnsQB4BlgxAh8OrhbCxbQc2FixV6fSXBRYY4eEwL3j71hTdJxR89GCZZmV4TiX00ezoxXG7L');


const PaymentPage = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  const [total, setTotal] = useState(location.state?.total);

  useEffect( () => {
	  const createPaymentIntent = async () => {
    // Call your backend to create the Payment Intent
        const secret = await verifyPayment(total);
		setClientSecret(secret);
	  };
	  if (total) {
	    createPaymentIntent();
	  }
  }, []);

  return (
    <Elements stripe={stripePromise}>
		{ clientSecret ? <PaymentForm clientSecret={clientSecret} />
		: <h1>Loading...</h1> }
    </Elements>
  );
};

export default PaymentPage;