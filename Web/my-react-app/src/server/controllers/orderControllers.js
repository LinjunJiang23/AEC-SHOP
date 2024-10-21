// src/server/controllers/orderControllers.js
const createOrderInDatabase = require('../utils/orderUtils');

const createOrder = async (req, res) => {
	const event = req.body;
	if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Extract relevant data
    const user_id = paymentIntent.metadata.user_id;  // You can pass custom data like user_id via metadata
    const order_total = paymentIntent.amount;
    const payment_status = paymentIntent.status;

    // Create order in your system
    // Example pseudo-code:
    createOrderInDatabase({
      user_id,
      order_total,
      payment_status,
      stripe_payment_id: paymentIntent.id,
      created_at: new Date(),
	  order_status: 'placed'
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
	createOrder,
};