// src/api/services/productServices.js
import api from '../config/apiConfig';



const productServices = {
  /* Customer Side Services */

  /** 
   * getProducts - GET FUNCTION that returns SOME information of requested products
   *	@param { number } page - page number for pagination
   *	@param { number } limit - number of items per page
   *	@return { Promise<Object||null> } - Returns the response or null if an error occurs
   */
  getProducts: async (page, limit) => {
	try {
		const response = await api.get(`/products`, 
		{
			params: {
				page: page,
				limit: limit
			}
		});
		return response;
	} catch (error) {
		console.error('Error:', error);
		/* Add fall back here */
		return null;
	}
  },

  /**
   * getOneProduct - GET FUNCTION that returns ALL information of the requested products
   * @param { number } id - the product id to find the product
   * @return { Promise<Object||null> } - Returns the response or null if an error occurs
   */
  getOneProduct: async (id) => {
	try {
		const response = await api.get(`/products/details/${id}`);
		console.log('Fetched response is:', response);
		if (response.length === 0)
		{
			throw new Error('Product not found');
		}
		return response;
	} catch (error) {
		console.error('Error', error);
		/* Add fall back here */
		return null;
	}
  },

  /* Seller Side Services */ 

 /** 
  * POST FUNCTION addProducts that returns ALL information of requested products
  *	@param { Object } formData - product information filled out by seller
 */
/* export const addProducts = async (formData) => {
	try {
		const response = await api.post('SellerRoute/addProduct',
		{
			formData
		});
		console.log(response);
	} catch (error) {
		throw (error);
		 /* Add fall back here */ 
	//}
//}; */
};

export default productServices;