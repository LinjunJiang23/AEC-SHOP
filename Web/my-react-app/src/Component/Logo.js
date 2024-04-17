import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div className="logo">
        <Link to="/">
            <img 
                src="./logo.png"
                alt="logo"
            />
        </Link>
    </div>
);

export default Logo;
