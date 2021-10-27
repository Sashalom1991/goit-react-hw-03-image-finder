import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

const ImageGalleryItem = ({ alt, src, url, onClick }) => (
  
  <li className="ImageGalleryItem">
    <img
      onClick={onClick}
      src={src}
      alt={alt}
      url={url}
      className="ImageGalleryItemImage"
    />
  </li>
);
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
