// src/server/controllers/productControllers.js
const queryUtils = require('../utils/queryUtils');

const getProducts = async (req, res) => {
  try {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;
	const products = await queryUtils.passQuery(
	  'SELECT * FROM Product LIMIT ? OFFSET ?', 
	  [limit, offset]
	);
			
	const totalItems = products.length;
	const totalPages = Math.ceil(totalItems / limit);
			
	return res.status(200).json({
	  products: products,
	  page,
	  limit,
	  totalPages,
	  totalItems
	});
			
  } catch (error) {
	console.error('Error fetching product data:', error);
	return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductsById = async (req, res) => {
  try {
	const { id } = req.params; // Use req.params to access route parameters
	const productDetail = await queryUtils.passQuery('SELECT * FROM Product WHERE product_id = ?', [id]);
	if (productDetail.length !== 0) {
	  res.status(200).json(productDetail);
	} else {
		throw new Error('Product with this id not found');
	}
  } catch (error) {
	console.error('Error fetching product detail:', error);
	return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProductsById,
};