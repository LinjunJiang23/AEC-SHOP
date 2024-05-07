import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from '../Component/Auth';

import './styles/LoginFormPage.css';


const LoginForm = () => {
	const [accountName, setAccountName] = useState('');
	const [pw, setPassword] = useState('');
	const [error, setError] = useState('');
	const nav = useNavigate();
	const { login } = useContext(Auth); 
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login(accountName, pw); // Wait for the login function to complete
			console.log("Login successful");
			nav("/"); // Navigate to the homepage after successful login
		} catch (error) {
			setError(error.message); // Display any error message
			return;
		}
		
	};

	
	return (
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
	);
};


const LoginFormPage = () => {
	return (
		<div class="login-form">
			<h1>Login</h1>
			<LoginForm />
			<Link to="/registerform">
				<span>Register</span>
			</Link>
		</div>
	);
};

export default LoginFormPage;