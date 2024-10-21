// src/api/utils/errorHandler.js

/**
 * HELPER FUNCTION errorHandler
 * @param { error } error
 * @return { error } - error message
 */
export const errorHandler = async (error) => {
  if (error.response) {
	return { error: error.response.data.error || 'Server error, please try again later.' };
  } else if (error.request) {
	return { error: 'Network error, please check your connection.' };
  } else {
    return { error: 'An expected error occured' };
  }
};