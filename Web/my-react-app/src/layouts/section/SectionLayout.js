import React from 'react';
import PropTypes from 'prop-types';

const SectionLayout = ({ sectionHeader, sectionDescription, sectionStyle, children, actions }) => {
	
	return (
	  <div>
	    <h2>{sectionHeader}</h2>
		{sectionDescription && <span>{sectionDescription}</span>}
		{children}
		{actions && <div>{actions}</div>}
	  </div>
	);
};

SectionLayout.propTypes = {
	sectionHeader: PropTypes.string.isRequired,
	sectionDescription: PropTypes.string,
	sectionStyle: PropTypes.string,
	children: PropTypes.node,
	actions: PropTypes.node
};

SectionLayout.defaultProps = {
	sectionDescription: '',
	sectionStyle: '',
	children: null,
	actions: null
};

export default SectionLayout;