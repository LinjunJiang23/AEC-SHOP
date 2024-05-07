import React, { useEffect, useState } from 'react';
import Fetch from '../lib/Fetch';

const addProduct = async (productName, imgUrl, productPrice, productDesc) => {
  try {
    const response = await fetch(`http://localhost:3001/SellerRoute/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, productPrice, productDesc })
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    console.log(data); // Log success message or handle response accordingly
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

const AddNewListing = () => {
	// State to manage modal visibility and selected product
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [url, setURL] = useState('');

  const handleShow = () => {
    setShowModal(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to update the product details
      await addProduct(productName, url, price, description,);
      console.log("Success");
      setShowModal(false);
    } catch (error) {
      console.error('Error updating product:', error.message);
      // You can handle error display or logging here
    }
  };

  return (
    <div className="listingcard">
      {/* Render modal if showModal is true */}
      {showModal && (
        <div className="modal">
          {/* Modal content */}
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {/* Display selected product details here */}
            <h2>Add New Listing!</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
			  <label htmlFor="price">Price:</label>

              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
			  <label htmlFor="url">Img Url:</label>
			  <input
			    type="text"
				id="url"
				value={url}
				onChange={(e) => setURL(e.target.value)}
			  />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewListing;