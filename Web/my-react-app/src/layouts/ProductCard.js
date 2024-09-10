import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
   <div className="productcard">
     <Link to={`/productdetail/${product.product_id}`}
		style={{ textDecoration: 'none' }} 
	 >
       <div className="product-summary">
         <img className="summary-image" src={product.img_url} alt={product.product_name} />
         <span className="summary-name">{product.product_name}</span>
		 <span className="summary-price">${product.price}</span>
       </div>
     </Link>
  </div>
);

export default ProductCard;