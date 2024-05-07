import * as React from 'react';

import { Link } from 'react-router-dom';

function Navigate({type, children})
{
	return (
		<div classType="nav">
			{ type === 'cart' 
			&& 
			<Link to='/ShoppingCartDetail'>
				{children}
			</Link> }
			{ type === 'logo' && 
				<Link to='/'>
					{children}
				</Link> }
		</div>
		);
}



export default Navigate;