import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

// API
import { Auth } from '../../api/Auth';

const LoginForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const [errors, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const nav = useNavigate();
  const { login, isLogIn } = useContext(Auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = ( type === "buyer" ) ? await login(email, pw) : ( type === "seller" ) ? await merchantlogin(email, pw) : console.error("Unrecognized type of login form"); // Wait for the login function to complete
      if (response && !response.error) {
        setShowModal(true);
        setEmail(''); // Clear the email field after successful login
        setPassword(''); // Clear the password field after successful login
        setError(''); // Clear any errors after successful login
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message); // Display any error message
    }
  };
  
  
  
  useEffect(() => {
    const initLogin = () => {
      if (isLogIn) {
        setShowModal(true);
      }
	};
	
	initLogin();
  }, [isLogIn]);

  const handleModalClose = () => {
    setShowModal(false);
    (type === "buyer") ? nav('/') : (type === "seller") ? nav('/dashboard') : console.error("Login form type is incorrect");
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className='login'>
        <Input
          title='Email'
          className='email'
          type="text"
          placeholder="e.g., user111@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <Input
          title='Password'
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Button type="submit">Login</Button>
        { errors && <div className="error-userlogin">{errors}</div> }
      </Form>
      { showModal && (
        <Modal
          title='Welcome!'
          onClose={handleModalClose}
          onConfirm={handleModalClose}
          closeBut={'x'}
          confirmBut='Back to main page.'
        >
          <span>You successfully logged in.</span>
        </Modal>
      )}
    </>
  );
};

export default React.memo(LoginForm);
