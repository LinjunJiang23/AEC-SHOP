// src/layouts/auth/ResetPWForm.js
import { useState } from 'react';

// Components
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';

// API
import {  } from '../../api/services/';

const ResetPWForm = () => {
	const [email, setEmail] = useState('');
	
	return (
		<Form 
		  className="reset-pw"
		  onSubmit={}>
		  <h1>Reset Your Password</h1>
		  <Input
		    title="Enter Email Associated With the Account"
			type="email"
			maxLength="20"
			onChange={(e) => setEmail(e.target.value)}/>
		  <Input 
		    title="Confirm Your Email"
			type="text"
			maxLength="10"
			onChange={}/>
		</Form>
	);
};

export default ResetPWForm;