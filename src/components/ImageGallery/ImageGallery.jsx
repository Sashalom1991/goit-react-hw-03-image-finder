import React from 'react';
import PropTypes from 'prop-types';

import '../../App.css';

const ImageGallery = ({ children }) => (
  <ul className="ImageGallery">{children}</ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ImageGallery;
