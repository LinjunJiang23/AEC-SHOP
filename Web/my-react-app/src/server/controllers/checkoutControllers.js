// src/server/controllers/checkoutControllers.js
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Q307SP1qHg19sZlj5PGGOe1h7JnMW2ve3UkByEkOFKxLddEvDonHUk8Oq2DRmqkVLS7ojjGBQ9gLnt6fKdSNVH500nmJZFK3s');
const { getUserId } = require('../utils/userUtils');


const createPaymentIntent = async (req, res) => {
  try {
	const user_id = await getUserId(req);
	const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in the smallest currency unit (e.g., 100 cents to charge $1.00)
      currency,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
	  console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
	createPaymentIntent,
};