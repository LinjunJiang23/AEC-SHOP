import React from 'react';
import axios from 'axios';

const AddProduct = async (formData) => {
  try {
    const response = await axios.post(`http://localhost:3001/SellerRoute/addProduct`, {
      body: formData
    });
    console.log(response); // Log success message or handle response accordingly
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

export default AddProduct;