// src/components/Notification/Notification.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";

/**
 *
 */
const Notification = ({ value, minLength = null, maxLength = null, containNumber = false, containUppercase = false, 
						containSpecialChar = false, onSuccess, otherCondition = false, otherMessage, className = '' }) => {
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const validateInput = () => {  
	if (minLength && value.length < minLength) {
	  setMessage(`Minimum length of ${minLength} is required.`);
	  setSuccess(false);
	} else if (maxLength && value.length > maxLength) {
	  setMessage(`Maximum length of ${maxLength} is required.`);
	  setSuccess(false);
	} else if (containNumber && !/\d/.test(value)) {
	  setMessage('Must contain at least one number.');
	  setSuccess(false);
	} else if (containUppercase && !/[A-Z]/.test(value)) {
	  setMessage('Must contain at least one uppercase letter.');
	  setSuccess(false);
	} else if (containSpecialChar && !/[!@#$%^&*?|]/.test(value)) {
	  setMessage('Must contain one special character (!@#$%^&*?|).');
	  setSuccess(false);
	} else if (otherCondition && otherCondition) {
	  setMessage(otherMessage);
	} else {
	  setSuccess(true);
	  onSuccess(true);
	}
  };
	
  useEffect(() => {
	validateInput();
  }, [value]);

  return (
	<div className={`notification ${className}`}>
	  { message && (
		<>
		  { isSuccess ? (
			  <IoIosCheckmark color="green" size={20}/>
		    ) : (
			  <HiMiniXMark color="red" size={20}/>
			)
		  }
		  <span>{message}</span>
		</>
	   )
	  }
	</div>
  );
};

Notification.propTypes = {
  value: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  containNumber: PropTypes.bool,
  containUppercase: PropTypes.bool,
  containSpecialChar: PropTypes.bool,
  otherCondition: PropTypes.node,
  otherMessage: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Notification);