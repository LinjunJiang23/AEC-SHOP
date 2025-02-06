// src/layouts/AuthButtons/AuthButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Button from '../../components/Button/Button';

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
	<div className='section auth-buttons'>
	  <div className='customer-auth'>
		<Button onClick={ () => {
		  navigate('/loginform');
		}}>
		  Login
		</Button>
		<span>/</span>
		<Button onClick={ () => {
		  navigate('/registerform');
		}}>
		  Register
		</Button>
	  </div>
	  <div className='seller-auth'>
		<Button onClick={ () => {
		  navigate('/sellerloginform');
		}>
		  I am a seller.
		</Button>
	  </div>
	</div>
	);
};

export default React.memo(AuthButtons);