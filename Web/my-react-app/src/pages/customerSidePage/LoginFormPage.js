// src/pages/customerSidePage/LoginFormPage.js
import React from 'react';
import { Link } from 'react-router-dom';

// Layouts
import LoginForm from '../../layouts/auth/LoginForm';

// Styles
import './styles/LoginFormPage.css';


const LoginFormPage = () => (
		<div className="login-form">
			<LoginForm />
			<Link to="/resetpwform">
			  <span>Forgot your password?</span>
			</Link>
			<Link to="/registerform">
				<span>Register</span>
			</Link>
		</div>
);

export default React.memo(LoginFormPage);