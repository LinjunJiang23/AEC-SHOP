// src/pages/customerSidePage/LoginFormPage.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from '../../api/Auth';

import './LoginFormPage.css';


const LoginForm = () => {
	const [accountName, setAccountName] = useState('');
	const [pw, setPassword] = useState('');
	const [error, setError] = useState('');
	
	const [showModal, setShowModal] = useState(false);
	const nav = useNavigate();
	const { login } = useContext(Auth); 
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login(accountName, pw); // Wait for the login function to complete
			setShowModal(true);
		} catch (error) {
			setError(error.message); // Display any error message
			return;
		}
		
	};

	
	return (
	<div className="container-login">
	    <div className="loginform">
		<form onSubmit={handleSubmit}>
		  <input 
			type="text" 
			placeholder="Username/Email"
			value={accountName}
			onChange={(e) => setAccountName(e.target.value)}
			required 
		  />
		  <input 
			type="password" 
			placeholder="Password"
			value={pw}
			onChange={(e) => setPassword(e.target.value)}
			required 
		  />
		  <button type="submit">Login</button>
		  {error && <div className="error-userlogin">{error}</div>}
		</form>
	    </div>
		{ showModal && (
	    <div className="modal">
	      <div className="modal-content">
		    <button className="close" onClick={() => {
			    setShowModal(false);
			    nav('/');
	  	    }}>&times;</button>
		    <h1>Welcome!</h1>
		    <span>You successfully login.</span>
	      </div>
	    </div>
	  )}
	</div>

	);
};


const LoginFormPage = () => (
		<div className="login-form">
			<h1>Login</h1>
			<LoginForm />
			<Link to="/registerform">
				<span>Register</span>
			</Link>
		</div>
);

export default LoginFormPage;