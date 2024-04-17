import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router';
import { AuthProvider } from './Component/Auth';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);