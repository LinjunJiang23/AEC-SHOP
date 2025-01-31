// src/layouts/auth/ResetPWForm.js
import { useState } from 'react';

// Components
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';

const ResetPWForm = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState('');
  const handleContinue = (e) => {
	e.preventDefault();
	//Step one trigger a send reset verification code to the email
	if (step === 1) {
	  setStep(2);
	  return;
	}
	if (step === 2) {
	  //Verify the OTP
	}
  };
  	
  return (
	<Form className="reset-pw">
	  { step === 1 && (
	    <>
		  <h1>Password Assistance</h1>
		  <Input
			title="Enter Email Associated With the Account"
			type="email"
			maxLength="20"
			onChange={ (e) => setEmail(e.target.value) } 
		  />
		  <Button onClick={ handleSubmit }>
			Continue
		  </Button>
		</>
	  ) }
	  { step === 2 && (
		<>
		  <h1>Require verification</h1>
		  <span>We sent an email containing a One Time Password(OTP) to email ${email}, please enter OTP to verify.</span>
		  <Input
		    title="Enter OTP to Verify"
			minLength="6"
			maxLength="6"
			onChange={ (e) => setOTP(e.target.value) };
		  />
		</>
	  ) }
	</Form>
  );
};

export default ResetPWForm;