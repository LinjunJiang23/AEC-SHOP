// src/server/utils/orderUtils.js
const { passQuery } = require('./queryUtils');

const createOrderInDatabase = async (user_id, order_total, payment_status,
  stripe_payment_id, created_at, order_status) => {
    try {
		await passQuery(
		  `INSERT INTO Shopping_Order (user_id, order_total, payment_status, stripe_payment_id, created_at, order_status)
		  VALUES (?, ?, ?, ?, ?, ?, ?)`,
		  [user_id, order_total, payment_status, stripe_payment_id, created_at, order_status]);
	} catch (error) {
	}
};

module.exports = {
	createOrderInDatabase,
};