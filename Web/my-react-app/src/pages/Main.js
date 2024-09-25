// src/pages/Main.js
import { useState, useEffect, useRef } from 'react';
import ProductGrid from '../layouts/ProductGrid/ProductGrid';
import PageDisplay from '../layouts/PageDisplay';

import { getProducts } from '../api/services/productServices';



const Main = () => {
	const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
	const cachedPages = useRef({});
	
	useEffect(() => {
	  const fetchProducts = async () => {
	  if (cachedPages.current[currentPage]) { 
		setProducts(cachedPages.current[currentPage]);
	  } else {
		getProducts(currentPage, 10)
		.then(results => {
		  cachedPages.current[currentPage] = results.data.products;
		  setProducts(results.data.products);
		  setCurrentPage(results.data.page);
		  setTotalPages(results.data.totalPages);
		});
	  }
	};
	  fetchProducts();
  }, [currentPage]);
  
  const handlePageChange = (newPage) => {
	setCurrentPage(newPage);
  };
  
	return (
	  <div>
		<ProductGrid limit={10} products={products}/>
		<PageDisplay 
	    currentPage={currentPage} 
		totalPages={totalPages} 
		onPageChange={handlePageChange} 
        />
	  </div>
	);
};

export default Main;