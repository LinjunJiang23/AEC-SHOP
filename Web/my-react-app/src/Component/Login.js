import * as React from 'react';
import { Link } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
	return (
	  <div className="login">
		<Link to="/loginform">
			<div className="button-login">
			  <span>Login</span>
			</div>
		</Link>
		<span>/</span>
		<Link to="/registerform">
			<div className="button-register">
			  <span>Register</span>
			</div>
		</Link>
	  </div>
	);
};

export default Login;