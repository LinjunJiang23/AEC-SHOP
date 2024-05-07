import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToCartButton from '../Component/AddToCartButton';

import './styles/ProductDetailPage.css';

const ProductDetail = ({ product, setQuantity }) => {
   console.log("Parsed JSON data:", product);

   if (!product) {
    return <div>No product available</div>;
   }

  return (
    <div className="product-detail">
      {product.map((item) => (
        <div 
		  key={item.product_id} 
		  className="product-item">
          <img 
		    className="detail-image" 
            src={item.img_url} 
            alt={item.product_name}
          />
          <span className="detail-title">{item.product_name}</span>
          <span className="detail-price">${item.price}</span>
          <span className="detail-description-text">Description:</span>
          <span className="detail-description">{item.description}</span>
          <input 
            type="number" 
            className="detail-quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      ))}
    </div>
   );
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/CustomerRoute/productDetail/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error: ', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div className="product-detail">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : product ? (
        <>
          <ProductDetail product={product} setQuantity={setQuantity} />
          <AddToCartButton UserId={"1"} ProductId={id} quantity={quantity} />
        </>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default ProductDetailPage;
