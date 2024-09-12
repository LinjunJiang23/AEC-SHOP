import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
	test('applies the className prop correctly', () => {
		const { container } = render(
		  <Router>
			<Header 
			  className="custom-class" 
			  isLoggedIn={false}
			></Header>
		  </Router>
		);
		
		expect(container.firstChild).toHaveClass('custom-class');
	});
	
	test('applies the isLoggedIn correctly', () => {
		const { container } = render(
		  <Router>
		    <Header isLoggedIn={true}></Header>
		  </Router>);
		expect(container.firstChild).toHaveAttribute('isLoggedIn', true);
	});

});