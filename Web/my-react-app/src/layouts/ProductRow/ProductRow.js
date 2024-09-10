import React from 'react';
import Row from '../../components/Row';
import ProductCard from '../ProductCard/ProductCard';

const ProductRow = ({ products }) => {
	return (
		<ul className="summary-product-grid">
		  {products.data.map((product, index) => (
		  <li key={index}>
            <ProductCard product={product} />
			console.log(product);
		  </li>
		  ))}
		</ul>
	);
};

export default ProductRow;