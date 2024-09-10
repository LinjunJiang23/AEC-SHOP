import * as React from 'react';
import { Link } from 'react-router-dom';

const NavigateIcon = ({ className, linkTo, addLogic, children }) => {
	
	const log = () => {
		addLogic();
	};
	
	return (
	    <div className={className}>
		  <Link to={linkTo}>
			  {children}
		  </Link>
		</div>
	);
};

export default NavigateIcon;