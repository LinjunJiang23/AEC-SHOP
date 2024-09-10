import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Logo.css';

const Logo = ({ logoSrc, mainLink }) => (
    <div className="logo">
        <Link to={mainLink}>
            <img 
                src={logoSrc}
                alt="logo"
            />
        </Link>
    </div>
);

export default Logo;
