// src/pages/Main.js
import { useEffect } from 'react';
import ProductGrid from '../layouts/ProductGrid/ProductGrid';
import { getProducts } from '../api/services/productServices';

const Main = () => {
	let products = [];
	
	useEffect(() => {
    getProducts(1, 10)
	.then(results => {
		products = results.products;
	});
  }, []);
	return (
		<ProductGrid limit={10} products={products}/>
	);
};

export default Main;