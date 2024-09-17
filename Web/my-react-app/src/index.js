import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/Router';
import { AuthProvider } from './api/Auth';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);