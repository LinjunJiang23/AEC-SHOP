import * as React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<Link to="/loginform">
			<div className="button-login">Login/Register</div>
		</Link>
	);
};

export default Login;