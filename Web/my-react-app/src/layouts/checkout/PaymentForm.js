// src/layouts/checkout/PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('default');
  const [name, setName] = useState('default');
  const [address1, setAddress1] = useState('default');
  const [address2, setAddress2] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    if (!stripe || !card) {
      return; // Stripe.js has not yet loaded
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
		  name: name,
		  email: email,
		  address: {
			line1: address1,
		    line2: address2
		  }
        },
      },
    });

    if (error) {
      setPaymentError(error.message);
	  setShowModal(true);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
	  setShowModal(true);
    }
	
  };

  const handleSuccessPayment = () => {
	  setShowModal(false);
	  navigate('/products');

  };

  return (
    <Form onSubmit={handleSubmit}>
	  <Input 
	    title='Email'
		type='email'
		required={true}
		onChange={(e) => setEmail(e.target.value)}/>
	  <label>
	    <span>Card Information</span>
	  </label>
	  <CardElement />
	  <Input
	    title='Name On Card'
		type='text'
		required={true} 
		onChange={(e) => setName(e.target.value)}/>
	  <Input
	    title='Billing Information 1'
		type='text'
		required={true} 
		onChange={(e) => setAddress1(e.target.value)}/>
	  <Input
	    title='Billing Information 2'
		type='text' 
		onChange={(e) => setAddress2(e.target.value)}/>
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
	  {showModal && (
	    <>
          {paymentError && (
			<Modal 
				title='Payment Error!'
				className='payment-error'
				onClose={() => setShowModal(false)}
				onConfirm={() => setShowModal(false)}
				confirmBut='Okay'>
			  <span>Error: {paymentError} Please Try Again.</span>
			</Modal>)}
          {paymentSuccess && (
		    <Modal 
				title='Payment Successful!'
				className='payment-success'
				onClose={() => setShowModal(false)}
				onConfirm={() => handleSuccessPayment()}
				confirmBut='OK'>
			  <span>Payment successful!</span>
			</Modal>)}
		</>
	  )}
    </Form>
  );
};

export default React.memo(PaymentForm);
