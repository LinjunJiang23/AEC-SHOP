import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
	
	//Database parameters
	const [accountName, setAccountName] = useState('');
	const [pw, setPassword] = useState('');
	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [phoneNum, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState(null);
	
	//Modal state
	const [showModal, setShowModal] = useState(false);
	const nav = useNavigate();
	
	
	
	const handleSubmit = async(event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/CustomerRoute/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ accountName, pw, fname, lname, phoneNum, email })
			});
			  console.log("Registered!");
			  setShowModal(true);
		} catch (error) {
			setError(error.message);
		}
	};
	
	return (
	<div className="container-form">  
	  <div className="registerForm">
		<form onSubmit={handleSubmit}>
		  <input
			type="text"
			placeholder="User Name"
			minLength="8"
			maxLength="15"
			value={accountName}
			onChange={(e) => setAccountName(e.target.value)}
			required
		  />
		  <input
			type="password"
			placeholder="Password"
			minLength="8"
			maxLength="15"
			value={pw}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		  <input
		    type="text"
			placeholder="First Name"
			value={fname}
			onChange={(e) => setFName(e.target.value)}
			required
		  />
		  <input
		    type="text"
			placeholder="Last Name"
			value={lname}
			onChange={(e) => setLName(e.target.value)}
			required
		  />
		  <input
			type="tel"
			placeholder="Phone Number"
			value={phoneNum}
			pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
			onChange={(e) => setPhone(e.target.value)}
			required
		  />
		  <input
		    type="email"
			placeholder="Email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		  <button type="submit">Register</button>
		  {error && <div>{error}</div>}
		</form>
	  </div>
	  { showModal && (
	    <div className="modal">
	      <div className="modal-content">
		    <button className="close" onClick={() => {
			    setShowModal(false);
			    nav('/registerform');
	  	    }}>&times;</button>
		    <h1>Welcome!</h1>
		    <span>You successfully registered.</span>
		    <button onClick={() => nav('/loginform')}>Login</button>
	     </div>
	    </div>
	  )}
	</div>
	);
};

const RegisterFormPage = () => (
		<div className="login-form">
			<h1>Register</h1>
			<RegisterForm />
	  	</div>
);

export default RegisterFormPage;