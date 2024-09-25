import React, { useEffect } from 'react';

// components
import Grid from '../../components/Grid/Grid';

// layouts
import ProductRow from '../ProductRow/ProductRow';

// styles
import './ProductGrid.css';

const ProductGrid = ({ products, style, paginationStyle, className, limit, ...props }) => {
  useEffect(() => {
  }, []);

  return (
	<Grid 
	  className={`product-grid ${className}` }
	  {...props}>
	  <ProductRow products={products} />
	</Grid>
  );
};

export default ProductGrid;
