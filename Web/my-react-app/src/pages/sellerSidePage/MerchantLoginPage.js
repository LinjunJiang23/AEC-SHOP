import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from '../../api/Auth';

import './MerchantLoginPage.css';

const MerchantLoginForm = () => {
	const [accountName, setAccountName] = useState('');
	const [pw, setPassword] = useState('');
	const [error, setError] = useState('');
	const nav = useNavigate();
	const { adminlogin } = useContext(Auth);
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(accountName);
		console.log(pw);
		try {
			await adminlogin(accountName, pw);
			console.log("Admin Login successfully");
			nav("/dashboard"); //Navigate to merchant dashboard
		} catch (err) {
			setError(err.message);
			return;
		}
	};
	
	return (
		<form onSubmit={handleSubmit}>
		  <input
		    type="text"
			placeholder="Admin User/Email"
			value={accountName}
			onChange={(e) => setAccountName(e.target.value) }
			required
		  />
		  <input
		    type="password"
			placeholder="Admin Security Code"
			value={pw}
			onChange={(e) => setPassword(e.target.value) }
			required
		  />
		  <button type="submit">Admin Login</button>
		  {error && <div>{error}</div>}
		</form>
	);
	
};


const MerchantLoginPage = () => {
	return (
		<div className="loginform">
			<h1>Merchant Login</h1>
			<MerchantLoginForm />
			<span>Contact us to become a Registered Merchant!</span>
		</div>
	);
};

export default MerchantLoginPage;