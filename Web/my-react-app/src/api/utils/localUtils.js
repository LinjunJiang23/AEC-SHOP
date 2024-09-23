// src/api/utils/localUtils.js

const localUtils = {

  setLocal: (name, item) => {
	localStorage.setItem(name, item);
  },

  removeLocal: (name) => {
	localStorage.removeItem(name);
  },

  getLocal: (item) => {
	return localStorage.getItem(item);
  },

  clearLocal: () => {
	localStorage.clear();
  },

  keyLocal: (key) => {
	return localStorage.key(key);
  },
};

export default localUtils;