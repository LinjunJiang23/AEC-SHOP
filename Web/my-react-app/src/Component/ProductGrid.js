import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component
import AddToCartButton from '../Component/AddToCartButton';

// Function
import Fetch from '../lib/Fetch';

// Styles
import './styles/ProductGrid.css';



const ProductCard = ({ product }) => (
   <div className="productcard">
     <Link to={`/productdetail/${product.product_id}`}
		style={{ textDecoration: 'none' }} 
	 >
       <div className="product-summary">
         <img className="summary-image" src={product.img_url} alt={product.product_name} />
         <span className="summary-price">${product.price}</span>
       </div>
     </Link>
     <AddToCartButton ProductId={product.product_id} quantity={"1"}/>
  </div>
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
    Fetch("product", null).then(data => setProducts(data));
  }, []);

  return <ProductRow products={products} />;
};

export default ProductGrid;
