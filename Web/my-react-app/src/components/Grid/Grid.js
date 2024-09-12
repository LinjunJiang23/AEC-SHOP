import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ columns, gap, children, className, style, ...props
  }) => {

  return (
	<div 
		className={`container-grid ${className}`}
		style={{
			display: 'grid',
			gridTemplateColumns: columns,
			gap
		}}
		{...props}
	>
	{children}
	</div>
  );
};

Grid.propTypes = {
	columns: PropTypes.string,
	gap: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
};

Grid.defaultProps = {
	columns: 'repeat(auto-fit, minmax(100px, 1fr))',
	gap: '16px',
	className: '',
	style: {},
};

export default Grid;