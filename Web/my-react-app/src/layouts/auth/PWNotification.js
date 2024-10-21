// src/layouts/auth/PWNotification.js;
import { useState, useEffect } from 'react';
// Component
import Notification from '../../components/Notification/Notification';

const PWNotification = ({pw, onSuccess}) => {
  const [success, setSuccess] = useState({
	minLength: false,
	containUppercase: false,
	containSpecialChar: false,
	containNumber: false
  });
  
  const handleSuccess = (key, value) => {
	setSuccess(prevState => ({
		...prevState,
		[key]: value
	}));
  };
  
  const allSuccess = Object.values(success).every(value => value);
  
  useEffect(() => {
	if (allSuccess) {
		onSuccess(allSuccess);
	}
  }
  , [allSuccess]);
  
  return (
	<div className="password-notification">
	  <Notification minLength={8} value={pw} onSuccess={(isSuccess) => {handleSuccess('minLength', isSuccess)}}/>
	  <Notification containUppercase={true} value={pw} onSuccess={(isSuccess) => {handleSuccess('containUppercase', isSuccess)}}/>
	  <Notification containSpecialChar={true} value={pw} onSuccess={(isSuccess) => {handleSuccess('containSpecialChar', isSuccess)}}/>
	  <Notification containNumber={true} value={pw} onSuccess={(isSuccess) => {handleSuccess('containNumber', isSuccess)}}/>
	</div>
  );
};

export default PWNotification;