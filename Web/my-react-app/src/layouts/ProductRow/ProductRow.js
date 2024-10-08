import React from 'react';
import ProductCard from '../ProductCard';

const ProductRow = ({ products }) => {
	return (
		<ul className="summary-product-grid">
		  {products.map((product, index) => (
		  <li key={index}>
            <ProductCard product={product} />
			console.log(product);
		  </li>
		  ))}
		</ul>
	);
};

export default ProductRow;