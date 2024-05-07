import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from './logo.png';
import './styles/Logo.css';

const Logo = () => (
    <div className="logo">
        <Link to="/">
            <img 
                src={LOGO}
                alt="logo"
            />
        </Link>
    </div>
);

export default Logo;
