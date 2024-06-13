import React, { useEffect, useState } from 'react';
import Fetch from '../../lib/FetchProduct';

const addProduct = async (formData) => {
  try {
    const response = await fetch(`http://localhost:3001/SellerRoute/addProduct`, {
      method: 'POST',
      body: formData
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

const AddListingPage = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Image, setImage] = useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to update the product details
	  let formData = new FormData();
	  let fileInput = Image;
	  formData.append('image', fileInput);
	  console.log("Image:", fileInput);
	  formData.append('productName', productName);
	  formData.append('description', description);
	  formData.append('price', price);

      await addProduct(formData);
      console.log("Success");
    } catch (error) {
      console.error('Error updating product:', error.message);
      // You can handle error display or logging here
    }
  };

  return (
    <div className="addnewlisting">
          <div>
            {/* Display selected product details here */}
            <h2>Add New Listing!</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
		    <label htmlFor="imageFile">Upload Product Image:</label>
			<input 
			  type="file" 
			  name="imageFile" 
			  id="imageFile" 
			  accept="image/*"
			  onChange={(e) => setImage(e.target.files[0])}
			/>
		    <button type="submit">Save Changes</button>
		  </form>
        </div>
	</div>
      );
};

export default AddListingPage;