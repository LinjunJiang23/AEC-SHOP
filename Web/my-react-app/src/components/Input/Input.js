import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({ title, type = "text", onChange, placeholder, value, required = false, className = '', ...props }, ref) => {
  const inputId = `${title.replace(/\s+/g, '-').toLowerCase()}-input`; // Generate a unique ID for the input

  return (
    <div className={`input ${className}`}>
      <label htmlFor={inputId}>
        <span>{title}</span>
      </label>
      <input 
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
		ref={ref}
        {...props}
      />
    </div>
  );
});

Input.propTypes = {
  title: PropTypes.string.isRequired, // Make title required for better accessibility
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url']), // Restrict type options
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default React.memo(Input);
