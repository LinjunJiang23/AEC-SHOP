// src/server/controllers/emailController.js

const sendResetEmail = async (email, OTP) => {
  try {
	const mailOptions = {
	  from: `"AEC Shop" <${process.env.EMAIL_USER}>`,
	  to: email, 
	  subject: "AEC Shop Seller Password Reset Request",
	  html: `
	    <h1>You requested to reset your password. </h1>
		<p>The following is your One Time Password(OTP):</p>
		<p></p>
		<p>If you did not recognize the request, please ignore. </p> 
		<strong>Or click to deny the request and let us know.</strong>
		<a heref="">Deny Request and Alert</a>
	  `
	};
	const info = await transporter.sendMail(mailOptions);
	return true;
  } catch (error) {
    console.error("Error sending email: ", error);
	return false;
  }
};
