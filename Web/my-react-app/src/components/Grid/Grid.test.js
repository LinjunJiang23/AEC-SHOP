import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from './Grid';

describe('Grid Component', () => {
	test('renders children elements correctly', () => {
		render(
		  <Grid>
			<div>Child 1</div>
			<div>Child 2</div>
		  </Grid>
		);
		
		expect(screen.getByText('Child 1')).toBeInTheDocument();
		expect(screen.getByText('Child 2')).toBeInTheDocument();
	});
	
	test('applies the className prop correctly', () => {
		const { container } = render(<Grid className="custom-class">Test</Grid>);
	
		expect(container.firstChild).toHaveClass('custom-class');
	});
	
	test('applies the columns prop correctly',  () => {
		const { container } = render(<Grid columns="repeat(auto-fit, minmax(50px, 1fr))">Test</Grid>);
		
		expect(container.firstChild).toHaveStyle('gridTemplateColumns: repeat(auto-fit, minmax(50px, 1fr))');
	});
	
	test('applies the columns prop correctly',  () => {
		const { container } = render(<Grid gap="50px">Test</Grid>);
		
		expect(container.firstChild).toHaveStyle('gap: 50px');
	});
	
	test('applies the additional props correctly', () => {
		const { container } = render(<Grid data-testid="grid" >Additional</Grid>);
		
		expect(container.firstChild).toHaveAttribute('data-testid', 'grid');
	});
});
