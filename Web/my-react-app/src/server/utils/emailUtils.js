// src/server/utils/emailUtils.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
	pass: process.env.EMIAL_PASS,
  },
});