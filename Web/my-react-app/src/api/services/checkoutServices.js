// src/api/services/checkoutServices
import api from '../config/apiConfig';


const verifyPayment = async (amount) => {
	const amountInCents = amount * 100;
	try {
	  const { data } = await api.post('/checkout', { amount: amountInCents, currency: 'usd' });
      const clientSecret = data.clientSecret;
	  return clientSecret;
	} catch (error) {
	  throw new Error('Error verifying payment:', error);
	}
};

export {
	verifyPayment
};