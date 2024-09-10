import React from 'react';

const Button = ({ className, onClick, disabled, children, style }) => {
	
	return (
	  <div className={className}>
		<button onClick={onClick} disabled={disabled}>
			{children}
		</button>
	  </div>
	);

};

export default Button;