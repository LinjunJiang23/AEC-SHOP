// src/components/ErrorMessage/ErrorMessage.js
import { useEffect } from 'react';

const ErrorMessage = ({ message, focusIn, blurIn, onFocus }) => {
	
	useEffect(() => {
		if (focusIn && focusIn.current) {
			focusIn.current.focus();
		}
	}, [focusIn]);
	
	return (
		<div className="error-message">
			<span>
				{message}
			</span>
		</div>
	);
};

export default ErrorMessage;