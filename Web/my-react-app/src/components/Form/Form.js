import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

const Form = ({ className, onSubmit, children, ...props }) => {
	
	return (
	  <div className={'form-container'}>
	    <form 
		  className={`form ${className}`}
		  onSubmit={onSubmit}
		  {...props}>
		  {children}
		</form>
	  </div>
	);
};

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};



export default React.memo(Form);