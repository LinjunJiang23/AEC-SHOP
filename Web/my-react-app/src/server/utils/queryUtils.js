// src/server/utils/queryUtils.js
const express = require('express');
const connection = require('../../database/db');


/** Function to pass query to database
 * @param { string } query - the database query
 * @param {  } params - the parameters being inserted in the query
 * @return { Promise || error } Return results of the query or error 
 */
exports.passQuery = (query, params) => {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, results, fields) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
		});
	});
};