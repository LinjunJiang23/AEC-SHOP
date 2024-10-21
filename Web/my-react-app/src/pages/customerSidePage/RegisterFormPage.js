// src/pages/customerSidePage/RegisterFormPage.js
import React from 'react';
import RegisterForm from '../../layouts/auth/RegisterForm';


const RegisterFormPage = () => (
		<div className="page register-form">
			<h1>Register</h1>
			<RegisterForm />
	  	</div>
);

export default React.memo(RegisterFormPage);