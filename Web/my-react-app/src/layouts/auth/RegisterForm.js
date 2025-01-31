// src/layouts/auth/RegisterForm.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Notification from '../../components/Notification/Notification';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// Layouts
import PWNotification from './PWNotification';

// API
import { registerUser } from '../../api/services/authServices';



const RegisterForm = ({ type }) => {
  //Database parameters
  const [accountName, setAccountName] = useState('');
  const [pw, setPassword] = useState('');
  const [confirmPW, setConfirmPassword] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phoneNum, setPhone] = useState('');
  const [email, setEmail] = useState('');
	
  // Error message
  const [error, setError] = useState(null);
  const [focusIn, setFocusIn] = useState(null);
	
  // Modal state
  const [showModal, setShowModal] = useState(false);
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [showConfirmNotif, setShowConfirmNotif] = useState(false);
  const [success, setSuccess] = useState(false);
	
  // Ref element, used to change focus
  const pwRef = useRef(null);
  const confirmPWRef = useRef(null);
	
  // Navigate element
  const nav = useNavigate();
	
  // Turn on or off the modal after submit request
  const handleSubmit = async(event) => {
	event.preventDefault();
		
	/* DO NOT ALLOW SUBMIT ON FOLLOWING CONDIITONS:
	 1. Password does not met the format requirement, or
	 2. Confirm password does not match password
	*/
	if (!success) {
	  setError('Password format does not meet requirements. ');
	  setFocusIn(pwRef);
	  return false;
	}

	if (confirmPW !== pw) {
	  setError('Please enter the correct confirm password.');
	  setFocusIn(confirmPWRef);
	  return false;
	}
		
	try {
	  setError(null);
	  const newUser = {
		accountName: accountName,
		pw: pw,
		fname: fname,
		lname: lname,
		phoneNum: phoneNum,
		email: email
	  };
	  const response = await registerUser(newUser);
	  setShowModal(true);
	} catch (error) {
	  setError(error.message);
	  setShowModal(true);
	}
  };
	
  const pwStyle = {
	borderColor: 'red'
  };
	
	
  useEffect(() => {
	const checkConfirmPW = () => {
	  if (confirmPW !== pw) {
		setShowConfirmNotif(true);
	  } else {
		setShowConfirmNotif(false);
	  }
	};
	checkConfirmPW();
  }, [pw, confirmPW]);
	
  return (
	<>
	  <Form 
		onSubmit={handleSubmit}
		className="register-form"
	  >
		<Input
		  title="User Name (You can change this later on)"
		  type="text"
		  minLength="4"
		  maxLength="15"
		  value={accountName}
		  onChange={(e) => setAccountName(e.target.value)}
		  required={true}
		/>
		<Input
		  title="Email"
		  type="email"
		  placeholder="e.g., user111@email.com"
		  maxLength="20"
		  value={email}
		  onChange={(e) => setEmail(e.target.value)}
		  required={true}
		/>
		<Input
		  title="Password"
		  type="password"
		  minLength="8"
		  maxLength="15"
		  value={pw}
		  onChange={(e) => setPassword(e.target.value)}
		  required={true}
		  onFocus={() => setShowNotification(true)}
		  onBlur={() => setShowNotification(false)}
		  style={!success ? pwStyle : {}} // If requirement not met, the border of the input is red
		  ref={pwRef}
		/>
		{showNotification && <PWNotification pw={pw} onSuccess={isSuccess => setSuccess(isSuccess)}/>}
		<Input
		  title="Confirm Password"
		  type="password"
		  minLength="8"
		  maxLength="15"
		  value={confirmPW}
		  onChange={(e) => setConfirmPassword(e.target.value)}
		  style={showConfirmNotif ? pwStyle : {}}
		  required={true}
		  ref={confirmPWRef}
		/>
		{showConfirmNotif && <span>Password does not match</span>}
		<Input
		  title="First Name"
		  type="text"
		  value={fname}
		  maxLength="15"
		  onChange={(e) => setFName(e.target.value)}
		  required={true}
		/>
		<Input
		  title="Last Name"
		  type="text"
		  value={lname}
		  maxLength="15"
		  onChange={(e) => setLName(e.target.value)}
		  required
		/>
		<Input
		  title="Phone Number"
		  type="tel"
		  value={phoneNum}
		  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		  onChange={(e) => setPhone(e.target.value)}
		  required
		/> 
		<Button type="submit">Register</Button>
		  {error && <ErrorMessage message={error} focusIn={focusIn} />}
		</Form>
	  { showModal && ( error ? (
	      <Modal onClose={() => {
		  setShowModal(false);}}
				 onConfirm={() => {
				 setShowModal(false);}}
				 confirmBut="Try again"
				 >
		    <span>{error}.</span>
		  </Modal>
		) : (
	    <Modal onClose={() => {
			setShowModal(false);
		}}
			   closeBut='x'
			   onClose={() => nav('/products')}
			   title="Welcome!"
			   onConfirm={() => nav('/loginform')}
			   confirmBut="Login">
		    <span>You successfully registered.</span>
	     </Modal>
	  ))}
	</>
	);
};

export default RegisterForm;