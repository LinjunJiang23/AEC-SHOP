import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/Router';
import { AuthProvider } from './api/Auth';

//Create root
const domNode = document.getElementById('root');
const root = createRoot(domNode);


//Root renders the approuter wrapped inside auth provider layer
root.render(
  <React.StrictMode>
	<AuthProvider>
	  <AppRouter />
	</AuthProvider>
  </React.StrictMode>,
);