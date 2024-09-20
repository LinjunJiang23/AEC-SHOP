// src/components/Header/Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'
import { Auth } from '../../api/Auth';
import Header from './Header';



describe('Header', () => {
	beforeEach(() => {
      jest.resetAllMocks();
    });
	
	
	test('applies the className prop correctly', () => {
		const mockAuthValue = {
			  isLogIn: false,
			  user: 'TestUser'
		};
		const { container } = render(	
			<Auth.Provider value={mockAuthValue}>
			  <BrowserRouter>
			    <Header 
			      className="custom-class" 
			      isLoggedIn={false}
			    />
			  </BrowserRouter>
			</Auth.Provider>
		);
		
		expect(container.firstChild).toHaveClass('custom-class');
	});
	
	test('applies the isLoggedIn correctly', () => {
		const mockAuthValue = {
			isLoggedIn: true,
			user: 'TestUser'
		};
		render(
		  <Auth.Provider value={mockAuthValue}>
		    <BrowserRouter>
			  <Header isLoggedIn={true}/>
			</BrowserRouter>
		  </Auth.Provider>);
		expect(screen.getByLabelText('User Profile')).toBeInTheDocument();
	});
	
	test('applies the isLoading style correctly', () => {
		const mockAuthValue = {
			isLoggedIn: true,
			user: 'TestUser'
		};
		render(
		  <Auth.Provider value={mockAuthValue}>
		    <BrowserRouter>
			  <Header isLoggedIn={true} isLoading={true}/>
			</BrowserRouter>
		  </Auth.Provider>
		);
		expect(screen.getByRole('banner')).toHaveStyle({opacity: 0.5});
	});
	
	test('applies logoRelated element correctly', () => {
		const mockAuthValue = {
			isLoggedIn: true,
			user: 'TestUser'
		};
		render(
		  <Auth.Provider value={mockAuthValue}>
		    <BrowserRouter>
			  <Header isLoggedIn={true} logoRelated={
				 <button>Logo</button> 
			  }/>
			</BrowserRouter>
		  </Auth.Provider>
		);
		expect(screen.getByText('Logo')).toBeInTheDocument();
	});
	
	test('applies authRelated element correctly', () => {
		const mockAuthValue = {
			isLoggedIn: false,
			user: 'TestUser'
		};
		render(
		  <Auth.Provider value={mockAuthValue}>
		    <BrowserRouter>
			  <Header isLoggedIn={false} authRelated={
				 <button>Auth</button> 
			  }/>
			</BrowserRouter>
		  </Auth.Provider>
		);
		expect(screen.getByText('Auth')).toBeInTheDocument();
	});
});