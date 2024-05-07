import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
	const [accountName, setAccountName] = useState('');
	const [pw, setPassword] = useState('');
	const [error, setError] = useState(null);
	
	const nav = useNavigate();
	
	const handleSubmit = async(event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/CustomerRoute/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ accountName, pw })
			});
			if (!response.ok) {
				throw new Error('Register failed');
			}
			// Redirect to login
			nav('/loginform');
		} catch (error) {
			setError(error.message);
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
		  <button type="submit">Register</button>
		  {error && <div>{error}</div>}
		</form>
	);
};

const RegisterFormPage = () => (
		<div className="login-form">
			<h1>Register</h1>
			<RegisterForm />
		</div>
);

export default RegisterFormPage;