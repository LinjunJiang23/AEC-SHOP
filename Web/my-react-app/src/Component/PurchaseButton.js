import React from 'react';
import { Link } from 'react-router-dom';

import { BiPurchaseTag } from "react-icons/bi";

const PurchaseButton = () => (
    <div className="button-purchase">
        <Link to="/purchasepage">
            <BiPurchaseTag />
        </Link>
    </div>
);

export default PurchaseButton;