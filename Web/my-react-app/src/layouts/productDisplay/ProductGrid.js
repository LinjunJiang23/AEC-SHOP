// src/layouts/productDisplay/ProductGrid.js
import React, { useEffect } from 'react';

// components
import Grid from '../../components/Grid/Grid';

// layouts
import ProductCard from './ProductCard';

// styles
import './styles/ProductGrid.css';

const ProductGrid = ({ products, limit, ...props }) => {
  useEffect(() => {
  }, []);

  return (
	<Grid 
	  className='products'
	  {...props}>
	  <div className="summary-product">
		  {products.map((product, index) => (
		  <div key={index}>
            <ProductCard product={product} />
		  </div>
		  ))}
	  </div>
	</Grid>
  );
};

export default React.memo(ProductGrid);
