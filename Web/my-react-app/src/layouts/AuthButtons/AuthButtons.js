// src/layouts/AuthButtons/AuthButtons.js
import React from 'react';
import Button from '../../components/Button/Button';

const AuthButtons = () => {
	return (
	  <div className='section auth-buttons'>
		<div className='customer-auth'>
		  <Button>
		    Login
		  </Button>
		  <span>/</span>
		  <Button>
		    Register
		  </Button>
		</div>
		<div className='seller-auth'>
		  <Button>
		    I am a seller.
		  </Button>
		</div>
	  </div>
	);
};

export default AuthButtons;