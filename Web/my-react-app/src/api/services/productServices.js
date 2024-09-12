// src/api/config/apiConfig.js
import api from '../config/apiConfig';


{/* Customer Side Services */}

 /** 
  * GET FUNCTION getProducts that returns SOME information of requested products
  *	@param { number } page - page number for pagination
  *	@param { number } limit - number of items per page
  *	@return { Promise<Object||null> } - Returns the response or null if an error occurs
 */
export const getProducts = async (page, limit) => {
	try {
		const response = await api.get('CustomerRoute/productGeneral', 
		{
			params: { page, limit },
		});
		console.log('Fetched response is:', response);
		console.log('Items fetched are:', response.data);
		console.log('The total pages of requested items is:', response.data.totalPages);
		console.log('The total number of requested items is:', response.data.totalItems);
		return response;
	} catch (error) {
		console.error('Error:', error);
		{ /* Add fall back here */ }
		return null;
	}
};

 /**
  * GET FUNCTION getOneProduct that returns ALL information of the requested products
  * @param { number } id - the product id to find the product
  * @return { Promise<Object||null> } - Returns the response or null if an error occurs
 */
export const getOneProduct = async (id) => {
	try {
		const response = await api.get(`CustomerRoute/productDetail/${id}`);
		console.log('Fetched response is:', response);
		if (response.length === 0)
		{
			{ /* Add fall back here */ }
		}
		console.log('Item fetched is:', response.data);
		return response;
	} catch (error) {
		console.error('Error', error);
		{ /* Add fall back here */ }
		return null;
	}
};	

{ /* Seller Side Services */ }

 /** 
  * POST FUNCTION addProducts that returns ALL information of requested products
  *	@param { Object } formData - product information filled out by seller
 */
export const addProducts = async (formData) => {
	try {
		const response = await api.post('SellerRoute/addProduct',
		{
			formData
		});
		console.log(response);
	} catch (error) {
		throw new Error(`Error adding product: ${error.message}`);
		{ /* Add fall back here */ }
	}
};

