import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router/Router';
import { AuthProvider } from './lib/Auth';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);