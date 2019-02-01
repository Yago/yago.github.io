import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ src }) => <img src={src} alt="sup ?" />;

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
};

export default GalleryItem;
