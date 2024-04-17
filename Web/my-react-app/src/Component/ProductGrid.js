import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../Component/AddToCartButton';
import './styles/ProductGrid.css';

const urlBase = 'http://localhost:3001/CustomerRoute/productGeneral';

const fetchProduct = async () => {
  try {
    const response = await fetch(urlBase, {
		method: 'GET',
		credentials: 'include'
	});
    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }
    const data = await response.json();
	console.log('Parsed JSON data:', data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

const ProductCard = ({ product }) => (
   
   <>
     <Link to={`/productdetail/${product.product_id}`}
		style={{ textDecoration: 'none' }} 
	 >
       <div className="product-summary">
         <img className="summary-image" src={product.img_url} alt={product.product_name} />
         <span className="summary-title">{product.product_name}</span>
         <span className="summary-price">${product.price}</span>
       </div>
     </Link>
     <AddToCartButton ProductId={product.product_id} quantity={"1"}/>
  </>
);

const ProductRow = ({ products }) => (
  <ul className="summary-product-grid">
    {products.map((product, index) => (
      <li key={index}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct().then(data => setProducts(data));
  }, []);

  return <ProductRow products={products} />;
};

export default ProductGrid;
