import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Row from './Row';

describe('Row Component', () => {
	test('renders children elements correctly', () => {
		render(
		  <Row>
			<div>Child 1</div>
			<div>Child 2</div>
		  </Row>
		);
		
		expect(screen.getByText('Child 1')).toBeInTheDocument();
		expect(screen.getByText('Child 2')).toBeInTheDocument();
	});
	
	test('applies the className prop correctly', () => {
		const { container } = render(<Row className="custom-class">Test</Row>);
	
		expect(container.firstChild).toHaveClass('custom-class');
	});
	
	test('applies the additional props correctly', () => {
		const { container } = render(<Row data-testid="row" >Additional</Row>);
		
		expect(container.firstChild).toHaveAttribute('data-testid', 'row');
	});
});
