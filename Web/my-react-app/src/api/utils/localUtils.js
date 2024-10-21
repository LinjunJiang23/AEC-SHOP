// src/api/utils/localUtils.js

const setLocal = (name, item) => {
	localStorage.setItem(name, item);
};

const removeLocal = (name) => {
	localStorage.removeItem(name);
};

const getLocal = (item) => {
	return localStorage.getItem(item);
};

const clearLocal = () => {
	localStorage.clear();
};

const keyLocal = (key) => {
	return localStorage.key(key);
};


export {
	setLocal,
	removeLocal,
	getLocal,
	clearLocal,
	keyLocal
};